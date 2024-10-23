from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt # don't use in production
from django.conf import settings
import os
import subprocess

# TODO: Does ETL need a job lock too? maybe just an exception for same-file dupe request?
# EDIT: The crawl job only executes one by one, periodically so this shouldn't be a hassle.
@csrf_exempt # don't use in production
def start_etl(request):
    CHARTS = 4
    if request.method == 'POST' and 'file' in request.FILES:
        uploaded_file = request.FILES['file']
        pending_dir = os.path.join(settings.BASE_DIR, 'data/pending')

        # dupe request check
        files = os.listdir(pending_dir)
        if uploaded_file.name in files:
            return JsonResponse({"Error": "A file with the same name already exists."})
        else:
            file_path = f'{os.path.join(pending_dir, uploaded_file.name)}'

            # save locally or "transplant" it as i call it XD
            # that reminds me i have to re-pot my Begonia
            with open(file_path, 'wb') as f:
                for chunk in uploaded_file.chunks():
                    f.write(chunk)

            # ETL
            base_command = os.path.join(settings.BASE_DIR, 'manage.py')
            results = [subprocess.run(['python', f'{base_command}', 'ingest'], capture_output=True, text=True)]

            # ELT
            collection_date = uploaded_file.name.split('_')[0]
            for chart_number in range(1, CHARTS + 1):
                arg = []
                if chart_number == 1:
                    # chart1.py 분석: 여러개일때 날짜순으로 처리하는 로직인걸로 assume 하겠습니다.
                    # 어차피 파일을 하나씩만 ingest 하므로 start와 end를 같게 넣었습니다
                    # 만약 이 뷰가 여러파일을 처리하는 뷰라면 pending에 있는 파일을 listdir 해서 가장 이른 날짜와 마지막 날짜를 넣는걸로 수정
                    arg = ['python', f'{base_command}', f'chart{chart_number}', '--start_date', f'{collection_date}', '--end_date', f'{collection_date}']
                else:
                    arg = ['python', f'{base_command}', f'chart{chart_number}']
                results.append(subprocess.run(arg, capture_output=True, text=True)) # Popen is non-blocking but run is blocking

        # job done
        return JsonResponse({"Results": [
                                            {"Ingestion": 
                                                [{"return_code": r.returncode}, {"stdout": r.stdout}]
                                            } if i == 0 else
                                            {f"Chart{i}":
                                                [{"return_code": r.returncode}, {"stdout": r.stdout}] 
                                            }
                                            for i, r in enumerate(results)
                                        ]
                            }, status=200)
    # bad req
    return JsonResponse({"error": "Bad request"}, status=400)
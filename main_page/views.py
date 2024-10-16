from django.conf import settings
from django.shortcuts import render
from main_page.data_processing import draw_stacked_chart ,save_programming_chart4
import matplotlib
from math import pi

from main_page.data_processing import draw_stacked_chart ,save_programming_chart4


def main_page(request):
    # Pandas로 데이터 처리
    # df = get_programming_data()
    # chart_data = prepare_chart_data(df)
    #seaborn 으로 처리
    chart_path = draw_stacked_chart()
    save_programming_chart4()
    # chart_data를 HTML로 전달
    return render(request, 'main_page/index.html', {'chart_path': chart_path})

def index_test(request):
    # Pandas로 데이터 처리
    # df = get_programming_data()
    # chart_data = prepare_chart_data(df)
    #seaborn 으로 처리
    chart_path = draw_stacked_chart()
    save_programming_chart4()
    # chart_data를 HTML로 전달
    return render(request, 'main_page/index.html', {'chart_path': chart_path})


matplotlib.use('Agg')  # 이거 없으면 서버 꺼짐


def index(request):
    return render(request, 'main_page/index.html')


def main_page(request):
    # Pandas로 데이터 처리
    # df = get_programming_data()
    # chart_data = prepare_chart_data(df)

    #seaborn 으로 처리 
    chart_path = draw_stacked_chart()
    save_programming_chart4()
    # chart_data를 HTML로 전달
    return render(request, 'main_page/index.html', {'chart_path': chart_path})

def index_test(request):
    return render(request, 'main_page/index_test.html')



from django.http import JsonResponse
from . import chart3_data_dummy

def chart3_data(request):
    return JsonResponse(chart3_data_dummy.data, safe=False)
from django.shortcuts import render
from django.http import HttpResponse
from main_page.data_processing import draw_stacked_chart ,save_programming_chart4

# Create your views here.
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
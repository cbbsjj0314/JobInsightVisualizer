
from django.shortcuts import render
import matplotlib
from django.http import JsonResponse

from main_page.dummydata.chart1_data import data1
from main_page.dummydata.chart1_update import update_data
from main_page.dummydata.chart2_data  import data2
from main_page.dummydata.chart4_data import data4 
from main_page.chart3_data_dummy import data


def index(request):
    return render(request, 'main_page/index.html')

def index_test(request):
    return render(request, 'main_page/index_test.html')

def chart1_data(request):
    print(data1)
    return JsonResponse(data1, safe=False)

def chart1_update(request):
    print(update_data)
    return JsonResponse(update_data, safe=False)

def chart2_data_view(request):
    return JsonResponse(data2, safe=False)

def chart3_data(request):
    return JsonResponse(data, safe=False)

def chart4_data(request):
    return JsonResponse(data4, safe=False)

from django.shortcuts import render
import matplotlib
from django.http import JsonResponse
from . import chart3_data_dummy

def index(request):
    return render(request, 'main_page/index.html')

def index_test(request):
    return render(request, 'main_page/index_test.html')


def chart3_data(request):
    return JsonResponse(chart3_data_dummy.data, safe=False)

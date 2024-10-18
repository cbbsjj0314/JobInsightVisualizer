from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),    
    #### 범준: python으로 그린 차트 이미지 url
    path('index_test/', views.index_test, name='index_test'),
    path('chart1_data/', views.chart1_data, name='chart1_data'),
    path('chart1_update/', views.chart1_update, name='chart1_update'),
    path('chart3_data/', views.chart3_data, name='chart3_data'),
    path('chart2_data/', views.chart2_data_view, name='chart2_data'),
    path('chart4_data/', views.chart4_data, name='chart4_data'),
    
]

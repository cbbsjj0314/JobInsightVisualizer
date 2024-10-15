from django.urls import path
from . import views

urlpatterns = [
    # path('', views.index, name='index')
    # path('', views.main_page, name='main_page'),
    path('', views.index, name='index'),
    path('show_chart/', views.main_page, name='show_chart'),
]
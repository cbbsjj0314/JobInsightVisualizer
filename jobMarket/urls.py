from django.urls import path
from .services.analysis.top_3_job_type_by_lang.delivery import chart4view

app_name = 'jobMarket'
urlpatterns = [
    path('top_3_job_type_by_lang/', chart4view.chartfour, name='chart4')
]
from django.urls import path
from .views import start_etl

app_name = "hook"
urlpatterns = [
    path("", start_etl, name="etl"),
]
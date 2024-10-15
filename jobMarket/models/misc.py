from django.db import models
from django.contrib import admin
from django.utils import timezone
from django.contrib.auth.models import User
from .shared import BaseInfo
import datetime

class RawFile(BaseInfo):
    filename = models.CharField(max_length=100, verbose_name='File name')
    collected_on = models.DateTimeField(verbose_name='Record scraped date', null=True)
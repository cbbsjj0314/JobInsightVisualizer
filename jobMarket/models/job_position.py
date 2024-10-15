from django.db import models
from .shared import BaseInfo
from django.contrib import admin
from django.utils import timezone
from django.contrib.auth.models import User
from .category import Platform, Skill
import datetime

# company
class Company(BaseInfo):
    name = models.CharField(max_length=50, verbose_name='Company name')

# job_posting
class JobPosting(BaseInfo):
    company_id = models.ForeignKey(Company, on_delete=models.RESTRICT)
    platform_id = models.ForeignKey(Platform, on_delete=models.RESTRICT)
    link = models.CharField(max_length=200, verbose_name='Job posting link')
    title = models.CharField(max_length=100, verbose_name='Posting title')
    experience_level = models.CharField(max_length=20, verbose_name='Job experience')
    is_new = models.BooleanField(default=True, verbose_name='Is this the revised one?')
    deadline = models.DateTimeField(verbose_name='Application deadline')
    collected_on = models.DateTimeField(verbose_name='Record scraped date', null=True)

# location
class Location(BaseInfo):
    name = models.CharField(max_length=50, verbose_name='Workplace location')
    job_posting_id = models.ForeignKey(JobPosting, on_delete=models.RESTRICT)

# role
class Role(BaseInfo):
    name = models.CharField(max_length=50, verbose_name='Job position role')
    job_posting_id = models.ForeignKey(JobPosting, on_delete=models.RESTRICT)

# requirement
class Requirement(BaseInfo):
    job_posting_id = models.ForeignKey(JobPosting, on_delete=models.RESTRICT)
    skill_id = models.ForeignKey(Skill, on_delete=models.RESTRICT)
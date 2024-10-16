from django.contrib import admin
from jobMarket.models.shared import *
from jobMarket.models.all_models import *
from jobMarket.models.misc import *

# Register your models here.
admin.site.register(Platform)
admin.site.register(Company)
admin.site.register(JobPosting)
admin.site.register(Location)
admin.site.register(SkillCategory)
admin.site.register(Skill)
admin.site.register(Requirement)
admin.site.register(JobSuperType)
admin.site.register(JobSubType)
admin.site.register(JobSuperSubAssociation)
admin.site.register(RawFile)
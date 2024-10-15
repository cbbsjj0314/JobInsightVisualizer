from django.db import models


class BaseInfo(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    last_edit = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

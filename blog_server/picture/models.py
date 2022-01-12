from django.db import models

# Create your models here.
from django.db import models

class Picture(models.Model):
    src = models.TextField(help_text='src', unique=True)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='create time')

    class Meta:
        verbose_name = 'picture'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

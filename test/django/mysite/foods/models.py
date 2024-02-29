from django.db import models

# Create your models here.


class Foods(models.Model):
    name = models.CharField(
        max_length=255, unique=True, verbose_name="名称", help_text="name"
    )
    content = models.TextField(max_length=255, verbose_name="成分", help_text="content")
    description = models.CharField(
        max_length=255, help_text="描述", null=True, blank=True
    )
    inventory = models.IntegerField(
        verbose_name="库存", help_text="inventory", default=0
    )
    create_time = models.DateTimeField(auto_now_add=True, verbose_name="create time")
    update_time = models.DateTimeField(auto_now=True, verbose_name="update at")

    class Meta:
        verbose_name = "食物"
        verbose_name_plural = verbose_name
        ordering = ["-create_time"]

    def __str__(self):
        return self.title

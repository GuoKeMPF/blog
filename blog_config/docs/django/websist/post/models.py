from django.db import models

# Create your models here.
from django.db import models

# Create your models here.


class Post(models.Model):
    title = models.CharField(
        max_length=255,
        unique=False,
        verbose_name="标题",
        help_text="title",
        null=True,
    )
    content = models.TextField(max_length=255, verbose_name="内容", help_text="content")
    description = models.CharField(
        max_length=255, help_text="描述", null=True, blank=True
    )
    view = models.IntegerField(verbose_name="浏览量", help_text="view", default=0)
    create_time = models.DateTimeField(auto_now_add=True, verbose_name="create time")
    update_time = models.DateTimeField(auto_now=True, verbose_name="update time")

    class Meta:
        verbose_name = "帖子"
        verbose_name_plural = verbose_name
        ordering = ["-create_time"]

    def __str__(self):
        return self.title

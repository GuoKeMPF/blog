# Generated by Django 3.2.9 on 2022-04-16 09:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('draft', '0003_auto_20220102_2209'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='draft',
            options={'ordering': ['create_time'], 'verbose_name': 'draft', 'verbose_name_plural': 'draft'},
        ),
    ]
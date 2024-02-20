"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, re_path
from foods.views import FoodViewSet, SellFoodViewSet

urlpatterns = [
    path("admin/", admin.site.urls),
    # 草稿
    re_path(
        r"^foods/?$",
        FoodViewSet.as_view({"get": "list", "post": "create"}),
        name="foods",
    ),
    re_path(
        r"^foods/(?P<pk>\w+)/?$",
        FoodViewSet.as_view(
            {
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
        name="foods",
    ),
    re_path(
        r"^sell/foods",
        SellFoodViewSet.as_view(
            {
                "post": "sellFoods",
            }
        ),
        name="foods",
    ),
    re_path(
        r"^sell/food/(?P<pk>\w+)/?$",
        SellFoodViewSet.as_view(
            {
                "put": "sellFood",
            }
        ),
        name="foods",
    ),
]

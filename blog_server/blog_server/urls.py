"""
URL configuration for blog_server project.

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

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.urls import path


from draft.views import DraftViewSet
from text.views import TextViewSet
from picture.views import PictureViewSet
from audio.views import AudioViewSet
from user.views import LoginView, LogoutView
from dashboard.views import DashboardView


urlpatterns = [
    # 登陆退出
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    # 看板
    path("dashboard/", DashboardView.as_view(
        {"get": "retrieve"}
    ), name="dashboard"),

    # 草稿
    path("draft/", DraftViewSet.as_view(
        {"get": "list", "post": "create"}
    ), name="draft"),
    path("draft/<int:pk>", DraftViewSet.as_view(
        {"get": "retrieve", "put": "update",
            "patch": "partial_update", "delete": "destroy"}
    ), name="draft"),

    # 文章
    path("text/", TextViewSet.as_view(
        {"get": "list", "post": "create"}
    ), name="text"),
    path("text/<int:pk>", TextViewSet.as_view(
        {"get": "retrieve", "put": "update",
            "patch": "partial_update", "delete": "destroy"}
    ), name="text"),


    # 图片
    path("picture/",
         PictureViewSet.as_view({
             "get": "list",
             "post": "create"
         }), name="picture"),
    path("pictures/",
         PictureViewSet.as_view({
             "post": "uploads"
         }), name="picture"),
    path("picture/<int:id>/",
         PictureViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name="picture"),

    # 音频
    path("audio/",
         AudioViewSet.as_view({
             "get": "list",
             "post": "create"
         }), name="audio"),
    path("audios/",
         AudioViewSet.as_view({
             "post": "uploads"
         }), name="audio"),
    path("audio/<int:id>/",
         AudioViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name="audio"),

    path('admin/', admin.site.urls),
]

urlpatterns += staticfiles_urlpatterns()
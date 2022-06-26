
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.documentation import include_docs_urls
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework.routers import DefaultRouter


from draft.views import DraftViewSet
from text.views import TextViewSet
from picture.views import PictureViewSet
from audio.views import AudioViewSet
from user.views import LoginView, LogoutView


urlpatterns = [

    # 登陆等处
    path("api/login/", LoginView.as_view(), name="login"),
    path("api/logout/", LogoutView.as_view(), name="logout"),


    # 草稿
    path("api/draft/", DraftViewSet.as_view(
        {"get": "list", "post": "create"}
    ), name="draft"),
    path("api/draft/<int:pk>", DraftViewSet.as_view(
        {"get": "retrieve", "put": "update",
            "patch": "partial_update", "delete": "destroy"}
    ), name="draft"),

    # 文章
    path("api/text/", TextViewSet.as_view(
        {"get": "list", "post": "create"}
    ), name="text"),
    path("api/text/<int:pk>", TextViewSet.as_view(
        {"get": "retrieve", "put": "update",
            "patch": "partial_update", "delete": "destroy"}
    ), name="text"),


    # 图片
    path("api/picture/",
         PictureViewSet.as_view({
             "get": "list",
             "post": "create"
         }), name="picture"),
    path("api/pictures/",
         PictureViewSet.as_view({
             "post": "uploads"
         }), name="picture"),
    path("api/picture/<int:id>/",
         PictureViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name="picture"),

    # 音频
    path("api/audio/",
         AudioViewSet.as_view({
             "get": "list",
             "post": "create"
         }), name="audio"),
    path("api/audios/",
         AudioViewSet.as_view({
             "post": "uploads"
         }), name="audio"),
    path("api/audio/<int:id>/",
         AudioViewSet.as_view({"get": "retrieve", "delete": "destroy"}), name="audio"),

    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('docs/', include_docs_urls(title='docs', description='api description'))
]
urlpatterns += staticfiles_urlpatterns()

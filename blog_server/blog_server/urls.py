
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from draft.views import DraftViewSet
from text.views import TextViewSet

from rest_framework.documentation import include_docs_urls
from user.views import LoginView, LogoutView
from upload.views import upload_view
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

router = DefaultRouter()
router.register(prefix="viewsets", viewset=DraftViewSet)
router.register(prefix="viewsets", viewset=TextViewSet)


urlpatterns = [

    path("api/draft/", DraftViewSet.as_view(
        {"get": "list", "post": "create"}
    ), name="draft"),
    path("api/draft/<int:pk>", DraftViewSet.as_view(
        {"get": "retrieve", "put": "update",
            "patch": "partial_update", "delete": "destroy"}
    ), name="draft"),

    path("api/text/", TextViewSet.as_view(
        {"get": "list", "post": "create"}
    ), name="text"),
    path("api/text/<int:pk>", TextViewSet.as_view(
        {"get": "retrieve", "put": "update",
            "patch": "partial_update", "delete": "destroy"}
    ), name="draft"),

    path("api/login/", LoginView.as_view(), name="login"),
    path("api/logout/", LogoutView.as_view(), name="logout"),
    path("api/upload/", upload_view, name="upload"),


    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('docs/', include_docs_urls(title='docs', description='api description'))
]
urlpatterns += staticfiles_urlpatterns()

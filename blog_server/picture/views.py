from django.shortcuts import render
from django.http import JsonResponse
from .models import Picture
from .serializers import PictureSerializer
from rest_framework.views import APIView
# Create your views here.

class PictureAPIView(APIView):
    # 单查群查
    def get(self, request, *args, **kwargs):
        pictures = PictureSerializer(Picture.objects.all(), many=True)
        return JsonResponse(pictures.data,status=200, safe=False)


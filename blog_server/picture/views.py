
from django.http import JsonResponse
from .models import Picture
from .serializers import PictureSerializer
from rest_framework.viewsets import ModelViewSet
import os

# Create your views here.


class PictureViewSet(ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    # 单查群查

    def get(self, request, *args, **kwargs):
        pictures = PictureSerializer(Picture.objects.all(), many=True)
        return JsonResponse(pictures.data, status=200, safe=False)

    def destroy(self, request, *args, **kwargs):
        id = kwargs.get('id')
        picture = Picture.objects.get(id=id)
        if picture is None:
            return JsonResponse({"code": 0, "message": "file dose't exist"}, status=200, safe=False)
        else:
            try:
                print(picture.src)
                baseDir = os.path.dirname(os.path.abspath(__name__))
                print(baseDir)
                p = os.path.join(baseDir, './'+picture.src)
                print(p)
                os.remove(p)
            except(FileNotFoundError):
                return JsonResponse({"code": 0, "message": "delete file failed"}, status=200, safe=False)
            res = picture.delete()
            return JsonResponse({"message": res}, status=200, safe=False)
        # picture = Picture.objects.get(id=13)

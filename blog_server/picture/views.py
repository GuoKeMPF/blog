
from django.http import JsonResponse
from .models import Picture
from .serializers import PictureSerializer
from rest_framework.viewsets import ModelViewSet
from utils.file.manageImage import saveImage, deleteImage


class PictureViewSet(ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    # 单查群查

    def list(self, request, *args, **kwargs):
        pictures = PictureSerializer(Picture.objects.all(), many=True)
        return JsonResponse(pictures.data, status=200, safe=False)

    def create(self, request, *args, **kwargs):
        f = request.FILES.get('file')
        description = request.POST.get('description', '')
        imageInfo = saveImage(f)
        picture = Picture(
            src=imageInfo['src'],
            width=imageInfo['width'],
            height=imageInfo['height'],
            name=imageInfo['name'],
            unique_name=imageInfo['unique_name'],
            description=description
        )
        picture.save()
        return JsonResponse({"data": imageInfo, "code": 1})

    def destroy(self, request, *args, **kwargs):
        id = kwargs.get('id')
        picture = Picture.objects.get(id=id)
        if picture is None:
            return JsonResponse({"code": 0, "message": "file dose't exist"}, status=200, safe=False)
        else:
            try:
                deleteImage(picture.unique_name)
            except(FileNotFoundError):
                return JsonResponse({"code": 0, "message": "delete file failed"}, status=200, safe=False)
            res = picture.delete()
            return JsonResponse({"data": res}, status=200, safe=False)

    def uploads(self, request, *args, **kwargs):
        files = request.FILES.getlist('file')
        description = request.POST.get('description', '')
        loactions = []
        for f in files:
            imageInfo = saveImage(f)
            picture = Picture(
                src=imageInfo['src'],
                width=imageInfo['width'],
                height=imageInfo['height'],
                name=imageInfo['name'],
                unique_name=imageInfo['unique_name'],
                description=description
            )
            picture.save()
            loactions.append(imageInfo)
        return JsonResponse({"data": loactions, "code": 1})

from django.http import JsonResponse
from picture.models import Picture
import os
import time
# Create your views here.


def upload_view(request):
    print(request)
    f = request.FILES.get('file')
    baseDir = os.path.dirname(os.path.abspath(__name__))
    if not os.path.isdir(os.path.join(baseDir, 'server_static', 'upload')):
        os.makedirs(os.path.join(baseDir, 'server_static', 'upload'))
    path = os.path.join('server_static', 'upload',time.strftime('%Y%m%d%H%M%S') + f.name)
    jpgdir = os.path.join(baseDir, path)
    loaction = '/server_static/upload/'+ time.strftime('%Y%m%d%H%M%S') + f.name
    fobj = open(jpgdir, 'wb')
    for chrunk in f.chunks():
        fobj.write(chrunk)
    fobj.close()
    picture = Picture(src=loaction)
    picture.save()
    return JsonResponse({"data": loaction})

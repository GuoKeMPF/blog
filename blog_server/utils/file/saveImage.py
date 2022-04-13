
import os
import time
from PIL import Image

def saveImage(f):
    baseDir = os.path.dirname(os.path.abspath(__name__))
    if not os.path.isdir(os.path.join(baseDir, 'server_static', 'upload')):
        os.makedirs(os.path.join(baseDir, 'server_static', 'upload'))
    path = os.path.join('server_static', 'upload',
                        time.strftime('%Y%m%d%H%M%S') + f.name)
    jpgdir = os.path.join(baseDir, path)
    loaction = '/server_static/upload/' + \
        time.strftime('%Y%m%d%H%M%S') + f.name
    fobj = open(jpgdir, 'wb')
    for chrunk in f.chunks():
        fobj.write(chrunk)
    fobj.close()
    image=Image.open(f)
    return {
        'src':loaction,
        'width': image.width,
        'height': image.height,
        'name': f.name,
        }

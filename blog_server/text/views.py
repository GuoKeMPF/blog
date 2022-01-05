

# Create your views here.

from rest_framework.viewsets import ModelViewSet

from .models import Text
from .serializers import TextSerializer


class TextViewSet(ModelViewSet):
    queryset = Text.objects.all()
    serializer_class = TextSerializer
    ordering = ['create_time']
    filterset_fields = ['title', 'content', 'author']

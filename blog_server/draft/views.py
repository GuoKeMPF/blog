
from rest_framework.viewsets import ModelViewSet

from .models import Draft
from .serializers import DraftSerializer


class DraftViewSet(ModelViewSet):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer
    ordering = ['create_time']
    filterset_fields = ['title', 'content', 'author']

from rest_framework.viewsets import ModelViewSet
from django.http import JsonResponse
from .models import Draft
from .serializers import DraftsSerializer, DraftSerializer

class DraftViewSet(ModelViewSet):
    queryset = Draft.objects.all()
    serializer_class = DraftSerializer
    ordering = ['create_time']
    filterset_fields = ['title', 'content', 'author']

    def list(self, request, *args, **kwargs):
        d = Draft.objects.defer('content')
        drafts = DraftsSerializer(d,many=True)
        return JsonResponse(drafts.data, status=200, safe=False)

from rest_framework import pagination
from django.http import JsonResponse


class Pagination(pagination.PageNumberPagination):

    def __init__(self) -> None:
        super(Pagination, self).__init__()
        self.page_size_query_param = 'size'

    def get_paginated_response(self, data):
        return JsonResponse({
            'count': self.page.paginator.count,
            'size': self.page_size,
            'page': self.page.number,
            'data': data
        })

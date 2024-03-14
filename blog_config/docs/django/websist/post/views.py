from django.shortcuts import render

# Create your views here.
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from .models import Post
from .serializers import PostSerializer, PostsSerializer


class PostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name", "content", "description"]

    def list(self, request, *args, **kwargs):
        print("get list")
        custom_param = request.query_params
        filter_conditions = {
            f"{param}__icontains": value for param, value in custom_param.items()
        }

        # 使用动态的过滤条件过滤查询集
        self.queryset = self.queryset.filter(**filter_conditions)

        # 执行默认的列表操作
        response = super().list(request, *args, **kwargs)
        return response

    def retrieve(self, request, pk=None):
        print("get retrieve")
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, pk=pk)
        serializer = PostSerializer(post)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        print("post create")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # 使用序列化器将保存后的实例序列化为响应数据
        headers = self.get_success_headers(serializer.data)
        # 也可以通过获取各个参数执行save方法保存
        # name = data.get("name")
        # content = data.get("content")
        # description = data.get("description")
        # model_instance = Post(name=name,content=content, description=description)
        # 保存模型实例到数据库
        # model_instance.save()
        return Response(serializer.data, status=200, headers=headers)

    def update(self, request, *args, **kwargs):
        print("put update")
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        # 获取请求体中的数据
        data = request.data
        # 执行自定义逻辑，例如修改数据之前的验证、记录日志等
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=200, headers=headers)

    def destroy(self, request, *args, **kwargs):
        print("delete destroy")
        instance = self.get_object()
        # 自定义逻辑：在删除之前执行一些操作
        # 例如，记录删除日志、检查权限、触发其他业务逻辑等
        res = self.perform_destroy(instance)
        # 返回自定义的响应
        return Response({"message": res}, status=200)

    def partial_update(self, request, *args, **kwargs):
        print("patch partial_update")
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        # 获取请求体中的数据
        data = request.data
        # 执行自定义逻辑，例如修改数据之前的验证、记录日志等
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=200, headers=headers)

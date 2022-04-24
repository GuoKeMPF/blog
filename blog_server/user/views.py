
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from utils.cryptography.decrypt import decrypt
# Create your views here.


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(sele, request):
        # json
        body = json.loads(request.body)
        username = body.get('username')
        password = body.get('password')
        realname = decrypt(username)
        realpwd = decrypt(password)
        user = authenticate(username=realname, password=realpwd)
        token = get_token(request)
        if user is not None:
            if user.is_active:
                login(request, user)
                return JsonResponse(
                    {
                        "code": 1,
                        "data": user.get_username(),
                        "message": "login success"
                    })
            else:
                return JsonResponse(
                    {"code": 0, "message": "Error username or password"})
        else:
            return JsonResponse({"code": 0, "message": "Error username or password"})

    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        res = logout(request)
        if res:
            return JsonResponse({"code": 1, "message": "logout success"})
        else:
            return JsonResponse({"code": 0, "message": "logout failed"})

    def dispatch(self, *args, **kwargs):
        return super(LogoutView, self).dispatch(*args, **kwargs)

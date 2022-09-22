
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
from django.utils.decorators import method_decorator
from django.contrib.auth import authenticate, login, logout

from utils.cryptography.decrypt import decrypt

from rest_framework_jwt.settings import api_settings
# Create your views here.

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


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
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        if user is not None:
            if user.is_active:
                login(request, user)
                print("token", token)
                return JsonResponse({
                    "data": {
                        "username": user.get_username(),
                        "message": "login success",
                        "token": 'JWT ' + token
                    }})
            else:
                return JsonResponse(
                    {"message": "Error username or password"}, status=500)
        else:
            return JsonResponse({"message": "Error username or password"}, status=500)

    def dispatch(self, request, *args, **kwargs):
        return super(LoginView, self).dispatch(request, *args, **kwargs)


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(View):
    def post(self, request):
        res = logout(request)
        if res:
            return JsonResponse({"data": "logout success"}, status=500)
        else:
            return JsonResponse({"message": "logout failed"}, status=500)

    def dispatch(self, *args, **kwargs):
        return super(LogoutView, self).dispatch(*args, **kwargs)

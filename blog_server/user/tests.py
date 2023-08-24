
from json import dumps, loads
from django.test import TestCase, Client
from utils.cryptography.encrypt import encrypt
from utils.cryptography.decrypt import decrypt
from django.urls import reverse

username = 'admin'
password = 'admin'


class LoginTestCase(TestCase):
    def setUp(self):
        # 在每个测试方法之前执行的设置代码
        self.client = Client()

    def test_login(self):
        encodePwd = encrypt(password)
        encodeUserName = encrypt(username)
        params = {
            "username": encodeUserName,
            "password": encodePwd
        }
        response = self.client.post(
            reverse('login'), data=params, content_type='application/json')
        print(response)
        self.assertEqual(response.status_code, 200)

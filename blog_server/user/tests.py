
from django.test import TestCase, Client
from utils.cryptography.encrypt import encrypt
from django.contrib.auth import get_user_model
from django.urls import reverse

username = 'admin'
password = 'admin'


class LoginTestCase(TestCase):
    def setUp(self):
        self.client = Client()

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@qq.com'
        )

        self.assertTrue(admin_user.is_superuser)
        self.assertTrue(admin_user.is_staff)
        encodePwd = encrypt(password)
        encodeUserName = encrypt(username)
        params = {
            "username": encodeUserName,
            "password": encodePwd
        }
        response = self.client.post(
            reverse('login'), data=params, content_type='application/json')
        self.assertEqual(response.status_code, 200)

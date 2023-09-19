from django.test.testcases import TestCase
from django.contrib.auth import get_user_model
from test.config import username, password

class UserTestCase(TestCase):
     def setUpTestData(cls):
        User = get_user_model()
        User.objects.create_superuser(
            username='admin',
            password='admin',
            email='admin@qq.com'
        )

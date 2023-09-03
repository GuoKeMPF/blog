
from django.test import TestCase, Client

from django.urls import reverse

from draft.models import Draft


class DraftTest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        Draft.objects.create(
            title="test title 1", content="test content 1", author="test author 1", description="test description 1")
        Draft.objects.create(
            title="test title 2", content="test content 2", author="test author 2", description="test description 2")


    def test_create_draft_without_login(self):
        payload = {
            "title":"test title 1", 
            "content":"test content 1",
        	"author":"test author 1",
            "description":"test description 1"
		}
        response = self.client.post('/draft', payload)
        self.assertEqual(response.status_code, 401)
        

    def test_draft_exists(self):
        response = self.client.get('/draft')
        self.assertEqual(response.status_code, 200)

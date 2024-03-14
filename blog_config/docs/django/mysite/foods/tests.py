from django.test import TestCase, Client
from json import loads
from foods.models import Foods

path = "/foods/"


class FoodsTest(TestCase):
    def setUp(self) -> None:
        self.client = Client()

    def get_foods(self):
        foodsRes = self.client.get(path, content_type="application/json")
        foodsJson = foodsRes.content.decode("utf-8")
        res = loads(foodsJson)
        print(res)
        return loads(res)

    def test_get_foods(self):
        foodsRes = self.client.get(path, content_type="application/json")
        self.assertEqual(foodsRes.status_code, 200)

    def test_create_foods(self):
        food = {
            "name": "test",
            "content": "test",
            "description": "test",
        }
        createRes = self.client.post(path, data=food, content_type="application/json")
        newFoods = self.get_foods()
        status = createRes.status_code
        counts = newFoods["count"]
        firstFood = newFoods["results"][0]
        self.assertEqual(status, 200)
        self.assertEqual(counts, 1)
        self.assertEqual(firstFood["name"], food["name"])
        self.assertEqual(firstFood["content"], food["content"])
        self.assertEqual(firstFood["description"], food["description"])

    def test_get_food_by_id(self):
        foods = self.get_foods()
        firstFood = newFoods["results"][0]
        id = firstFood["id"]
        getFoodByIdRes = self.get(path + str(id), content_type="application/json")
        getFoodByIdJson = getFoodByIdRes.content.decode("utf-8")
        res = loads(getFoodByIdJson)
        self.assertEqual(res, firstFood)

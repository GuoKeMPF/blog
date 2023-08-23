"""Test login."""

import requests
import json
from .config import account, password
from .urls import getUrl 
from utils.cryptography.encrypt import encrypt
import pytest
from django.test import Client

url = getUrl('login')
encodePwd = encrypt(password)
param = {
	"username": account,
	"password": encodePwd,
}
j=json.dumps(param)
print(j)

@pytest.fixture
def client():
	return Client()

def test_my_function(client):
	response = requests.post(url, data=json.dumps(param), headers={'Content-Type':'application/json'})
	print("response")
	print(response)
	assert 200== 200


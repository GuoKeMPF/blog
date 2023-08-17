"""Test login."""

import requests
import json
from .config import account, password
from .urls import getUrl 
from utils.cryptography.encrypt import encrypt

url = getUrl('login')
param = {
    "username": account,
    "password": encrypt(password),
}


response = requests.post(url, body=json.dumps(param))
data = response.json()
print(data)

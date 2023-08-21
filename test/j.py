import requests
import json

param = {
    "username": "account",
    "password": str(b"encodePwd"),
}
j = json.dumps(param)
print(j)

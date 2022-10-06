
import requests

response1 = requests.get('http://localhost:8000/dashboard/', {},
                         headers={
                             'Content-Type': 'application/json',
})
get_result1 = response1.json()
print(get_result1)

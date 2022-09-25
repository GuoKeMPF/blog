# coding=UTF-8

import requests
import json

print("login system")

login_payload = {
    "username": "J42qtqcvNk8glIosVaEY6pTfIrGt2SdMiMknpDK1s4tsvnlmCsRBzX7mZTlhDBCwrwRNVee58230tdf7S/kwVyoO9Y1RfEwortTbL37jfhTos7d0KXSmj5CBohoCB3Fp/xOoYKTAfAFChaNZmt34XAS1aeIlS+/C//G2Y0nuqjBWzkAFyfZiRMYfXoXCMQDRcTWtUC4y6BaIOAoyVWcfumAZYubjc+X63p83AIrUzSdvwI1Yzx1Fq4n0VNqjFdYZczNnssf0owB/61Iff2rPK36EZI4r4DQz3B4xom6t/Ip0XjK3KOawwuD4zA5PxXdoNConTub7RxzubPBte6T2JA==",
    "password": "sbzi+ufVD/VIuq/aV4Q5A1Ff0T8jJZdzOhZUK3CJFapZNqusP/vd7Qic/p+AoWKhRI34kVxRzplRx2jfhK02szA1LoZw5UKMA/N64LTwIRt6l4iC6F9GWmB/S/Xn2yRJitDQKWRxVskHnZLiBW4AnFaAxAuPkrSpvpF4vEHganr7hJwqNxplx9VEDmhi54oH38NBImvdcCRMeWMwBpJb8Ic+u7k67xCONncB7iy3m6PmlQ3BjJoQ8A20pOrwCw7ZMn3GXGwQy8i6SPg6okt/ke4sX2LaHZiiOenBNn1T6L1wC6+oEGoWSmVeyD0wrFdaNRkGj3Q4FMTTGPh8Wnl0Ow=="
}
print("payload", login_payload)

login_response = requests.post('http://localhost:8000/login/',
                               data=json.dumps(login_payload), headers={'Content-Type': 'application/json'})
request_datas = login_response.json()
cookies = requests.utils.dict_from_cookiejar(login_response.cookies)
cookies_csrftoken = cookies["csrftoken"]
sessionid = cookies['sessionid']
token = request_datas['token']
csrftoken = request_datas['csrftoken']

add_draft1 = {
    "title": "test111",
    "content": "<p style=\"text-align: center;\">\u4e60\u60ef\u4e86\u4f60\u900f\u8fc7\u7a97\u61a7\u61ac\u84dd\u5929</p>\n<p style=\"text-align: center;\">\u5915\u9633\u4e0b\u7684\u665a\u971e\u6070\u4f3c\u4f60\u7eef\u7ea2\u7684\u8138\u988a</p>\n<p style=\"text-align: center;\">\u6c60\u5858\u8fb9\u7684\u7fe0\u67f3\u4eff\u4f5b\u4f60\u8f7b\u821e\u7684\u957f\u53d1</p>\n<p style=\"text-align: center;\">\u77ed\u6682\u7684\u72c2\u6b22\u4f7f\u601d\u7eea\u7ef5\u5ef6</p>\n<p style=\"text-align: center;\">\u7b80\u5355\u7684\u544a\u522b\u662f\u9752\u6625\u7684\u76db\u5bb4</p>\n<p style=\"text-align: center;\"><img src=\"../../../server_static/upload/20220201072523psb.jpg\" alt=\"\" width=\"600\" height=\"392\" /></p>",
    "author": 'test1',
    "description": "",
    "create_time": "2022-02-01 07:25:27",
    "update_time": "2022-02-01 07:25:27"
}
response1 = requests.post('http://localhost:8000/draft/',
                          data=json.dumps(add_draft1),
                          headers={
                              'Content-Type': 'application/json',
                              'X-CSRFToken': csrftoken,
                              'Authorization':  token
                          })
add_result1 = response1.json()
print(add_result1)


# add_draft2 = {
#     "title": "test222",
#     "content": "<p style=\"text-align: center;\">\u4e60\u60ef\u4e86\u4f60\u900f\u8fc7\u7a97\u61a7\u61ac\u84dd\u5929</p>\n<p style=\"text-align: center;\">\u5915\u9633\u4e0b\u7684\u665a\u971e\u6070\u4f3c\u4f60\u7eef\u7ea2\u7684\u8138\u988a</p>\n<p style=\"text-align: center;\">\u6c60\u5858\u8fb9\u7684\u7fe0\u67f3\u4eff\u4f5b\u4f60\u8f7b\u821e\u7684\u957f\u53d1</p>\n<p style=\"text-align: center;\">\u77ed\u6682\u7684\u72c2\u6b22\u4f7f\u601d\u7eea\u7ef5\u5ef6</p>\n<p style=\"text-align: center;\">\u7b80\u5355\u7684\u544a\u522b\u662f\u9752\u6625\u7684\u76db\u5bb4</p>\n<p style=\"text-align: center;\"><img src=\"../../../server_static/upload/20220201072523psb.jpg\" alt=\"\" width=\"600\" height=\"392\" /></p>",
#     "author": 'test2',
#     "description": "",
#     "create_time": "2022-02-01 07:25:27",
#     "update_time": "2022-02-01 07:25:27"
# }
# response2 = requests.post('http://localhost:8000/draft/',
#                           data=json.dumps(add_draft2),
#                           headers={
#                               'Content-Type': 'application/json',
#                               'X-CSRFToken': cookies_csrftoken,
#                               'Authorization': token
#                           })
# add_result2 = response2.json()
# print(add_result2)



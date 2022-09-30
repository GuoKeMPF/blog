# coding=UTF-8

import requests
import json

get_draft1 = {
    "size": 12,
    "page": 1
}

response1 = requests.get('http://localhost:8000/draft/',
                          data=json.dumps(get_draft1),
                          headers={
                              'Content-Type': 'application/json',
                          })
get_result1 = response1.json()
print(get_result1)


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



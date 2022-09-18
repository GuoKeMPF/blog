---
toc: menu
title: 请求方法
---

# http 请求方法

HTTP1.0 定义了三种请求方法： **GET**, **POST** 和 **HEAD**方法。

HTTP1.1 新增了六种请求方法：**PUT**、**TRACE** 、**PATCH**、**DELETE**、**OPTIONS**和 **CONNECT** 方法。

|  方法   | 版本       | 描述                                                                                                                                   |
| :-----: | :--------- | :------------------------------------------------------------------------------------------------------------------------------------- |
|   GET   | Http 1.0   | 请求指定的页面信息，并返回实体主体。                                                                                                   |
|  POST   | Http 1.0   | 向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的建立和/或已有资源的修改 |
|  HEAD   | Http 1.0   | 类似于 GET 请求，只不过返回的响应中没有具体的内容，用于获取报头                                                                        |
|   PUT   | 非正式规格 | 从客户端向服务器传送的数据取代指定的文档的内容。                                                                                       |
|  TRACE  | 非正式规格 | 回显服务器收到的请求，主要用于测试或诊断。                                                                                             |
|  PATCH  | Http 1.1   | 是对 PUT 方法的补充，用来对已知资源进行局部更新 。                                                                                     |
| DELETE  | Http 1.1   | 请求服务器删除指定的页面。                                                                                                             |
| OPTIONS | Http 1.1   | 允许客户端查看服务器的性能。                                                                                                           |
| CONNECT | Http 1.1   | HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。                                                                              |
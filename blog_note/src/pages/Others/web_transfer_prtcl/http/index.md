---
title: 超文本传输协议
toc: menu
---

# http 超文本传输协议 (HyperText Transfer Protocol)

http：一种**无状态**，应用层，以**请求/应答**方式运行的协议，它使用**可拓展**的语义和**自描述**消息格式，与基于网络的**超文本信息**系统灵活互动。

http 协议格式

start-line

    request-line
      请求方法 请求地址 http 版本

    status-line
      http版本 响应状态 响应

header-field

    若干请求头
    token: XXX
     cookie: XXX

message-body

![telnet%20baidu](./telnet%20baidu.png)

osi 模型与 tcp/ip 模型对照

![模型与 tcp/ip 模型对照](./osi%20tcp%20ip%20模型.png)

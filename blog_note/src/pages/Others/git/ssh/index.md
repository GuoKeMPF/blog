---
title: ssh 配置
toc: menu
---

# 生成 ssh

```bash
ssh-keygen -t rsa -C "email" -f ~/.ssh/rsa
# ssh-keygen -t "密钥类型" -C "用户邮箱" -f 密钥路径以及文件名
```

# 多 ssh 配置

1. 生成多个 ssh 密钥

```bash
# gitlab
ssh-keygen -t rsa -C 'yourEmail@xx.com' -f ~/.ssh/gitlab-rsa

# github
ssh-keygen -t rsa -C 'yourEmail@xx.com' -f ~/.ssh/github-rsa
```

2. 创建 config 文件

```config
# gitlab
Host gitlab.com
HostName gitlab.com
User xxx@qq.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/gitlab-rsa
# github
Host github.com
HostName github.com
User xxx@qq.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/github-rsa
 # 配置文件参数
 # Host : Host可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和ssh文件
 # HostName : 要登录主机的主机名( 服务器IP)
 # Port 22 : 端口
 # User : 用户名
 # IdentityFile : 指明上面User对应的identityFile路径，认证文件
 # StrictHostKeyChecking : yes 关闭提示
```

**生成 ssh key 时，-f ~/.ssh/gitlab-rsa 中~/.ssh/gitlab-rsa 是生成路径，必须正确。**

3. 登录 github/gitlab/gitee ... 把创建的密钥对添加到账户设置 ssh 中

4. 测试 ssh 是否可用

```bash
ssh -T git@XXX.com
```

# ssh 链接服务器

1. 按照上面步骤创建 ssh key
2. 登录服务器创建密钥设置（需要先将服务器关机）

![创建密钥对](./image/创建密钥对.png)
![绑定服务器](./image/绑定服务器.png)

3. 修改 config 文件夹配置，添加相关域名配置

```config
...
Host xxx.com
HostName xxx.com
User XXX
PreferredAuthentications publickey
IdentityFile ~/.ssh/xxx.rsa
...
```
4. 启动服务器，之后便可以 ssh 链接服务器。

ubuntu 安装docker

一、安装docker

1、安装docker：sudo apt-get install -y docker.io

2、启动docker服务：systemctl start docker

3、设置开机启动：systemctl enable docker

4、查看docker状态：systemctl status docker

5、停止docker服务：systemctl stop docker

6、查看docker版本：docker version

二、非root用户运行docker

1、添加docker用户组：sudo groupadd docker

执行以上命令会提示已存在，原因是在安装docker时已自动创建。

2、将指定用户添加到用户组（username为你的用户名）：sudo gpasswd -a username docker

3、查看是否添加成功：cat /etc/group | grep ^docker

3、重启docker：sudo systemctl restart docker

5、更新用户组：newgrp docker

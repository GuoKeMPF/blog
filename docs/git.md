配置多个SSH Key

多数时候我们电脑上会有很多的git host,比如公司gitlab、github、个人的等，那我们就需要在本地配置多个ssh key，使得不同的host能使用不同的ssh key ,做法如下（以gitlab和github为例）：

生成gitLab生成的ssh key
```bash
ssh-keygen -t rsa -C 'yourEmail@xx.com' -f ~/.ssh/gitlab-rsa
# ssh-keygen -t type  -C 'email' -f file path
```
为github生成的ssh key
```bash
ssh-keygen -t rsa -C 'yourEmail@xx.com' -f ~/.ssh/github-rsa
```
查看user目录下ssh目录(隐藏文件)下是否存在config文件，如果没有则需要生成config文件。

 //生成config文件
 touch config

在config文件中配置多个不同的host使用不同的ssh key。

```
# gitlab
Host gitlab.com
    Host gitlab
    HostName gitlab.com
    User xxx@qq.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/gitlab-rsa.pub
# github
Host github.com
    Host github
    HostName github.com
    User xxx@qq.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/github-rsa.pub
 # 配置文件参数
 # Host : Host可以看作是一个你要识别的模式，对识别的模式，进行配置对应的的主机名和ssh文件
 # HostName : 要登录主机的主机名( 服务器IP)
 #  Port 22 : 端口
 # User : 用户名
 # IdentityFile : 指明上面User对应的identityFile路径，认证文件
 # StrictHostKeyChecking : yes 关闭提示
```
注意⚠️：生成ssh key时，-f ~/.ssh/gitlab-rsa中~/.ssh/gitlab-rsa是生成路径，必须正确。
问题

按照常规方法生成 ssh key ，并将 public key 添加到 git 账户中后，ssh 链接失败，一直报错 com@gitlab.com: Permission denied (publickey).
问题


找到 ssh_config 文件，做出如下设置：

Host *
    SendEnv LANG LC_*
    IdentityFile ~/.ssh/github-rsa
    IdentityFile ~/.ssh/gitlab-rsa
    HostkeyAlgorithms +ssh-rsa  
    PubkeyAcceptedAlgorithms +ssh-rsa
    PubkeyAcceptedKeyTypes +ssh-rsa

重新链接即可成功。


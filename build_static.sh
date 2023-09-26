# fix nodejs
# https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

# echo "config nodejs"

# echo "
#    config nodejs for OpenSSL3
#    export NODE_OPTIONS=--openssl-legacy-provider
#    https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported
# "

echo "export NODE_OPTIONS=--openssl-legacy-provider"

eval "export NODE_OPTIONS=--openssl-legacy-provider"

# echo "
#    install yarn and tyarn for npm
#    npm install yarn -g tyarn -g
# "
# eval 'npm install yarn -g tyarn -g'

source ./blog_admin/build.sh

eval 'mkdir -p ./blog_nginx/blog_static/admin/'
eval 'cp -r ./blog_admin/dist/* ./blog_nginx/blog_static/admin/'

source ./blog_note/build.sh

eval 'mkdir -p ./blog_nginx/blog_static/note/'
eval 'cp -r ./blog_note/dist/* ./blog_nginx/blog_static/note/'

source ./blog_site/build.sh

eval 'mkdir -p ./blog_ssr/app/public/'
eval 'cp -r ./blog_site/dist/* ./blog_ssr/app/public/'

# 检查打包结果
if [ $? -eq 0 ]; then
	echo "打包成功"
else
	echo "打包失败"
	exit 1 # 打包失败，返回非零退出码
fi


source ./blog_admin/build.sh

eval 'mkdir -p ./blog_nginx/blog_static/admin/'
eval 'cp -r ./blog_admin/dist/* ./blog_nginx/blog_static/admin/'

source ./blog_note/build.sh

eval 'mkdir -p ./blog_nginx/blog_static/note/'
eval 'cp -r ./blog_note/dist/* ./blog_nginx/blog_static/note/'

source ./blog_site/build.sh

# 检查打包结果
if [ $? -eq 0 ]; then
	echo "打包成功"
else
	echo "打包失败"
	exit 1 # 打包失败，返回非零退出码
fi

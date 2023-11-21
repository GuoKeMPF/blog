
source ./blog_admin/build.sh

eval 'mkdir -p ./blog_nginx/blog_static/blog_admin/'

eval 'cp -r ./blog_admin/dist/* ./blog_nginx/blog_static/blog_admin/'

source ./blog_note/build.sh


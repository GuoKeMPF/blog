source ./blog_admin/build.sh
eval 'cp ./blog_admin/dist ./blog_static/admin/'

source ./blog_static/build.sh
eval 'cp ./blog_site/dist ./blog_ssr/app/public'
source ./blog_admin/build.sh
eval 'cp -r ./blog_admin/dist/ ./blog_static/admin/'

source ./blog_site/build.sh
eval 'cp -r ./blog_site/dist/ ./blog_ssr/app/public'
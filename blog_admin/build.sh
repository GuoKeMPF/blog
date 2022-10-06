echo "build admin"
eval "cd ./blog_admin"

echo "install first"
eval "tyarn"


echo "build site"
eval "npm run build"


eval "cd ../"

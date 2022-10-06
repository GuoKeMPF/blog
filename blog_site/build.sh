echo "build site"

eval "cd ./blog_site"

echo "install first"
eval "tyarn"



echo "build site"
eval "npm run build"


eval "cd ../"


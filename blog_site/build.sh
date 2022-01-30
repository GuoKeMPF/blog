echo "build site"

eval "cd ./blog_site"
if [ ! -d "./node_modules" ]
then
    echo "install first"
    eval "tyarn"
fi



echo "build site"
eval "npm run build"


eval "cd ../"


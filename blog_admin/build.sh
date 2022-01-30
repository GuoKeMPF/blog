echo "build admin"
eval "cd ./blog_admin"

if [ ! -d "./node_modules" ]
then
    echo "install first"
    eval "tyarn"
fi



echo "build site"
eval "npm run build"


eval "cd ../"

echo "build site"

eval "cd ./blog_site"
if [ ! -d "./node_modules" ]
then
    echo "install first"
    eval "tyarn"
fi




eval "cd ../"


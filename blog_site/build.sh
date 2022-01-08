echo "build site"

eval "cd ./blog_site"
if [ ! -d "./node_modules" ] 
then
    echo "install first"
    eval "tyarn"
fi



if [ ! -d "./dist" ] 
then
    echo "build site"
    eval "npm run build"
fi

eval "cd ../"


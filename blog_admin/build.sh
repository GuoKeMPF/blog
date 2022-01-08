echo "build admin"
eval "cd ./blog_admin"

if [ ! -d "./node_modules" ] 
then
    echo "install first"
    eval "tyarn"
fi



if [ ! -d "./dist" ] 
then
    echo "build admin"
    eval "npm run build"
fi

eval "cd ../"
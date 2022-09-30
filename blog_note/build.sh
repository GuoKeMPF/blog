echo "build note"
eval "cd ./blog_note"

if [ ! -d "./node_modules" ]
then
    echo "install first"
    eval "tyarn"
fi

echo "build note"
eval "npm run docs"


eval "cd ../"

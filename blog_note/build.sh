echo "build note"
eval "cd ./blog_note"

echo "install first"
eval "tyarn"

echo "build note"
eval "npm run docs"


eval "cd ../"

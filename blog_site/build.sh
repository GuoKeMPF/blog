echo "build site"

if [ ! -e "/node_modules" ] 
then
    echo "install first"
    eval "tyarn"
fi



if [ ! -e "/dist" ] 
then
    echo "install first"
    eval "npm run build"
fi

exit 0



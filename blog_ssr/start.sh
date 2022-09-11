

echo "
   install yarn and tyarn for npm
   npm install yarn -g tyarn -g
"
eval 'npm install yarn -g tyarn -g'

if [ ! -d "./node_modules" ]
then
    echo "install first"
    eval "tyarn"
fi


echo "
start ssr with eggjs
https://www.eggjs.org/
"
eval "npm run alive"

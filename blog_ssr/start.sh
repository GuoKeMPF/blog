echo "
   install yarn and tyarn for npm
   npm install yarn -g tyarn -g
"
eval 'npm install yarn -g tyarn -g'

echo "install first"
eval "tyarn"

echo "start ssr with eggjs"
eval "npm run start"

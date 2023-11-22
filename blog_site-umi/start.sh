echo "run project with 'npm run start' (config.start.ts)"
echo 'node version'
eval 'node -v'
if [ ! -e "./node_modules" ]; then
  echo 'Install dependencies first'
  eval 'npm install yarn tyarn -g'
  eval 'tyarn'
fi
echo 'umi version'
eval 'npx umi -v'
eval 'npm run start'

echo "build site"

eval "cd ./blog_site"

echo "install first"
eval "tyarn"

echo "build site"
eval "npm run build"

# 检查打包结果
if [ $? -eq 0 ]; then
  echo "打包成功"
  exit 0 # 打包成功，返回退出码0
else
  echo "打包失败"
  exit 1 # 打包失败，返回非零退出码
fi

eval "cd ../"

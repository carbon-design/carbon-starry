echo 'installing cnpm : usr/local/'
echo 'insert user password if never accessed'
# modulePath="/usr/local/lib/node_modules/"
# if ["$modulePath"]; then  
# 　　chmod -R 777 "$modulePath"
# fi  
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
echo 'done.'
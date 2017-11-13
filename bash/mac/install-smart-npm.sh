echo 'installing smart-npm : usr/local/'
echo 'insert user password if never accessed'
sudo chmod -R 777 /usr/local/etc
sudo npm install --global smart-npm --registry=https://registry.npm.taobao.org/
echo 'done.'
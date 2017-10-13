@echo off
set currentPath=%cd%
echo The current directory is: %currentPath%
echo Installing smart-npm ...
npm install --global smart-npm --registry=https://registry.npm.taobao.org/
pause
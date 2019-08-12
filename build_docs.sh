#!/bin/bash
# Note this is for a CI server

set -ex

yarn
yarn run build

cp -R ./docs/.vuepress/public/json/topTokensList.json ./docs/.vuepress/dist/topTokensList.json

if [ "$GIT_BRANCH" = "origin/master" ]
then
aws s3 cp ./docs/.vuepress/dist s3://loomx.io/developers  --recursive --cache-control 'max-age=86400'
else
#aws s3 rm s3://stage.loomx.io/developers --recursive #remove old files first
aws s3 cp ./docs/.vuepress/dist s3://stage.loomx.io/developers  --recursive --cache-control 'max-age=86400'
fi

#!/bin/bash
# Note this is for a CI server

set -ex

yarn
yarn run build

if [ "$GIT_BRANCH" = "origin/master" ]
then
# aws s3 cp .vuepress/dist s3://loomx.io/developers  --recursive --cache-control 'max-age=86400'
echo 'Not building for master'
else
aws s3 cp ./docs/.vuepress/dist s3://stage.loomx.io/developers  --recursive --cache-control 'max-age=86400'
fi
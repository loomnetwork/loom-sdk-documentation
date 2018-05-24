#!/bin/bash
# Note this is for a CI server

set -ex

cd website
yarn
cp i18n/ja-JP.json i18n/ja.json
yarn run build

aws s3 cp build/developers s3://loomx.io/developers  --recursive --cache-control 'max-age=86400'

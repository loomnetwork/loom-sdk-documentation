#!/bin/sh -e
# Note this is for a CI server

cd website
yarn
yarn run build

aws s3 cp build/developers s3://loomx.io/developers  --recursive --cache-control 'max-age=86400'
#!/bin/bash
# Note this is for a CI server

set -ex

cd website
yarn
yarn run build

aws s3 cp build/developers s3://loomx.io/developers  --recursive --cache-control 'max-age=86400'

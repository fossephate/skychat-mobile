#!/bin/bash

cd ../skychat-lib
yarn pack

cd ../skychat-mobile
rm -rf ./node_modules/skychat-lib
pnpm i
pnpm expo prebuild
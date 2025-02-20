#!/bin/bash
cd ../skychat-lib
pnpm pack

cd ../skychat-app
rm -rf ./node_modules/skychat-lib
pnpm i && pnpm expo prebuild
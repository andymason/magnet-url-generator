#!/bin/bash
deno test src/functions.test.ts

deno compile \
  --unstable \
  --allow-net \
  --output dist/magnet \
  src/main.ts
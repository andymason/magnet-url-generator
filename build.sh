#!/bin/bash
deno compile \
  --unstable \
  --allow-net \
  --output dist/magnet \
  src/main.ts
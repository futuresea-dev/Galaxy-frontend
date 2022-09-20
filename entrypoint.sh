#!/bin/sh

if [[ -z "$API_URL" || -z "$ENABLE_MOCK" ]]; then
  echo "ERROR: Some ENV variable(s) not defined! See entrypoint.sh"
  exit 1
fi

sed " \
    s|%API_URL%|${API_URL}|g; \
    s|%ENABLE_MOCK%|${ENABLE_MOCK}|g; \
  " -i /var/www/html/config/config.js

exec "$@"

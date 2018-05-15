#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 registryAddress"
    exit 1
fi

node /opt/uport-did-driver/expressresolver.js $1

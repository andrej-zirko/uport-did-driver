#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 registryAddress"
    exit 1
fi

HOST_IP=$(/sbin/ip route|awk '/default/ { print $3 }')
node /opt/uport-did-driver/expressresolver.js $HOST_IP $1

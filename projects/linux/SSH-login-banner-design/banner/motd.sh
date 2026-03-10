#!/bin/bash

HOSTNAME=$(hostname)
IP=$(hostname -I | awk '{print $1}')
CPU=$(nproc)
MEM=$(free -h | awk '/Mem:/ {print $2}')
DISK=$(df -h / | awk 'NR==2 {print $5}')
TIME=$(date)

echo ""
echo "========================================"
echo "      Welcome to Learning Server"
echo "========================================"
echo ""
echo " Server Name : $HOSTNAME"
echo " IP Address  : $IP"
echo " CPU Cores   : $CPU"
echo " Memory      : $MEM"
echo " Disk Usage  : $DISK"
echo " Login Time  : $TIME"
echo ""
echo "========================================"
echo ""
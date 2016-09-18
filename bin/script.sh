#!/bin/bash

WORK_PATH="$(dirname "$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )")"

start() {
    nohup node $WORK_PATH/bin/www >> $WORK_PATH/script.log 2>&1 &
    echo $!
}

stop() {
    ps aux | grep www | egrep -v grep | awk '{print $2}' | xargs kill
}

case $1 in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    *)
        echo "Usage: $0 { start | stop | restart }"
        exit 0
        ;;
esac

#!/usr/bin/env bash

usage(){
cat <<'EOF'
Usage: ./network-init.sh [option] <command>
  -n, --name                      项目名称
  -p, --port                      端口号

./initialize.sh create            创建项目
./initialize.sh remove            清除项目
EOF
}

DIR=$(cd $(dirname "$0") && pwd)
# 默认值
NAME=docker-example
PORT=80

while [ $1 ]; do
    case "$1" in
        -n|--name)
          NAME=$2
          shift 2
          ;;
        -p|--port)
          PORT=$2
          shift 2
          ;;
        -h|--help)
          usage
          exit
          ;;
        *)
          break
          ;;
    esac
done

if [ ! $1 ];
then
  usage
  exit 1
fi
CMD=$1
shift

clean() {
  # 清理
  docker container stop $NAME-nginx 2> /dev/null
  docker container rm $NAME-nginx 2> /dev/null
  docker network rm $NAME 2> /dev/null
}

case "$CMD" in
    create)
      clean
      docker network create $NAME
      docker run -itd \
          -v $DIR/nginx.conf:/etc/nginx/nginx.conf -v $DIR/default.conf:/etc/nginx/conf.d/default.conf \
          --net $NAME \
          -p $PORT:80 \
          --name $NAME-nginx nginx:alpine || clean
      ;;
    remove)
      clean
      ;;
    *)
      usage
      ;;
esac

#!/usr/bin/env bash

usage(){
cat <<'EOF'
Usage: ./docker.sh [option] <command>
  -b, --branch                分支名
  -n, --name                  项目名
  -h, --help                  帮助

./docker.sh start             启动
./docker.sh stop              停止
./docker.sh restart           重启
./docker.sh remove            清除镜像
EOF
}

DIR="`dirname "$0"`"
# 默认值
BRANCH=master
NAME=docker-example

while [ $1 ]; do
    case "$1" in
        -n|--name)
          NAME=$2
          shift 2
          ;;
        -b|--branch)
          BRANCH=$2
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

export BRANCH=$BRANCH
export NAME=$NAME

echo 项目名: $NAME
echo 分支名: $BRANCH

case "$CMD" in
    start)
        mkdir $DIR/logs
        mkdir $DIR/logs/$BRANCH
        mkdir $DIR/logs/$BRANCH/nginx
        mkdir $DIR/logs/$BRANCH/server
        docker-compose -p $NAME-$BRANCH -f "${DIR}/docker-compose.yml" up -d --build
        ;;
    stop)
        docker-compose  -p $NAME-$BRANCH -f "${DIR}docker-compose.yml" down
        ;;
    restart)
        mkdir logs
        mkdir logs/$BRANCH
        mkdir logs/$BRANCH/nginx
        mkdir logs/$BRANCH/server
        docker-compose  -p $NAME-$BRANCH -f "${DIR}docker-compose.yml" down
        docker-compose  -p $NAME-$BRANCH -f "${DIR}docker-compose.yml" up -d --build
        ;;
    remove)
        docker-compose  -p $NAME-$BRANCH -f "${DIR}docker-compose.yml" down
        docker image rm `docker images --format "{{.Repository}}" | grep $NAME-$BRANCH`
        ;;
    *)
      usage
      ;;
esac
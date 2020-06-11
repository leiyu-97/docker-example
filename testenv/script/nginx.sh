envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx-debug -g "daemon off;"
#!/usr/bin/env bash
ssh root@$HOST_IP <<EOD
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker pull $IMAGE_NAME
docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true
docker run -v /root/$VIRTUAL_HOST/data-db:/data/db -d --name $DB_CONTAINER_NAME mongo:4.2
docker run -e DATABASE_URL=mongodb://db/$DB_NAME -e VIRTUAL_HOST=www.$VIRTUAL_HOST,$VIRTUAL_HOST -e LETSENCRYPT_HOST=$VIRTUAL_HOST -e CLIENT_URL=$CLIENT_URL -d --link $DB_CONTAINER_NAME:db --name $CONTAINER_NAME $IMAGE_NAME
if [ "$(docker ps -q -f name=nginx)" ]; then
  docker exec nginx nginx -s reload
fi
EOD

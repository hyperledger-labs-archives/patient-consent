export IMAGE_TAG=latest
#source scripts/1_envsetup.sh
docker-compose -f docker-compose-solo-couchdb.yaml down -v
docker-compose -f docker-compose-solo-couchdb.yaml -v
docker rm $(docker ps -aq)
docker network prune -f
docker volume prune -f
docker ps -a
docker volume ls
docker network ls

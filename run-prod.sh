#!/bin/bash


# (cd backend && ./mvnw package)
# (cd webapp && npm run build)
# docker-compose build

docker load -i artifacts/webapp.tar
docker load -i artifacts/backend.tar
docker-compose -f docker-compose-prod.yml up -d 
docker-compose -f docker-compose-prod.yml ps 

#!/bin/bash

docker load -i artifacts/webapp.tar
docker load -i artifacts/backend.tar
docker-compose -f docker-compose-prod.yml up -d --force-recreate
docker-compose -f docker-compose-prod.yml ps 

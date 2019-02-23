#!/bin/bash

rm -rf prod-nginx/app/
tar -xvf artifacts/webapp.tar -C prod-nginx
mv prod-nginx/webapp/build prod-nginx/app
docker load -i artifacts/backend.tar
docker-compose -f docker-compose-prod.yml build
docker-compose -f docker-compose-prod.yml up -d
docker-compose -f docker-compose-prod.yml ps 

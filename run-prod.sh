#!/bin/bash

(cd backend && ./mvnw package)
(cd webapp && npm run build)
docker-compose build
docker-compose up -d 
docker-compose ps 

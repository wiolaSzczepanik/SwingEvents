#!/bin/bash

(cd backend && ./mvnw package)
(cd webapp && npm run build)
docker-compose build
tar -cvf webapp.tar ./webapp/build/
docker save -o backend.tar swingevents_backend
scp *.tar root@68.183.216.32:/root/SwingEvents/artifacts/

#!/bin/bash

docker-compose build
docker save -o webapp.tar swingevents_web
docker save -o backend.tar swingevents_backend
scp *.tar root@68.183.216.32:/root/SwingEvents/artifacts/

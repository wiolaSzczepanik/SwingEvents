#!/bin/bash

if [ -z "$1" ]; then
    backend=1
    frontend=1
elif [ "$1" == "frontend" ]; then
	backend=0
    frontend=1
elif [ "$1" == "backend" ]; then
	backend=1
    frontend=0
else
	echo "Invalid option"
	exit 1
fi

if [ $frontend == 1 ]; then
	(cd webapp && npm run build)
	tar -cvf webapp.tar ./webapp/build/		
	scp webapp.tar root@68.183.216.32:/root/SwingEvents/artifacts/
fi

if [ $backend == 1 ]; then
	(cd backend && ./mvnw package)
	docker-compose build
	docker save -o backend.tar swingevents_backend
	scp backend.tar root@68.183.216.32:/root/SwingEvents/artifacts/
fi

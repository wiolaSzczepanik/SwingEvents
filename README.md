# SwingEvents

## run backend 

    start in IntelliJ

## run frontend

    npm install
    npm start

## run postgres

	docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres

## connect to postgres

	psql -h localhost -U postgres -d postgres	# connect to postgres
	\c events					# connect to DB
	\d						# list tables
	\d+ events					# describe table
	select * from events;

## deploy
	back to main folder
	git checkout master
	git pull 
	./deploy.sh
	ssh root@kiedytancze.pl
	cd SwingEvents
	./run-prod.sh

## new feature
	git checkout master
	git pull
	git checkout -b nameOfBranch
	make some changes
	git commit
	git push
	create pull request
	wait for review
	merge
	close github issue

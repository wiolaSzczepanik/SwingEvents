# SwingEvents

## run backend 

    start in IntelliJ

## run frontend

    npm install
    npm start

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
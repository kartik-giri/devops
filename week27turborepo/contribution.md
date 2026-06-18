## Starting using docker compose.
1. Install docker and coker compose
2. Run:
     - docker compose up -d
     - This will build and start all the containers with single cmd

## Deploying on production V
1. create commit
2. Push the commit
3. CD workflow will listen the push action and will clone the repo sing in docker hub build the image using dockerfile and push it to docker hub. Than pull the latest image in our vm and run it.
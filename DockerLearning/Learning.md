## What is Docker?
Docker is a platform that lets you package an application and everything it needs into a container.

Docker engine is the open source containerization technology used by devs to packaget there whole application in to container , run it and ship it 

Think of a container as:
A lightweight isolated box that contains your application and all its dependencies.

If the container works on your laptop, it should work on:
AWS
Azure
DigitalOcean
Another developer's laptop
Production servers

## Container
- Container is the way to package any software with all its dependencies and libraries into single unit which can be run and deployed on any machine with a container run time such as Docker.

- Containers runs application in isolated enivronment from machine.

- For example if I containerize my bun app than whole bun will be containerize too along with my app.

## Starting docker locally
1. Install docker engine and cli to intract with docker engine.
2. docker run -p 27017:27017 mongo -> to install mongo image locally and run whole container.
3. docker images ->  to see all installed images
4. docker rmi a706cb4e493b(process ID) --force -> to delete image
5. docker ps -> to seel all running containers

6. An image which is in execution/running is called container.
7. docker kill containerId -> to kill running container

## VM vs Container
- A VM virtualizes hardware and runs a complete guest operating system with its own kernel.
- Container vertualized the operating system environment, package the application, it's dependecies, files system etc. but shares host operating system kernel.

Container virtualizes:
  ✅ OS environment
  ✅ File system
  ✅ Application code
  ✅ Dependencies + libraries
  ✅ Environment variables
  ✅ Network interface (own IP)
  ✅ Process space

Container shares:
  ❌ Host OS kernel
  ❌ Hardware drivers
  ❌ Physical resources (CPU, RAM, disk)

## Image vs Container
1. Docker image is a lightweight, standalone, executable pacakge which include everything needed to run a piece of software including codebase, runtime, dependcies , environment var etc.
2. Docker container is the running instance fo image. It encapsualtes the appilcation or service and runs it in an isolated environment.

## Port Mapping
1. Port is a logical virtual endpoint which is used by operating system to route nextowrk traffic to specific correct process.
2. Port is a logical virtual endpoint that the operating system uses to route network traffic to the correct, specific process.

- Port mapping in docker is the way to expost the container port to the host machine by linking the host machine port with the container port.
3. In docker we need to expose the port of running container to the host machine.
4. docker run -p 27018:27017 mongo -> mongo container default port is 27017 every mongo container will run on port:27017 to expose it and access the container we need to do port mapping which link the container port to host machine port. 

5. docker exec -> cmd is used to execute something inside container
6. docker exec -it(interactive mode) u83u4834834(dockerId) sh -> this cmd executes sh cmd inside container and guves us the shell access in the container

## Important How to containerize/create image  any application.
1. Create Dockerfile
2. FROM node:24-alpine -> using node image as base image
3. WORKDIR /app -> It sets the working directory inside the container. Every command after this runs from /app inside the container.
4. COPY . . -> copy every file from root directry to the image root.
5. .dockerignore -> used to ignore certain file/folders from copying into image like node_modules and alos the Dockerfile cause it is not needed in container.
6. RUN npm install -> run this cmd on image app directry to install all dependecies
7. EXPOSE 3000 -> expose the certain port for certain process
8. CMD ["node", "index.js"] -> Runs when container starts
9. docker build -t hello-world-app(nameofImage) . -> use to build image
10. docker build -t    hello-world-app    .
    │            │           │            │
    │            │           │            └── build context
    │            │           │                (where to find Dockerfile)
    │            │           │
    │            │           └── name/tag for the image
    │            │               (hello-world-app:latest)
    │            │
    │            └── --tag flag
    │                (give this image a name)
    │
    └── build an image from a Dockerfile
11. What each part does
- docker build — reads your Dockerfile and creates an image from it
- -t hello-world-app — names the image hello-world-app. Without -t your image gets a random ID like a1b2c3d4e5f6 which is hard to reference later
- . — the build context. Tells Docker "look for the Dockerfile in the current directory and send all files here to the Docker daemon for building"

12. docker images -. returns all the installed images included my build images.
13. docker run -p 3000:3000 hello-world-app -> run my image cause it is running it is container which is ecuting in isolated envitonment 

14. BOOM our node app is contianerized and running.
15. # build with your username from the start
    docker build -t kartikgiri/hello-world-app .
16. docker push kartikgiri/hello-world-app -> creates public Image on docker registery.


## Passing ENV var to docker images.
- docker run -p 3000:3000 -e DATABASE_URL="postgrressdncjdncd" image-name

## Docker Layers
1. Docker Layers are the fundamental part in the image architecture, that allows docker to efficient, fast and portable. The docker image is essnetialy build up from a series of layers, each layer reporesenting set of diefferences from the previous layer.
2. it has 4 layers:
```javascript
FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
```

## Why layers?
1. Cache stores the data temporary so that machine don't fetch or compute it again.
2. Caching stores the output of the command and skips the cmd execution if input hasn't changes and directly gives the cached output to save the time. 

3. The docker layers are cached and reused if the input hasn't changed. To make image build and sharing more fast and efficient.
4. If i change the repo than the layers  before copy . .will be reused but after copy . . all these layers will be rebuild.
5. If the input hasn't changed than Docker can resue the cached layers.

## Optimize docker file
1. 
```javascript
FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]
```
2. Here when ever dev changes the source code. npm install layer is rebuilding again which usually takes alot of time.
3. To optimize this just copy package and package.lock-hcon above and run npm install.
4. Now if i change source code only copy . . layer will rebuild and npm install cached layer will be reused cause it hasn't changed. 

## Volume
1. If container crashes or closed than data get deleted too and memory allocated to container get free.
2. If we are storing data in mongo container and mongo container get closes than all the data will be lost.
3. To presist the container data we use Volume. Containers are stateless.

4. docker volume create volume_Name -> Creates the volume
5. docker run -p 27017:27107 -v volume_Name:/data/db mongo -> It sync the db data with volume.
6. MongoDB stores data in /data/db
-  That folder is linked to a volume
-  Volume persists on your machine even after container stops ✅

7. docker volume ls -> to gett all volumes
8. Now data persist even after restarting mongo container.


## Network
1. I started mongo db container with volume on exposed port 27017.
2. And created my express server which is listening on host machine port 300.
3. Express server is accessing mongoDB container on port 27017 successfully. 

4. But if containerize the express app too and run it as container? THan how express app container can access mongoDB container????
5. BUild the express app. 
 => [2/6] WORKDIR /app top 2 layers are resused because they exist in different image.
6. Now when I run express app container it can't access mongoDB container. Because in express app connecting to localhost:27017 means express app container is checking in it's own port 27107.

7. So the solution of one container can't access another container is networks.
8. docker network create network_Name -> create network.
9. docker run --name mongo_container --network express_mongo_net -p 27017:27017 -v mongoDB_volume:/data/db mongo
-  --name mongo_container -> giving name to the container on network.
-  --network express_mongo_net -> listen on this bridge network.
10. Now in express container becuase both container are on same netwwork. express container can access mongo container using it's name.
11. BOOM it worked using mongo container name -> 'mongodb://mongo_container:27017/myDatabase';
12. also we can remove port in start cmd cause container is accessed from network. BUt we should use port 

13. Bridge network is the network which allows multiple containers to communcate with each on same host machine.

## Docker -compose 
1. Is the file used to run multiple containers at a same time on single network with synced volumes. instead of writing cmd to start image indivually we can start them together using docker compose.

2. Creating express, postgress node project.
3. docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres -> -d run postgress in detached mode means log running service.
4. Dev need to do all these steps manually if any one wants to run our project.
1. Install node and npm.
2. Clone the repo.
3. Install dependecies - npm run install.
4. get the DB instance either run docker or use neondb.
5. Change the DATABASEURL in ENV.
6. RUn migration to convert prisma code in to postgress quries so that it can run on DB to create table.
7. Generate client.
8. Npm run build -> Compile ts files into js.
9. npm run start - Start the project.

5. To make application tun in container we use docker compose and dockerfile.

6. I'm getting error while building express app with prisma. Error: P1001: Can't reach database server at `localhost:5432`
7. Because while docker builds runs each RUN cmds in isolated environment that's why it can't access host machine port and neither container port.
8. It has no access to:
Your host machine's localhost
Other running containers
Any docker network you set up
9. From first you will consider why don't we create a network and run prisma container and build the express app on same network.
10. But there is catch cause dockerfile build steps can't access user defined networks. dockerfile Build steps can only access the host machine network. docker build --network=host -t imagename . -
- But this access prisma only if prisma in running directly on host machine.
- To solve
1. I created  network.
2. Ran prisma container on that network.
3. Added "docker:start": "prisma migrate dev && npm start" -> it runs migration when express container starts and only when prisma container running on same network.
4. docker run --network composeapp_net -p 3000:3000 kartikgiri composeapp -> running express container on same network.
5. BOOM, it is working now. Beacuse at end the cmd which needed prisma container is running only on network in container. cause they are runnign on same network express app can zcces prisma container.

- docker container prune-> cmd to drlete all stopped containers
6. Now created docker-compose.yml and run docker-compose up -> to start application and other services ans container with single cmd.
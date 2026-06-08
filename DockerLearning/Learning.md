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
## What is Docker?
Docker is a platform that lets you package an application and everything it needs into a container.

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

## VM vs Container
- A VM virtualizes hardware and runs a complete guest operating system with its own kernel.
- Container vertualized the operating system environment, package the application, it's dependecies, files system etc. but shares host operating system kernel.

## Image vs Container
1. Docker image is a lightweight, standalone, executable pacakge which include everything needed to run a piece of software including codebase, runtime, dependcies , environment var etc.
2. Docker container is the running instance fo image. It encapsualtes the appilcation or service and runs it in an isolated environment.

## Port Mapping
1. Port is a logical virtual endpoint which is used by operating system to route nextowrk traffic to specific correct process.
2. Port is a logical virtual endpoint that the operating system uses to route network traffic to the correct, specific process.

3. In docker we need to expose the port of running container to the host machine.
4. docker run -p 27018:27017 mongo -> mongo container default port is 27017 every mongo container will run on port:27017 to expose it and access the container we need to do port mapping which link the container port to host machine port. 

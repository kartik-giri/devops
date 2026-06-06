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
2. docker run -p 27017:27017 mongo -> to install monog image locally and run whole container.
3. docker images ->  to see running images
4. docker rmi a706cb4e493b(process ID) --force -> to delete image
5. docker ps -> to seel all running containers
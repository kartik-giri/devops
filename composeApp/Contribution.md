## Manual installation.
1. Install node and npm.
2. Clone the repo.
3. Install dependecies - npm run install.
4. get the DB instance either run docker or use neondb.
5. Change the DATABASEURL in ENV.
6. RUn migration to convert prisma code in to postgress quries so that it can run on DB.
7. Generate client.
8. Npm run build -> Compile ts files into js.
9. npm run start - Start the project.

## Docker installation.
1. Install Docker
2. Start Postgress container:
   - docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
3. Build the image: `docker build -t userImage .`
4. Start the image - `docker run -p 3000:3000 userImage .`

## Docker Compose installation.
- Docker compose is the file used to run multiple containers with network and volume at same using only one cmd.
1. Install Docker, docker -compose
2. Run `docker-compose up` -> runs docker compose file.
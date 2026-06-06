1. We have learnt how to deploy projects on VM but what if I updated the repo on github?
2. Than in that case i have pull the updated repo install dependcies run tests build repo and run it all manually.

3. We need to automate this repo updation task on VM.

4. A process is the task which is running or about to be run on CPU. When process runs OS allocates resources to it. and when process dies all the resources are deallocated from process by the OS.

5. Background-Process-> The background process is the process which is not attached to the terminal and once it is initiated it will continue running even though terminal is closed.

6. Servcice -> The services is the process which provides functionality and  needs to run 24/7 for example ws server or postgresssql.
Daemon in linux is the background service. Background process + long-running service.

7. Process manager->  is the process whose job is to manages other processes.for example PM2.

8. Imagine ws server crashes due to invalid input or aws restart in that case ws process will not restart and user can't access it. so that's why we need PM2 which manages the other processes.

8. Imagine AWS reboots the VM in this case all the RAM will be lost and every server will be offline. With PM2 using, it will restart the server and the new ram will be allocated to processes. very important. 

9. PM2 only knows:
Start process
Stop process
Restart process
Monitor process

10. What does production usually look like?
Your future drawing app might look like:
Ubuntu VM
│
├── Process Manager
│     ├── Next.js Process
│     ├── WebSocket Process
│     └── Background Worker Process
│
├── Nginx Service
│
└── PostgreSQL Service

11. Notice something interesting:
Nginx
PostgreSQL
Redis
PM2
Next.js
WebSocket

They're all just processes.

The entire server is basically:

Operating System
       ↓
Many Processes

Once you truly understand that idea, Linux, Docker, Kubernetes, Redis, and cloud infrastructure become much easier because almost everything is ultimately about creating, managing, communicating between, and restarting processes.

12. lsof -i :3000 -> Show me the process that is using port 3000.
13. COMMAND    PID   USER FD   TYPE DEVICE SIZE/OFF NODE NAME
    MainThrea 2372 ubuntu 22u  IPv6  13153      0t0  TCP *:3000 (LISTEN). 
    Here running process on port 3000 process ID is 2372 
14. kill 2372(Process Id) -> OS kills the process
15. Now we understand the problem there might multiple factors which will kills our services and to restart those services automatically we use PM2.
16. install PM2 on VM  globally->   npm install pm2@latest -g
17. pm2 start serviceName.extension in particular service.
18. pm2 start app.js
19. pm2 status
20. When i ran kill process ID it kills the process but PM2 rerun the service.
21. That's why when i ran lsof -i :3000 after killing process it returned new process Id cause process has rerun after it was killed.

22. curl localhost:3000
    curl is the client for terminal.
    Just like postman.
    curl send the request to server and get back the response from server and prints it on terminal.

23. pm2 list -> prints all the processes which are running by pm2. pm2 acts as supervisor for all other processes.
24. pm2 delete 0 (pm2 process id)
25. pm2 examples -> list all cmds

26. CONTINUOUS INTEGERATION.
    1. CI -> Stands for continuous Integration.
    2. We need continuous Integration because Imagine there are 2 devs Dev A and Dev B.
    Dev A made some changes and successfully ran it on its branch. Same for Dev B made some  changes and successfully ran it on its branch. 
    Change A and B runs independently but breaks when merge/runs together which breaks the production  code .  

    3. That's why we need CI which checks every commit individually before  merging into main branch.

    4. GitHub
       ↓
      CI Pipeline starts
       ↓
      Install dependencies
       ↓
      Build project
       ↓
      Run tests
       ↓
      Pass ✅

       or

      Fail ❌
    5. Most important is CI doesn't deploy the changes on our VM it just verifies the changes on it's own mini VM.

27. CONTINUOUS DEPLOYEMENT:
    1. CD -> Continuous Deployement.
    2. The Problem CD solves is that before CD. When dev makes changes in main branch. they need to manually update the repo in VM. Like ssh in to VM. Pull the updated repo. Install dependencies. Build app. Restart server.
Developer
    ↓
Push code
    ↓
SSH into server
    ↓
Pull latest code
    ↓
Install dependencies
    ↓
Build app
    ↓
Restart server
   3. So After code passes CI code is merged and CD deploys the updated code on VM automatically.
   4. Code automatically deploys after all checks pass.

5. Push Code
      ↓
CI Runs
      ↓
Build
Tests
Lint
      ↓
Pass ✅
      ↓
CD Starts
      ↓
Deploy to EC2
      ↓
Restart App/pm2 start app
6. CD pipeline:
Code merged
      ↓
GitHub Action
      ↓
SSH into EC2
      ↓
Pull latest code
      ↓
Build
      ↓
Restart PM2

New version is live 


28. CI in github acctions: Github runs given steps when certain event is occured.
1. github/worflows -> In this file we tell github to run certain steps, when certain events happen.
2. Before GitHub Actions
Without CI:
Developer
    ↓
git push
    ↓
Manually run:
pnpm install
pnpm build
pnpm test

You do everything yourself.  
3. Now with github actions:
Developer
    ↓
git push
    ↓
GitHub notices push
    ↓
Reads workflow file
    ↓
Creates temporary VM
    ↓
Runs commands
    ↓
Reports Pass/Fail  

4. Github runs the code on it's rented ubuntu VM.
5. 1. Create Ubuntu VM
2. Clone my repo
3. Install dependencies
4. Build project
5. Run tests
6. Tell me if it passed

6. Exmaple .github/workflow .yml file:
```yml
name: CI

on:
pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - run: pnpm install

      - run: pnpm turbo build
```

7. CD workflow yml file.
```yml
name: Deploy to EC2

on:
  push:
    branches:
      - main 

jobs:
  deploy:
    name: Push to EC2
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the code
        uses: actions/checkout@v2

      - name: executing remote ssh commands using password
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ubuntu@ec2-3-6-215-131.ap-south-1.compute.amazonaws.com
          username: ubuntu
          key: ${{ secrets.PRIVATE_SSH_KEY }}
          port: 22
          script: ./deploy.sh
``` 

29. In CD github runner VM needs private key to access our EC2 which will have public key.
    Generate public private key in local mahcine add private key in repo secret and public in our EC2.
30. The error i face while pushing code in EC2. was that github VM successfully ssh in to EC2 when it comes to running commands it can't find deploy.sh which is not present in EC2 solution just write the cmds directly on scripts.
31. COde is inside cicd_demo repo

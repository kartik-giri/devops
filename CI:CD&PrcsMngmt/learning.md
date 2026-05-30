1. We have learnt how to deploy projects on VM but what if I updated the repo on github?
2. Than in that case I have to delete the deployed repo and deploy the updated repo, which is not good approch.

3. We need to automate this repo updation task on VM.

4. A process is the task which is running or about to be run on CPU. When process runs OS allocates resources to it. and when process dies all the resources are deallocated from process by the OS.

5. Background-Process-> The background process is the process which is not attached to the terminal and once it is initiated it will continue running even though terminal is closed.

6. Servcice -> The services is the process which provides functionality and  needs to run 24/7 for example ws server or postgresssql.
Daemon in linux is the background service. Background process + long-running service.

7. Process manager->  is the process whose job is to manages other processes.for example PM2.

I8. magine ws server crashes due to invalid input or aws restart in that case ws process will not restart and user can't access it. so that's why we need PM2 which manages the other processes.

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
15. Now wwe understand the problem there might multiple factors which will kills our services and to restart those services automatically we use PM2.
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


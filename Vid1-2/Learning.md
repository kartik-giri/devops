CREATING A AWS EVC2 VM INSTANCE:
1. Name a EC2 instance.
2. Seclected OS
3. Selected os version
4. Selected instance specificatons type.
5. Created private public key.
6. Added new security group open port 3000 and 22
7. Added 16 gb storage.

8. Create elastic public IP address.
9. Add Associate public IP address with EC2 instance.

10. Move private key from download to root folder.
11. run chmod 400 "deploy-on-EC2.pem" -> means other users have no access for read, write it.
12. than finally run:
ssh -i "deploy-on-EC2.pem" ubuntu@ec2-15-206-99-203.ap-south-1.compute.amazonaws.com
It means -i-> input is user private key ubuntu is username we are using VM domain name also can use it's public IP address.

13. Clone the repo on VM
14. Go to cloned repo run npm install to install all dependecies.
15. BUt node or bun is not installed on our VM Just install it on VM NOW.
16. Install node on ubuntu VM by running curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
17 nvm install --lts
18. node index.js -> runs the process.

19. Now our app is running on net.
http://15.206.99.203:8080/todos returns the response.

20. For backend -> clone the repo, install bun or node, than install dependecies and now our backend endpoints is accessible across internet

21. But the problem is that we need to IPAddress:Port/route to access the deployed process.
22 http://13.207.47.42:8080/todos Need to convert it more human readiable form.
23. We are adding port to get the running process. BUt how others are doing withour port?
24: https://www.google.com/ -> https means port 443 by default AND http port is 80 by default.
25. SO what is the assumed solution to remove 8080 is to run process on port 80 right? But os stops processes from running on port 80.
26. vi filename is cmmd to open file for editing on linux based os.

27. Let's we gave the access to run process on port 80 now myapp.com will run on port 80. But if i have another process mysaas.com than it will not run on port 80. 
    because only one process can run on one port. 
28. To make multiple resources run on single port we need a mechanism which will route the myapp.com traffic to myapp/index.js process and mysaas.com traffic to mysaas/index.js

29. FORWARD PROXY
-> Forward proxy is the server which sits between the client and the internet. 
   For example there is a site which isn't accessble to indian IPs like tiktok.
   In this case client can a get forward proxy with USA IP and client sends request to FP and than FP will forward the request to tiktok IP and tiktok IP will imagine request is coming from USA IP sends the respeonse to USA FP and than FP will return the response to client. 

30. SO the solution for our path problem is ngnix reverse proxy.
    Nginx will run on port 80 and our processes will run on different port like myapp.com -> 3000, mysaas.com -> 3001
    And Ngnix reverse proxy will route the traffic accordinagly on the basic of domain name.

31. And cause Nginx is running on port 80 there is no need to define port in the path. For example if client types http://myapp.com -> this path will run nginx and nginx will route the traffic to the process which matches the domain name.

32. To run ngnix on VM -> sudo apt update
                          sudo apt install nginx 

33. Need to open port 80 in security group.
34. As we know domain underneth points to public IP address of server. We do this while getting domain. Multiple domains can point to same server public IP 
35. Now need to conginure nginx so that it route traffic from certain domain name to certain process.
36. By editing -> sudo vi /etc/nginx/nginx.conf
    sudo -> super user user.
37. Here we are configuring nginx to route traffic to associated process on the basic of domain.
   - On https request from domain myapp.100xdevs.com on port 80 route the traffic to this process  proxy_pass http://localhost:8080;
38. sudo nginx -s reload.
```javascript
events {
    # Event directives...
}

http {
	server {
    listen 80;
    server_name myapp.100xdevs.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}

    server {
    listen 80;
    server_name mysaas.100xdevs.com;

    location / {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
	}
}
```

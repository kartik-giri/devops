## YAML COURSE
1. YAML -> Stands for "YAML Ain't Markup Language".

2. HTML -> It is mostly used to create the structure of the site. BUT how? 
-  HTML uses pareent child relation ship. like html tag have header and body as child.

3. Just like that YAML provides child parent relationship which is used  to format data and exchange data. Like json.

- In YAML we can only store data not cmds like condtional etc.

### Data serialization:
- Data serialization is the process of converting complex in-memory programming objects or data structures into a flat, transmittable format (such as a sequence of bytes or a text string). 

- For example in my machine i have stored student object which is having it's own memory. 
- So to share the object stored in my machine to iphone i will use serialization which will covnert the complex in memory object in to flat transmittable format like text string.

- OBJECT --> SERALIZARION --> STREAM OD BYTES -->  Sored in yaml file or db etc.

- Data serilization lang are json. yaml. xml etc.

### Where it used?
1. Lets say i want docker to know that i want to run multiple images.
2. How i will do that? I have to share the data between my process/machine and docker right?
3. In this case i will use YAML. And write yaml file(docker compose file) where i write the yaml to run build and run multiple containers.
4. Using yaml file i can share the data with docker and let it know what i want.

5. For the same reason i use yaml to write githb workflows, and docker compose file an other config file.

### Benftis
1. Simple and easy to read file.
2. Strict syntax with identation.
3. Easily convertable to json. xml etc.
4. It is more powerfull when representing complex data.

### Syntax/ pairs
1. Key value pair -> image: postgres
2. parent child -> services
                     postgres
3. arrays -> environment:
               - DATABASE_URL:jdncjdjcdnc

4. key: value
parent:
  child: value
list:
  - item1
  - item2

5. A good mental model:
Level 0 → no spaces
Level 1 → 2 spaces
Level 2 → 4 spaces
Level 3 → 6 spaces
Level 4 → 8 spaces

6. In YAML, the | means "literal multi-line string".
-  build-args: |
     DATABASE_URL=${{ secrets.DATABASE_URL }}
     DB_URL=${{ secrets.DATABASE_URL }}

7. To write mutple lines but will be looksed as same line.
-  message: >
     docker start
     -p 3000:3000
     mongo


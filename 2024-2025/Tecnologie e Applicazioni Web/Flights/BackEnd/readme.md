Nodejs + MongoDB + Express  backend
---

How to run it via Docker:

1. Create a new network

```
docker network create flights
```


2. Start a MongoDB container 

```
docker run --network flights --name mongoproject -d mongo:6
```


3. Open VSC and reopen this directory in container


4. Open the terminal and run

```
npm install
npx tsc 
```

5. Run the application

```
node postmessages
```


Optional:
---

To inspect the database with mongo shell:

```
docker run -it --name mongodbshell --network flights --rm mongo:6 mongosh --host mongoproject
```

Then, inside the shell:

```
use flight_project;
show collections;
```

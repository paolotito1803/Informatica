BACKEND AND MONGODB

The required applications are: Docker Desktop, Visual Studio Code and a browser.

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


4. Open the terminal and write

```
npm install
npx tsc 
```

5. Run the backend

```
node travelrequests
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

FRONTEND

1. Open VSC and reopen this directory in container

2. Open the terminal and write 

```
cd Frontend
npm install
```

3. Run the frontend
 
```
ng serve --host 0.0.0.0
```

4. Open the browser and write the following URL

```
http://localhost:4200
```

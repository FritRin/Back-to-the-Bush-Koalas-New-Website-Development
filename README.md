# CSC3600---BTBK---PRAJJV

Repository for CSC3600 ICT Professional project 

### Before running the app
- have Docker or the Docker Desktop app and ensure it is running
- Install necessary dependencies

Run the following command(s):

```
docker-compose up -d
```
You should see 4 containers:

1. caddy webserver (proxy server)
2. frontend
3. backend
4. database

To bring down the containers:
```
docker-compose down
```
Link to the Frontend [http://localhost](http://localhost) (recommended to use FireFox), If not working go to [http://localhost:5173](http://localhost:5173)

link to the Backend [http://localhost:3000](http://localhost:3000)

link to the Documentation to test the endpoints [http://localhost:3000/docs](http://localhost:3000/docs)

The "docker-compose.yml" will install all the depenedecies in package.json, the ones currently installed are:
- Backend: 
    - cors
    - dotenv
    - express
    - pg (postgresql)
    - sequelize (To make connection to the DB)	
    - swagger (For API Documentation)

- Frontend
    - react
    - react-dom
    - tailwindcss
    - axios (Fetch)

If there are any missing packages feel free to manually install them. 

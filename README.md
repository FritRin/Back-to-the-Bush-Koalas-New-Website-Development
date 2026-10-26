# CSC3600---BTBK---PRAJJV

Repository for CSC3600 ICT Professional project 

### Before to run the app
- have docker ready make sure is on
- Install Dependencies neccesary

Run the next command

```
docker-compose up -d
```
You should see 4 container:

1. caddy webserver (act as a proxy)
2. frontend
3. backend
4. database

to destroy:
```
docker-compose down
```
Link to the Frontend [http://localhost](http://localhost) (recommedable FireFox), If not working go to [http://localhost:5173](http://localhost:5173)

link to the Backend [http://localhost:3000](http://localhost:3000)

link to the Documentation (swagger or postman optional) To test the endpoints Up to you. [http://localhost/doc](http://localhost/doc)

The "docker-compose.yml" will install all the depenedecie in package.json so far what are installed are:
- Backend: 
    - cors
    - dotenv
    - express
    - pg (postgresql)

- Frontend
    - react
    - react-dom
    - tailwindcss
    - axios

If is missing any package go for it. 

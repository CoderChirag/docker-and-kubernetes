This is the basic docker setup using dockerfile and manual docker commands.

Run these commands to start the docker in local environment.

- **Prerequisites :** Docker should be present on your system.
- Clone the repository.
- Cd into project directory : `cd docker-and-kubernetes/basic-docker-setup`
- Build Docker from Dockerfile : `docker build -t basic-docker-setup .`
- Run the docker container : `docker run --name basic-docker-setup -p 3249:3000 -d basic-docker-setup`
- Now visit `http://localhost:3249`, you would be seeing the React Landing Page, if everything is setup correctly.

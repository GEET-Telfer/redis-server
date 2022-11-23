# Redis Server

## Purposes/ Funtionalties
* Reduce fetching requests to the database.
* Block request spamming for user response.
* Utilize in-memory database to increase website throughput.

## How to use:
Build Image from Dockerfile
```Docker
docker build -t [Image Name] --build-arg port=[PORT] .
```

OR

Pull from Docker Hub
```
docker pull pwangdev/geet-redis-service
```
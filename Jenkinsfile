docker stop restaurant-container || true
docker rm restaurant-container || true

docker build -t restaurant-app .
docker run -d --network host --name restaurant-container restaurant-app
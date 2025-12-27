#!/bin/bash
docker rm -f restaurant-container mysql 2>/dev/null

docker network create restaurant-network 2>/dev/null

docker run -d \
  --name mysql \
  --network restaurant-network \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=restaurant_db \
  -e MYSQL_USER=appuser \
  -e MYSQL_PASSWORD=app123 \
  mysql:8

sleep 10

docker exec -i mysql mysql -u appuser -papp123 restaurant_db <<EOF
CREATE TABLE IF NOT EXISTS restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  meal VARCHAR(255) NOT NULL
);
INSERT INTO restaurants (name, meal) VALUES
('Pizza Palace', 'pizza'),
('Burger Bonanza', 'burger'),
('Sushi World', 'sushi');
EOF

docker run -d -p 3000:3000 \
  --name restaurant-container \
  --network restaurant-network \
  -v $(pwd):/app \
  restaurant-app

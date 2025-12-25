CREATE TABLE  restaurants (
  id INT  PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  meal VARCHAR(255) NOT NULL
);

INSERT INTO restaurants (name, meal) VALUES
('Pizza Palace', 'pizza'),
('Burger Bonanza', 'burger'),
('Sushi World', 'sushi');

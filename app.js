const express = require("express");
const mysql = require("mysql2");
const app = express();

const db = mysql.createConnection({
  host: "mysql",
  user: "appuser",
  password: "app123",
  database: "restaurant_db"
});

app.get("/", (req, res) => {
  res.send(`
  <html>
  <head>
    <title>Restaurant App</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(to right, #ffe259, #ffa751);
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        background: #ffffffcc; /* white with transparency */
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 400px;
        width: 90%;
      }

      h1 {
        font-size: 28px;
        color: #ff5722;
        margin-bottom: 20px;
      }

      p {
        font-size: 16px;
        color: #555;
        margin-bottom: 30px;
      }

      input {
        padding: 12px;
        width: 80%;
        margin-bottom: 20px;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 14px;
      }

      button {
        padding: 12px 25px;
        background: #ff5722;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: 0.3s;
      }

      button:hover {
        background: #e64a19;
      }

      footer {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🍴 Restaurant Finder</h1>
      <p>Find the best restaurants based on your favorite meal!</p>
      <form action="/recommend">
        <input name="meal" placeholder="Enter your favorite meal" />
        <br/>
        <button type="submit">Get Recommendation</button>
      </form>
      <footer>🚀 Updated LIVE via Jenkins + Docker + ngrok</footer>
    </div>
  </body>
  </html>
  `);
});

app.get("/recommend", (req, res) => {
  const meal = req.query.meal;

  db.query(
    "SELECT name FROM restaurants WHERE meal = ?",
    [meal],
    (err, results) => {

      let message = "";
      let color = "";

      if (results.length > 0) {
        message = `🍽️ Recommended Restaurant: <strong>${results[0].name}</strong>`;
        color = "#28a745"; // أخضر
      } else {
        message = "❌ No restaurant found for this meal";
        color = "#dc3545"; // أحمر
      }

      res.send(`
      <html>
      <head>
        <title>Result</title>
        <style>
          body {
            font-family: Arial;
            background: #f4f6f8;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .result-card {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          .message {
            color: ${color};
            font-size: 20px;
            margin-bottom: 20px;
          }
          a {
            text-decoration: none;
            color: white;
            background: #007bff;
            padding: 10px 20px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="result-card">
          <div class="message">${message}</div>
          <a href="/">⬅ Back</a>
        </div>
      </body>
      </html>
      `);
    }
  );
});
app.listen(3000,'0.0.0.0', () => {
  console.log("Server running on port 3000");
});

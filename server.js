require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend working");
});

// ❌ REMOVE this (you don’t have delivery table)
// app.get("/delivery", (req, res) => {
//   db.query("SELECT * FROM delivery", (err, result) => {
//     if (err) {
//       res.status(500).send(err.message);
//     } else {
//       res.json(result);
//     }
//   });
// });

// ✅ MAIN API (THIS IS IMPORTANT)
app.get("/shipments", (req, res) => {
  const sql = `
    SELECT 
      c.FirstName,
      c.LastName,
      s.Shipment_id,
      s.Status,
      t.Location,
      t.Timestamp
    FROM customer c
    JOIN shipment s
      ON c.Customer_id = s.Customer_id
    JOIN trackingupdate t
      ON s.Shipment_id = t.Shipment_id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("❌ Query error:", err);
      res.status(500).send(err.message);
    } else {
      res.json(result);
    }
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
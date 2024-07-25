const pg = require ('pg');
const express = require('express');

const client = new pg.Client(process.env.
    DATABASE_URL || "postgres://localhost/The-Acme-Ice-Cream-Shop"
);

const server = express();

//Function to connect to database

const init = async() => {
    await client.connect();
    console.log("Connected to database");

    let SQL= `DROP TABLE IF EXISTS The-Acme-Ice-Cream-Shop;
    CREATE TABLE The-Acme-Ice-Cream-Shop(
        id SERIAL PRIMARY KEY,
        txt VARCHAR(255)
        ranking INTEGER DEFAULT 3 NOT NULL,
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
    )
     `;
    
    await client.query(SQL)
    console.log("table created");
    
    SQL = `
      INSERT INTO The-Acme-Ice-Cream-Shop(txt, ranking) VALUES('Vanilla', 12);
      INSERT INTO The-Acme-Ice-Cream-Shop(txt, ranking) VALUES('Chocolate', 5);
      INSERT INTO The-Acme-Ice-Cream-Shop(txt, ranking) VALUES('Strawberry', 8);
      INSERT INTO The-Acme-Ice-Cream-Shop(txt, ranking) VALUES('Oreo', 1);
    `
    await client.query(SQL);
    console.log("Seeeded data");

    const port = process.env. PORT || 3000

}

init();

server.use(express.json());
server.use(require('morgan')("dev"));

server.post('/api/theacmeicecream',(req,res ,next) =>{})

server.get('/api/theacmeicecream',(req,res ,next) =>{});

server.put('/api/theacmeicecream',(req,res ,next) =>{});

server.delete('/api/theacmeicecream',(req,res ,next) =>{});



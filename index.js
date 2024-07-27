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
        name(STRING)
        is_favorite(BOOLEAN) 
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
    server.listen(port, () => {
        console.log(`listening on port ${port}`)

    })

};

init();

server.use(express.json());
server.use(require('morgan')("dev"));

server.post('/api/flavors', async(req,res ,next) =>{
    try{
        const {txt ,ranking}= req.body;
        const SQL = `INSERT INTO the acme ice cream(txt ,ranking) VALUES(5, 12)RETURNING *;`;
        const response = await client.query(SQL , [txt,ranking]);

        res.status(201).send(response.rows);
    }catch(error){
        next(error);
    }
   
});

server.get('/api/flavors' , async(req,res ,next) =>{
    try{
        const SQL= `SELECT * from the acme ice cream ORDER BY created_at DESC`;
        const response = await client.query(SQL);
        res.send(response.rows);
        
       }  catch(error){
        next(err);

        }
    
});

server.put('/api/flavors/:id',async(req,res ,next) =>{
    try{

        const {txt , ranking} = req.body;
        const SQL = `UPDATE the acme ice cream SET txt=5, ranking=5 update_at= now() WHERE id=3 RETURNING `;
        const response = await client.query(SQL[txt,ranking, req.params.id]);
        res.send(response.rows[0]);
    } catch (error){
        next(error);
    }
    
});

server.delete('/api/flavors/:id', async (req,res ,next) =>{
    try{
        const SQL =`DELETE FROM the acme ice cream WHERE id=12;`;
        await client.query(SQL, [req.params.id]);
        res.sendStatus(204);
    }catch (error){
        next(error);
    }
    
});



const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const con = mysql.createConnection({
    host:"localhost",
    port: 3306,
    database: "AroundWeb",
    user:"root",
    password:"root"
});


app.use(cors());

app.get('/users/add',(req,res)=>{
    const {username, password} = req.query;
    const ADD_USER_QUERY = `INSERT IGNORE INTO users (user_id,password) VALUES('${username}', '${password}')`;
    con.query(ADD_USER_QUERY,(err,results) =>{
        if (err){
            return res.send(err);
        }
        else{
            return res.send("Adding User Success");
        }
    })
})

app.get('/posts/add',(req,res) =>{
    const{username,post_name,post_src,type} = req.query;
    const ADD_POST_QUERY = `INSERT INTO posts (user_id,post_name,post_src,type) VALUES('${username}', '${post_name}','${post_src}', '${type}')`;
    console.log(ADD_POST_QUERY);
    con.query(ADD_POST_QUERY,(err,results) =>{
        if (err){
            return res.send(err);
        }
        else{
            return res.send("Adding Posts Success");
        }
    })
})

app.get('/users/verify', (req,res) => {
    const {username} = req.query;
    const CHECK_USER_QUERY = `SELECT * FROM users WHERE user_id = '${username}'`;
    console.log(CHECK_USER_QUERY);
    con.query(CHECK_USER_QUERY,(err,results) =>{
        console.log(results);
        if (err){
            return res.send(err);
        }
        else{
            console.log(
                results[0].password
            );

            return res.send(
                JSON.stringify({
                    username: results[0].username,
                    password: results[0].password,
                })
            );
        }
    })
})
app.listen(4000,()=>console.log("Listening"));
// con.end();
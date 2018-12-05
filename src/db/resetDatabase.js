var mysql = require('mysql');
var con = mysql.createConnection({
    host:"localhost",
    port: 3306,
    database: "AroundWeb",
    user:"root",
    password:"root"
});

function createDataBase(con){
    con.connect(function(err){
        if (err) {throw err;}
        console.log("Connection Successful");
    });
    var statement = "DROP TABLE IF EXISTS users";
    execute(con,statement);
    statement = "DROP TABLE IF EXISTS posts";
    execute(con,statement);
    statement = "CREATE TABLE users ("
    + "user_id VARCHAR(255) NOT NULL,"
    + "first_name VARCHAR(255),"
    + "last_name VARCHAR(255),"
    + "PRIMARY KEY (user_id)"
    + ")";
    execute(con,statement);
    statement = "CREATE TABLE posts ("
			    + "user_id VARCHAR(255) NOT NULL,"
                + "post_id VARCHAR(255) NOT NULL,"
                + "post_url VARCHAR(255) NOT NULL,"
				+ "PRIMARY KEY (user_id),"
				+ "FOREIGN KEY (user_id) REFERENCES users(user_id)"
                + ")";
    execute(con,statement);
    con.end();
}

function execute(con,statement){
    con.query(statement,function(err,result){
        if (err) {throw err;}
    });
}
createDataBase(con);


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
    var statement = "DROP TABLE IF EXISTS posts";
    execute(con,statement);
    statement = "DROP TABLE IF EXISTS users";
    execute(con,statement);
    statement = "CREATE TABLE users ("
    + "user_id VARCHAR(255) NOT NULL,"
        +"password VARCHAR(255) NOT NULL,"
    + "PRIMARY KEY (user_id)"
    + ")";
    execute(con,statement);
    statement = "CREATE TABLE posts ("
			    + "user_id VARCHAR(255) NOT NULL,"
                + "post_name VARCHAR(255) NOT NULL,"
                + "post_src VARCHAR(255) NOT NULL,"
                + "type VARCHAR(255) NOT NULL,"
				+ "PRIMARY KEY (user_id)"
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


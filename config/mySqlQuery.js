/**
 * New file
 * To take care of obtaining DB connection from the connection pool and executing queries.
 * Also logs SQL exceptions, results and releases the DB connection to the pool. 
 */


function useDatabase()
{

     var query = 'USE sampledb'; 
    
   
    execQuery(query, function(err, results, fields){
        
        if(err)
        {
            console.log("Error at query " + query);
            console.log(err);
            
        }
        else
        {
            if(results[0] != undefined)
            {
                console.log("Success " + query);
                console.log("Results : " + results);
            }
        }
    });
    
}


function createTable1()
{
        var query1 = 'CREATE TABLE IF NOT EXISTS LoginDetails (Id int auto_increment , email varchar(25), password varchar(200), firstname varchar(20), lastname varchar(20), Primary Key(Id), LastLogIn datetime);';
  
    
     execQuery(query1, function(err, results, fields){
        
        if(err)
        {
            console.log("Error at query " + query1);
            console.log(err);
        }
        else
        {
            if(results[0] != undefined)
            {
                console.log("Success " + query1);
                console.log("Results : " + results);
            }
        }
    });
    
}


function createTable2()
{
        var query2 = 'CREATE TABLE IF NOT EXISTS CompanyLoginDetails (CompanyId int auto_increment , companyname varchar(25), email varchar(25), password varchar(200), Primary Key(CompanyId), LastLogIn datetime);';

      execQuery(query2, function(err, results, fields){
        
        if(err)
        {
            console.log("Error at query " + query2);
            console.log(err);
        }
        else
        {
            if(results[0] != undefined)
            {
                console.log("Success " + query2);
                console.log("Results : " + results);
            }
        }
    });
    
}


exports.useDatabase = useDatabase;
exports.createTable1 = createTable1;
exports.createTable2 = createTable2;




function execQuery (sql, params, callback) {
	
    var connPool = require('./mySqlConn').pool;
    
	connPool.getConnection(function (err, connection) {
		if (err) {
			console.log('MySql connection error: ' + err);
			callback(err, true);
			return;
		}
	            console.log('connected to mysql pool as id ' + connection.threadId);

        console.log("Query is >>>>>"+sql);
		
        var qResult = connection.query(sql, params, callback);
		
        
        qResult.on('error', function(err) {
			console.log('MySql query error: ' + err);
			callback(err, true);
		});
		
        qResult.on('result', function(rows) {
			console.log('Got result from DB');
			callback(false, rows);
		});
		
        qResult.on('end', function() {
			console.log('Going to release DB connection to the Pool');
			connection.release();
		});
	});
}

exports.execQuery=execQuery;
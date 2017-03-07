var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var dbConnectionInfo = {
  host: 'eu-cdbr-azure-west-d.cloudapp.net',
  user: 'bafd84cf71af84',
  password: '28091219',
  database:'acsm_f43adf2abb3e15d'
}


/* GET home page. */
router.get('/', function(req, res, next) {
  var dbConnection = mysql.createConnection(dbConnectionInfo);
  dbConnection.connect();

  dbConnection.on('error', function(err){
    if (err.code == 'PROTOCOL_SEQUENCE_TIMEOUT'){
      console.log('Got a DB PROTOCOL_SEQUENCE_TIMEOUT Error ... ignoring');
    }

    else{
      console.log('Got a DB Error: ', err);
    }
  });

  dbConnection.query('SELECT * FROM list', function(err, results, field){
    if (err){
      throw err;
    }

    var allItems = new Array();

    for (var x = 0; x < results.length; x++) {
      var list = {};
      list.id = results[x].id;
      list.text = results[x].text;
      list.date = new Date(results[i].date);

      allItems.push(list);
    }

    dbConnection.end();

    res.render('itemList', {lists: allItems});
  });
});

module.exports = router;

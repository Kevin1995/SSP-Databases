var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var dbConnectionInfo = {
  host: 'eu-cdbr-azure-west-d.cloudapp.net',
  user: 'bafd84cf71af84',
  password: '28091219',
  database:'acsm_f43adf2abb3e15d'
}

/* GET users listing. */
router.get('/createListItem', function(req, res, next) 
{
  res.render('user');
});

router.post('newListItem', function(req, res, next) 
{
  var dbConnection = mysql.createConnection(dbConnectionInfo);
  dbConnection.connect();

  dbConnection.on('error', function(err)
  {
    if (err.code == 'PROTOCOL_SEQUENCE_TIMEOUT') 
    {
      // Let's just ignore this
      console.log('Got a DB PROTOCOL_SEQUENCE_TIMEOUT Error ... ignoring ');
    } 
    
    else 
    {
      // I really should do something better here
      console.log('Got a DB Error: ', err);
    }
  });

  var list = {}
  list.date = new Date();
  list.text = req.body.theList;

  var mysqlDate = joke.date.toISOString().slice(0,19).replace('T', '');
  dbConnection.query('INSERT INTO list (text, data) VALUES(?,?)',[list.text, mysqlDate], function(err, results, fields){
    if (err)
    {
      throw err;
    }

    list.id = results.insertId;

    dbConnection.end();

    res.redirect('/');
  });
});


module.exports = router;

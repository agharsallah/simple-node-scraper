var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var _ = require('lodash')
app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
var record = []
//var json = { produit : "", responsable : ""};

for (var i = 19; i < 21; i++) {
  url = 'http://www.tunisieindustrie.nat.tn/fr/certifdbi.asp?action=result&ident='+ i ;

  request(url,function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;

      $('.one').filter(function(){
        var data = $(this);
        var mail        = data.children().eq(12).text().trim();
        var produit     = data.children().eq(5).text().trim();
        var responsable = data.children().eq(3).text().trim();
        var phone       = data.children().eq(10).text().trim();
        var gov         = data.children().eq(8).text().trim();
        
        record.push(mail.slice(6))
        record.push(phone.slice(21))
        record.push(gov.slice(11))
        record.push(produit.slice(8))
        record.push(responsable.slice(11))
        console.log(record);
        
        //console.log(mail.slice(6).replace(/ /g,''))
        //console.log(produit.slice(8).replace(/ /g,''))
        //json.produit        = produit.slice(14);
        //json.responsable    =responsable.slice(11);
        //json.mail           =mail.slice(6).replace(/ /g,'');
        //json.phone          =phone.slice(21).replace(/ /g,'');
        //json.gov            =gov.slice(11).replace(/ /g,'');
        //record.push(json)

      })

    }
/*
    fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')*/
 
  })// request

  } //for 

})




app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;

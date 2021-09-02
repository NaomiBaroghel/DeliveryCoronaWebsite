const express = require('express');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
var mongodbscript = require ("./model.js");
var jsonParser = bodyParser.json()
const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: false }));



app.post('/login', jsonParser, async function(req, res) {



console.log(req.body.email);
console.log(req.body.password);

var myuser  = await mongodbscript.data.login(req.body.email,req.body.password);


if(myuser!=null)
{
  console.log("OK");
  res.status(200).send({user:myuser});
}
else {
  console.log("NOT OK");
  res.status(404).send({"error":"Wrong email or password"});
}



});


app.post('/checkemail', jsonParser, async function(req, res) {

  console.log(req.body);
  var response = await mongodbscript.data.checkemail(req.body.email);
  res.status(200).send({exist:response});
});

app.post('/addemployee', jsonParser, async function(req, res) {

  console.log(req.body);
  var response = await mongodbscript.data.addemployee(req.body.first_name,req.body.last_name,req.body.birthday,req.body.phone,req.body.email,req.body.password);
  res.sendStatus(200);
});



app.get('/getemployee', jsonParser, async function(req, res) {
console.log("getemployee server");
  var listuser = await mongodbscript.data.getemployee();
  console.log(listuser);
  res.status(200).send({user_list:listuser});
});



//NEW NAOMI
app.post('/addblog', jsonParser, async function(req, res) {

  console.log(req.body);
  var response = await mongodbscript.data.addblog(req.body.title,req.body.content);
  res.sendStatus(200);
});

app.get('/getblog', jsonParser, async function(req, res) {
console.log("getblog server");
  var listblog = await mongodbscript.data.getblog();
  console.log(listblog);
  res.status(200).send({blog_list:listblog});
});

app.post('/deleteemployee', jsonParser, async function(req, res) {

  console.log(req.body);
  var response = await mongodbscript.data.deleteemployee(req.body.employee);
  res.sendStatus(200);
});

app.post('/checkemailupdate', jsonParser, async function(req, res) {

  console.log(req.body);
  var response = await mongodbscript.data.checkemailupdate(req.body);
  res.status(200).send({exist:response});
});

app.post('/updateemployee', jsonParser, async function(req, res) {

  console.log(req.body);
  var response = await mongodbscript.data.updateemployee(req.body);
  res.sendStatus(200);
});

app.post('/addAddress', jsonParser, async function(req, res) {
console.log("req bodyaddress"+req.body.Address);
var myaddress  = await mongodbscript.data.addaddress(req.body);
var mycity  = await mongodbscript.data.addcity(req.body.Address.split(',')[1]);

if(myaddress==true)
{
  console.log("OK");
  res.sendStatus(200);
}});

app.post('/getaddresses', jsonParser, async function(req, res) {
console.log("i am in the server for displayaddresses");
  var listaddresses = await mongodbscript.data.getaddresses();
  console.log("listeaddresses");
  console.log(listaddresses);
  res.status(200).send({address_list:listaddresses});
});

app.post('/adddeliverykmeans', jsonParser, async function(req, res) {

  for (let i = 0; i < req.body.listdelivery.length; i++)
  {
    console.log(req.body.listdelivery[i]);
    var mydelivery  = await mongodbscript.data.adddelivery(req.body.listdelivery[i].Address,req.body.listdelivery[i].user_id,req.body.listdelivery[i].statusfood,req.body.listdelivery[i].statusmedecine,req.body.listdelivery[i].statusmonthly,req.body.listdelivery[i].date_delivery);
  }


res.sendStatus(200);

});


app.get('/getdeliverylist', jsonParser, async function(req, res) {
console.log("getdeliverylist server");
  var listdelivery = await mongodbscript.data.getdeliverylist();
  console.log(listdelivery);
  res.status(200).send({list_delivery:listdelivery});
});

app.get('/getcity', jsonParser, async function(req, res) {
console.log("getcity server");
  var listcity = await mongodbscript.data.getcity();
  console.log(listcity);
  res.status(200).send({list_city:listcity});
});

app.post('/getnameuser', jsonParser, async function(req, res) {
console.log("getnameuser server");
  let nameuser = await mongodbscript.data.getnameuser(req.body.Email);
  console.log(nameuser);
  res.status(200).send({user_namegood:nameuser});
});

app.post('/sendmessage', jsonParser, async function(req, res) {
console.log("send message server");
  console.log(req.body);
  var response = await mongodbscript.data.sendmessage(req.body.User_name,req.body.message,req.body.isMenael);
  res.sendStatus(200);
});

app.post('/getmessage', jsonParser, async function(req, res) {
console.log("send message server");
  console.log(req.body);
  var messagearray = await mongodbscript.data.getmessage(req.body.user_name);
  res.status(200).send({messagelist:messagearray});
});

//KAREL
app.post('/getdeliverylistdeliver', jsonParser, async function(req, res) {
console.log("req bodyaddress")
console.log(req.body.Email);
console.log("i am in the server for deliverydeliverlist");
var listdeliverydeliver  = await mongodbscript.data.getdeliverylistdeliver(req.body.Email);
console.log("listdeliverydeliver");
console.log(listdeliverydeliver);
res.status(200).send({deliverydeliver_list:listdeliverydeliver});
});

app.post('/markascomplete', jsonParser, async function(req, res) {
console.log("server markascomplete");
console.log("l id de la delivery");

  console.log(req.body.delivery_id);
  var id=req.body.delivery_id;
  var response = await mongodbscript.data.markascomplete(id);
  /*if(response==true)
  {
       res.serverError('The date of the delivery is not passed')
  }*/
  res.sendStatus(200);
});

app.post('/notdone', jsonParser, async function(req, res) {
console.log("req bodyaddress")
console.log(req.body.Email);
console.log("i am in the server for deliverydeliverlist");
var listdeliverydelivernotdone  = await mongodbscript.data.notdonedeliveries(req.body.Email);
console.log("listdeliverydelivernotdone");
console.log(listdeliverydelivernotdone);
res.status(200).send({deliverydelivernotdone_list:listdeliverydelivernotdone});
});


app.post('/donedeliveries', jsonParser, async function(req, res) {
console.log("req bodyaddress")
console.log(req.body.Email);
console.log("i am in the server for deliverydeliverlist");
var listdeliverydeliverdone  = await mongodbscript.data.donedeliveries(req.body.Email);
console.log("listdeliverydeliverdone server");
console.log(listdeliverydeliverdone);
res.status(200).send({deliverydeliverdone_list:listdeliverydeliverdone});
});


app.post('/adddelivery', jsonParser, async function(req, res) {
console.log("req bodyadddeliveryaddress");
console.log(req.body.Addresslist);
console.log("req bodyadddeliverydeliver");
console.log(req.body.user_id);
console.log("req bodyadddeliverystatusfood");
console.log(req.body.statusfood);
console.log("req bodyadddeliverystatusmedicine");
console.log(req.body.statusmedicine);

console.log("req bodyadddeliverystatusmonthly");
console.log(req.body.statusmonthly);
console.log("req bodyadddeliverydate");
console.log(req.body.Date);
var mydelivery  = await mongodbscript.data.adddelivery(req.body.Addresslist,req.body.user_id,req.body.statusfood,req.body.statusmedicine,req.body.statusmonthly,req.body.Date);
if(mydelivery==true)
{
  console.log("OK");
  res.sendStatus(200);
}
});

app.post('/donedeliveriesemployer', jsonParser, async function(req, res) {

console.log("i am in the server for deliverydeliverlistemployer");
var listdeliverydeliveremployerdone  = await mongodbscript.data.donedeliveriesemployer();
console.log("listdeliverydeliveremployerdone");
console.log(listdeliverydeliveremployerdone);
res.status(200).send({deliverydeliveremployerdone_list:listdeliverydeliveremployerdone});
});




app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

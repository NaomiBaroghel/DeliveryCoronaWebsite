var MongoClient = require('mongodb').MongoClient;

/*var url = "mongodb+srv://dickcasablanca:casablanca2647@cluster0.qftia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";*/
var url = "mongodb://dickcasablanca:casablanca2647@cluster0-shard-00-00.qftia.mongodb.net:27017,cluster0-shard-00-01.qftia.mongodb.net:27017,cluster0-shard-00-02.qftia.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-100lk8-shard-0&authSource=admin&retryWrites=true&w=majority"





var methods={};


methods.login= async function (myemail,mypassword)
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query = { $and:[ {email:myemail}, {password:mypassword} ]};
  var user = await dbo.collection("users").findOne(query);

  client.close();
  return user;
}

methods.checkemail= async function (myemail)
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query =  {email:myemail} ;
  var user = await dbo.collection("users").findOne(query);

  client.close();
  if(user!=null)
  {
    return true;
  }
  else {
    return false;
  }
}

methods.addemployee = async function (myfirstname,mylastname,mybirthday,myphone,myemail,mypassword)
{
  var counter_user = await counteruser();
console.log(counter_user);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  console.log("connected");
let newuser = {"user_id":counter_user ,"first_name":myfirstname,"last_name":mylastname,"birthday":mybirthday,"phone":myphone,"email":myemail,"password":mypassword, "isMenael":0};
var result = await dbo.collection("users").insertOne(newuser,function(err, res) {
   if (err) throw err;
 });

console.log("inserted");
// client.close();
 console.log("closed");
  result = await updatecounteruser();
result = await addconversation(counter_user);
 return true;
}


async function counteruser()
{
  var query = { "name":"countersdb" };
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_user = counters.user_counter;
   client.close();
  return counter_user;
}

async function updatecounteruser()
{
  console.log("in update");
  var query = { "name":"countersdb" };

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_user = counters.user_counter;
  counter_user=counter_user+1;

  let result = await dbo.collection("counters").updateOne( { "name" : "countersdb"},
  {$set: { user_counter: counter_user}}, function(err, res) {
     if (err) throw err;
   });

//  client.close();
  return true;

}

async function addconversation (user_id)
{
  var counter_message = await countermessage();
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  console.log("connected");
let newconversation = {"id_conversation":counter_message ,"id_user":user_id,"message":[]};
var result = await dbo.collection("messages").insertOne(newconversation,function(err, res) {
   if (err) throw err;
 });

console.log("inserted");
// client.close();
 console.log("closed");
  result = await updatecountermessage();
 return true;
}

async function countermessage()
{
  var query = { "name":"countersdb" };
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_message = counters.message_counter;
   client.close();
  return counter_message;
}

async function updatecountermessage()
{
  console.log("in update");
  var query = { "name":"countersdb" };

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_message = counters.message_counter;
  counter_message=counter_message+1;

  let result = await dbo.collection("counters").updateOne( { "name" : "countersdb"},
  {$set: { message_counter: counter_message}}, function(err, res) {
     if (err) throw err;
   });

//  client.close();
  return true;

}

methods.getemployee= async function ()
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query = {"isMenael":0};
  var listuser = await dbo.collection("users").find(query).toArray();

//  client.close();
  return listuser;
}

//NEW NAOMI
methods.addblog = async function (mytitle,mycontent)
{
  var counter_blog = await counterblog();
console.log(counter_blog);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  console.log("connected");

  let date = new Date();
  console.log(date);
  var datearray = date.toString().split(' ');
  console.log();
var today = datearray[0] +" " + datearray[1] + " " + datearray[2] + " " + datearray[3]+ " at ";


// current hours
let hours = date.getHours();

// current minutes
let minutes = date.getMinutes();

today += hours + ":" +minutes;


let newblog = {"blog_id":counter_blog ,"date":today,"title":mytitle,"content":mycontent};
console.log(newblog);
var result = await dbo.collection("blogs").insertOne(newblog,function(err, res) {
   if (err) throw err;
 });

console.log("inserted");
// client.close();
 console.log("closed");
  result = await updatecounterblog();

 return true;
}


async function counterblog()
{
  var query = { "name":"countersdb" };
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_blog = counters.blog_counter;
   client.close();
  return counter_blog;
}

async function updatecounterblog()
{
  var query = { "name":"countersdb" };

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_blog = counters.blog_counter;
  counter_blog=counter_blog+1;

  let result = await dbo.collection("counters").updateOne( { "name" : "countersdb"},
  {$set: { blog_counter: counter_blog}}, function(err, res) {
     if (err) throw err;
   });

//  client.close();
  return true;

}




methods.getblog= async function ()
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var listblog = await dbo.collection("blogs").find({}).toArray();
console.log(listblog);
//  client.close();
  return listblog;
}


methods.deleteemployee= async function (myemployee)
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query = {"user_id": parseInt(myemployee.user_id, 10)}
  var result = await dbo.collection("users").deleteOne(query);
//  client.close();
  return true;
}


methods.checkemailupdate= async function (myuser)
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query =  {email:myuser.email} ;
  var user = await dbo.collection("users").findOne(query);

  client.close();
  if(user!=null && user.user_id!=myuser.user_id)
  {
    return true;
  }
  else {
    return false;
  }
}

methods.updateemployee= async function (myuser)
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query = {"user_id" :  myuser.user_id} ;
         let result = await dbo.collection("users").replaceOne( query,myuser);

  client.close();
  return true;
}


methods.addaddress= async function (myaddress)
{
  var counter_address = await counteraddress();
console.log(counter_address);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  console.log(" i am connected");
  let newaddress = {"addressID":counter_address,"address":myaddress.Address,"lat":myaddress.lat,"lon":myaddress.lon};
  console.log(newaddress);
  var result = await dbo.collection("addresses").insertOne(newaddress,function(err, res) {
     if (err) throw err;
   });

   console.log("inserted");
   // client.close();
    console.log("closed");
     result = await updatecounteraddress();

    return true;
   }
async function counteraddress()
{
  var query = { "name":"countersdb" };
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_address = counters.address_counter;

  return counter_address;
}

async function updatecounteraddress()
{
  console.log("in update");
  var query = { "name":"countersdb" };

  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

  var dbo = client.db("DeliveryDB");
  let counters =  await dbo.collection("counters").findOne(query);
  let counter_address = counters.address_counter;
  counter_address=counter_address+1;

  let result = await dbo.collection("counters").updateOne( { "name" : "countersdb"},
  {$set: { address_counter: counter_address}}, function(err, res) {
     if (err) throw err;
   });

  return true;

}

methods.getaddresses= async function ()
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var listaddresses = await dbo.collection("addresses").find().toArray();

//  client.close();
  return listaddresses;
}


methods.addcity= async function (mycity)
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  query={name:"city"}
  var city = await dbo.collection("utils").findOne(query);
  var city_list = city.city_array;
  var exist = false;
  console.log(city_list);
  for (let i = 0; i < city_list.length; i++)
  {

console.log("fordecity");
    console.log(mycity.toLowerCase().includes(city_list[i].toLowerCase()));
    console.log(city_list[i].toLowerCase());
    console.log(mycity.toLowerCase());
    if(mycity.toLowerCase().includes(city_list[i].toLowerCase()))
    {

      exist=true;
    }


  }

  if(exist==false)
  {
    console.log("intoexist");
    console.log(exist);
    city_list.push(mycity)
    let result = await dbo.collection("utils").updateOne( query,
    {$set: { city_array: city_list}}, function(err, res) {
       if (err) throw err;
     });

        console.log("insertedcity");

  }


  // client.close();
   console.log("closed");

    return true;
   }




   async function counterdelivery()
   {
     var query = { "name":"countersdb" };
     const client = await MongoClient.connect(url, { useNewUrlParser: true })
         .catch(err => { console.log(err); });

     var dbo = client.db("DeliveryDB");
     let counters =  await dbo.collection("counters").findOne(query);
     let counter_delivery = counters.delivery_counter;

     return counter_delivery;
   }


   async function updatecounterdelivery()
   {
     console.log("in update counter_delivery");
     var query = { "name":"countersdb" };

     const client = await MongoClient.connect(url, { useNewUrlParser: true })
         .catch(err => { console.log(err); });

     var dbo = client.db("DeliveryDB");
     let counters =  await dbo.collection("counters").findOne(query);
     let counter_delivery = counters.delivery_counter;
     counter_delivery=counter_delivery+1;

     let result = await dbo.collection("counters").updateOne( { "name" : "countersdb"},
     {$set: { delivery_counter: counter_delivery}}, function(err, res) {
        if (err) throw err;
      });


     return true;

   }

   methods.getdeliverylist= async function ()
   {
     const client = await MongoClient.connect(url, { useNewUrlParser: true })
           .catch(err => { console.log(err);  });

     var dbo = client.db("DeliveryDB");

     var listdelivery = await dbo.collection("delivery").find().toArray();

   //  client.close();
     return listdelivery;
   }

   methods.getcity= async function ()
   {
     const client = await MongoClient.connect(url, { useNewUrlParser: true })
           .catch(err => { console.log(err);  });

     var dbo = client.db("DeliveryDB");

     var ciytobj = await dbo.collection("utils").findOne({"name":"city"});

     var listcity = ciytobj.city_array;
   //  client.close();
     return listcity;
   }


   methods.getnameuser= async function (myemail)
   { console.log("rentrée dans model getnameuser");
     const client = await MongoClient.connect(url, { useNewUrlParser: true })
           .catch(err => { console.log(err);  });

     var dbo = client.db("DeliveryDB");
     var query = {"email":myemail};
     var user = await dbo.collection("users").findOne(query);
     console.log("user");
     console.log(user);
     console.log(user.first_name);
     console.log(user.last_name);
     console.log(user.user_id);
   var nameuser=user.first_name+" "+user.last_name+" "+" "+"Id"+":"+user.user_id
   console.log("nameuser");
   console.log(nameuser);
   //  client.close();
     return nameuser;
   }



   methods.sendmessage = async function (myusername,mymessage,mymenael)
   {

     const client = await MongoClient.connect(url, { useNewUrlParser: true })
           .catch(err => { console.log(err);  });

     var dbo = client.db("DeliveryDB");
     console.log("connected");
     query={"id_user":parseInt(myusername.split(":")[1],10)}
     var myconversasion = await dbo.collection("messages").findOne(query);
     var messagearray = myconversasion.message;
     messagearray.push({isMenael:mymenael,content:mymessage});
console.log("messagearray");
console.log(messagearray);
     let result = await dbo.collection("messages").updateOne( query,
     {$set: { message: messagearray}}, function(err, res) {
        if (err) throw err;
      });


   console.log("updated");
   // client.close();
    console.log("closed");

    return true;
   }


      methods.getmessage = async function (myusername)
      {

        const client = await MongoClient.connect(url, { useNewUrlParser: true })
              .catch(err => { console.log(err);  });

        var dbo = client.db("DeliveryDB");
        console.log("connected");
        query={"id_user":parseInt(myusername.split(":")[1],10)}
        var myconversasion = await dbo.collection("messages").findOne(query);


      // client.close();
       console.log("closed");

       return myconversasion.message;
      }


//KAREL

methods.getdeliverylistdeliver= async function (myemail)
{console.log(myemail);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query =  {email:myemail} ;

  var user = await dbo.collection("users").findOne(query);
console.log(user);
var id= user.user_id;
console.log("id");
console.log(id);
  var dbo = client.db("DeliveryDB");

    var query1 =  {id_deliver:user.user_id} ;
  var listdelivery = await dbo.collection("delivery").find(query1).toArray();
console.log(listdelivery);
//  client.close();
  return listdelivery;
}

methods.markascomplete= async function (mydeliveryid)
{
  console.log("rentrée");
  console.log("id de delivery model");
  console.log(mydeliveryid);

  console.log("currentdate");
  var currentdate=new Date().toLocaleString();
  console.log(currentdate);
  var currentdategood=currentdate.split(" ");
  currentdategood=currentdategood[0];
  console.log(currentdategood);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

          var dbo = client.db("DeliveryDB");


          var query = {"delivery_id":mydeliveryid};

           result = await dbo.collection("delivery").updateOne( { "delivery_id" : mydeliveryid},
            { $set: { done: 1} });


console.log("je passe");

  //client.close();
  return true;

}


methods.notdonedeliveries= async function (myemail)
{ console.log(myemail);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query =  {email:myemail} ;

  var user = await dbo.collection("users").findOne(query);
console.log(user);
var id= user.user_id;
console.log("id");
console.log(id);
  var dbo = client.db("DeliveryDB");

    var query1 =  {id_deliver:user.user_id} ;
  var listdelivery = await dbo.collection("delivery").find(query1).toArray();
console.log(listdelivery);
  var dbo = client.db("DeliveryDB");

    var query2 =  { $and: [ { done: { $exists: false } }, { id_deliver:user.user_id } ] }
    var listdeliverynotdone = await dbo.collection("delivery").find(query2).toArray();
    console.log("currentdate");
    var currentdate=new Date().toLocaleString();
    console.log(currentdate);
    var currentdategood=currentdate.split(" ");
    currentdategood=currentdategood[0];
    console.log(currentdategood);
    var currentdategood2=currentdategood.split("-")
      var day2=currentdategood2[1];
      var month2=currentdategood2[2];
        console.log("day2");
        console.log(day2);
        console.log("month2");
        console.log(month2);
  console.log(listdeliverynotdone);

  var listdeliverynotdonegood=[];
  for(let i=0;i<listdeliverynotdone.length;i++)
  {
   let datedelivery= new Date(listdeliverynotdone[i].date_delivery);
   console.log(datedelivery);
   datedelivery=datedelivery.toLocaleString();
    if(datedelivery<currentdategood && listdeliverynotdone[i].monthly=="NO")
    {
      console.log("listdeliverynotdone[i]");
      console.log(listdeliverynotdone[i]);
      listdeliverynotdonegood.push(listdeliverynotdone[i]);

    }

  }
  for(let i=0;i<listdeliverynotdone.length;i++)
  {

    if( listdeliverynotdone[i].monthly=="YES")
    {  let datedelivery= new Date(listdeliverynotdone[i].date_delivery);
  console.log(datedelivery);
  datedelivery=datedelivery.toLocaleString();
  var datedeliveryyearafter=datedelivery.split("-")
    var day=datedeliveryyearafter[1];
    var month=datedeliveryyearafter[2];
      console.log("day");
      console.log(day);
      console.log("month");
      console.log(month);
      if(day==day2 && month==month2)
      {
        console.log("listdeliverynotdone[i]");
        console.log(listdeliverynotdone[i]);
        listdeliverynotdonegood.push(listdeliverynotdone[i]);
      }

  }
}

//  client.close();
console.log("listdeliverynotdonegood");
console.log(listdeliverynotdonegood);
  return listdeliverynotdonegood;
}
methods.donedeliveries= async function (myemail)
{console.log(myemail);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
  var query =  {email:myemail} ;

  var user = await dbo.collection("users").findOne(query);
console.log(user);
var id= user.user_id;
console.log("id");
console.log(id);
  var dbo = client.db("DeliveryDB");

    var query1 =  {id_deliver:user.user_id} ;
  var listdelivery = await dbo.collection("delivery").find(query1).toArray();
console.log(listdelivery);
  var dbo = client.db("DeliveryDB");
    var query2 =  {done:1,id_deliver:user.user_id} ;
    var listdeliverydone = await dbo.collection("delivery").find(query2).toArray();
  console.log(listdeliverydone);
//  client.close();
  return listdeliverydone;
}



methods.donedeliveriesemployer= async function ()
{
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err);  });

  var dbo = client.db("DeliveryDB");
var query1 =  { $and: [ { complete: { $exists: false } }, { done:1 } ] }

  var listdeliverydeliveremployerdone = await dbo.collection("delivery").find(query1).toArray();
console.log(listdeliverydeliveremployerdone);
//  client.close();
  return listdeliverydeliveremployerdone;
}

methods.adddelivery =async function (myaddresses,myid,myfood,mymedicine,mymonthly,mydate)
{ console.log("mydate");
  console.log(mydate);
  console.log("myaddresses");
  console.log(myaddresses);
  var mydategood=mydate;
  var foody="NO";
  var mediciny="NO";
  var monthly="NO"
  var delivery_counter = await counterdelivery();
  console.log(delivery_counter);
console.log("myfood");
console.log(myfood);
console.log("mymedocs");
console.log(mymedicine);
console.log("mymonthly");
console.log(mymonthly);
console.log("mydate");
console.log(mydate);
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
      .catch(err => { console.log(err); });

      var dbo = client.db("DeliveryDB");
      var query =  {user_id:myid} ;

      var user = await dbo.collection("users").findOne(query);
      console.log("user");
      console.log(user);
      var username=user.first_name+user.last_name;

  var dbo = client.db("DeliveryDB");
    console.log("connected");
    if(myfood==true)
    {
      foody="YES";
    }
    if(mymedicine==true)
    {
      console.log("medicine trueeeeeeeee");
      mediciny="YES";
    }
    else {
      console.log('medecine falseeeeee');
    }
    if(mymonthly==true)
    {
      monthly="YES"
    }

    let newdelivery = {"delivery_id":delivery_counter ,"address":myaddresses,"id_deliver":myid,"name_deliver":username,"food":foody,"medicines":mediciny,"monthly":monthly,"date_delivery":mydate};
  var result = await dbo.collection("delivery").insertOne(newdelivery,function(err, res) {
     if (err) throw err;

   });
   console.log("inserted");
    result = await updatecounterdelivery();



   return true;
}

exports.data = methods;

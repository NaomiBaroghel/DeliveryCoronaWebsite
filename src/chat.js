import React, { Component } from 'react';
import { render } from 'react-dom';
import './chat.css';
//import 'bootstrap/dist/css/bootstrap.css';
import { FiSend } from 'react-icons/fi';
import socketIOClient from "socket.io-client";

class Chat extends Component {
  constructor({match}) {
    super();
    this.userName = match.params;
    this.state = {
      endpoint: "localhost:3000",
      message:'',
      name:'',
      nameshort:'',
      user_name:'',
      isMenael:0,
      allMessages:[],
      userlist:[]
        };



    this.updateMessage = this.updateMessage.bind(this);

  }

  async componentDidMount () {
	  // document.body.classList.toggle('chat');
    var id = this.findidsession();
    const data = { Email:id}
    console.log("data");
    console.log(data);

   await fetch('/getnameuser', { method: 'POST',
   headers:{ 'Content-Type': 'application/json' },
   body: JSON.stringify(data) // data can be `string` or {object}!

 }).then(res => res.json())
   .then(result => {
   console.log("the user name");
   console.log(result.user_namegood);
   this.setState({
   isLoaded: true,
   user_name: result.user_namegood,
   })

   console.log("user name");
   console.log(this.state.user_name);
   })

   .catch(error => console.error('Error:', error));

    var isMenael = this.findisMenael();
if(isMenael==1)
{
  document.getElementById("thecontacts").style.display="block";
  this.setState({isMenael:1});

  await fetch('/getemployee', { method: 'GET',
  headers:{ 'Content-Type': 'application/json' },

   }).then(res => res.json())
   .then(result => {
     console.log(result.user_list);
   this.setState({
     userlist: result.user_list
   })
  })
  .catch(error => console.error('Error:', error));
}
else {
  this.setState({isMenael:0,nameshort:"M",name:"Manager"});

  const data={user_name:this.state.user_name}
  await fetch('/getmessage', { method: 'POST',
  headers:{ 'Content-Type': 'application/json' },
  body: JSON.stringify(data) // data can be `string` or {object}!

}).then(res => res.json())
  .then(result => {
    var mymessage= result.messagelist
    for(var i=0;i<mymessage.length;i++)
    {
      if(mymessage[i].isMenael==1)
      {
        mymessage[i].type="recieve"
    }
    else {
      mymessage[i].type="send"

    }
    }
  this.setState({
  isLoaded: true,
  allMessages: mymessage
  })

  console.log("allMessages");
  console.log(this.state.allMessages);
  })

  .catch(error => console.error('Error:', error));
}
      const socket = socketIOClient(this.state.endpoint);

      socket.on('message', (message) => {
		  if(message.name !== this.state.name)
		  {
			 let arr = this.state.allMessages;
			  arr.push(message);
			  this.setState({allMessages: arr});
		  }
      })




  }


  componentWillUnmount() {
    document.body.classList.remove('chat')
  }


   updateMessage(e) {
      this.setState({message: e.target.value});
   }

   async contactClick(e)
   {
  /*   var activecontact = document.getElementsByClassName("contactsinfoactive");
     console.log('activecontact');
     console.log(activecontact);
     if(activecontact!=null&&activecontact!="undefined")
     {
     activecontact.classList.remove("contactsinfoactive");
   }*/
   console.log("contactclick !");
console.log(e.target.innerHTML.split("Id")[0]);
console.log(e.target.innerHTML);
var namedisplayshort=this.getShortName(e.target.innerHTML.split("Id")[0]);
this.setState(
  {
    user_name:e.target.innerHTML,
    nameshort:namedisplayshort,
    name: e.target.innerHTML.split("Id")[0]

  }
)
console.log("onclickcontact");
      // e.target.classList.add("contactsinfoactive");


       const data={user_name:e.target.innerHTML}
       await fetch('/getmessage', { method: 'POST',
       headers:{ 'Content-Type': 'application/json' },
       body: JSON.stringify(data) // data can be `string` or {object}!

     }).then(res => res.json())
       .then(result => {
console.log("jai fini le fetch");
         var mymessage= result.messagelist
         if(mymessage.length>0)
         {
         for(var i=0;i<mymessage.length;i++)
         {
           if(mymessage[i].isMenael==1)
           {
             mymessage[i].type="send"
         }
         else {
           mymessage[i].type="recieve"

         }
         }
       this.setState({
       isLoaded: true,
       allMessages: mymessage
       })

       console.log("allMessages");
       console.log(this.state.allMessages);
     }
     else {
       this.setState({
       isLoaded: true,
       allMessages: []
       })
     }
       })

       .catch(error => console.error('Error:', error));

return;
   }

   async send  ()
  {
    let newMessage={
    type:'send',
    content:this.state.message,
    name:this.state.user_name,
    time: this.getTime()
   }
   let arr = this.state.allMessages;
   console.log("arr");
   console.log(arr);
   arr.push(newMessage);
   this.setState({allMessages: arr});
   console.log("all messages after send");
   console.log(this.state.allMessages);
   this.setState({message: ''});
   console.log("message after send");
   console.log(this.state.message);

    let sendMessage = {...newMessage};
    sendMessage.type = "recieve";
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('message', sendMessage)


    const data = { message:this.state.message,User_name:this.state.user_name,isMenael:this.state.isMenael};
    console.log("data");
    console.log(data);

    await fetch('/sendmessage', { method: 'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify(data) // data can be `string` or {object}!

   })
    .then(result => {
      console.log(result);
    })

    .catch(error => console.error('Error:', error));



  }

    findisMenael()
   {


   var allcookies = document.cookie.split(';');

   let isMenael=0;
   for (let i =0; i< allcookies.length; i++)
   {

   let cookiename = allcookies[i].split('=')[0];
   //alert(cookiename)
   let cookievalue = allcookies[i].split('=')[1];
   //alert(cookievalue)
   if(cookiename.includes("isMenael"))
   {

   isMenael = cookievalue;

   console.log(isMenael);

     }
   }

   return isMenael;
   }

    findidsession()
   {


   var allcookies = document.cookie.split(';');

   let id="";
   for (let i =0; i< allcookies.length; i++)
   {

   let cookiename = allcookies[i].split('=')[0];
   //alert(cookiename)
   let cookievalue = allcookies[i].split('=')[1];
   //alert(cookievalue)
   if(cookiename.includes("sessionDelivery"))
   {



   id = cookievalue;

   console.log(id);


   }


   }

   return id;
   }

   liClick(e)
   {
     var els =document.getElementsByClassName("contactsinfoactive");
     Array.prototype.forEach.call(els, function(el) {

       el.classList.remove("contactsinfoactive")
});
     e.target.classList.add("contactsinfoactive");

   }

  render() {

    let usercontact1 = this.state.userlist.map((user) =>

    <li onClick={this.liClick.bind(this)} class="contactsinfo">
          <strong onClick={this.contactClick.bind(this)} >{user.first_name +" " +user.last_name + " Id: "+user.user_id }</strong>
    </li>);

    const socket = socketIOClient(this.state.endpoint);
    return (
    <div className="background">
			<div className="wrapchat fadeInDown">

<div style={{display:"flex"}}>
<div id="thecontacts" style={{display:"none"}} class='contacts_card'>

<div class="card">
<div class="card-header">
<strong style={{color:"white"}}>Contacts</strong>
</div>
<div class="card-body contacts_body">

<ui class="contacts">
{usercontact1}


 </ui>
 </div>
 <div style={{height:"65px"}}class="card-footer"></div>
</div>
</div>

      <div column class="chat">
					<div className="card">
						<div className="card-header msg_head">
							<div className="d-flex bd-highlight" style={{display:"flex"}}>
								<div className="img_cont" >
									<div className="roundCorner user_img userNameCard">{this.state.nameshort}</div>
									<span className="online_icon"></span>
								</div>
								<div className="user_info">
									<span>Chat with {this.state.name}</span>
									<p>{this.state.allMessages.length} Messages</p>

								</div>

							</div>

						</div>
						<div className=" msg_card_body">

            {this.renederMessages()}

						</div>
						<div style={{height:"100px"}} className="card-footer">
							<div style={{display:"inline",marginTop:"2px",marginLeft:"15%"}}>

								<textarea name=""  className="  type_msg " placeholder="Type your message..."  value = {this.state.message}
               onChange = {this.updateMessage}/>

									<p onClick={this.send.bind(this)} className=" costumSendBtn"> <FiSend/></p>
							</div>
              </div>
              </div>

						</div>
					</div>

				</div>
			</div>
    );


  }


  getTime(){
    let date = new Date();
    return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }

  getShortName(name){
    if(name!=null)
    {
    let short = '';
    let arr = name.split(" ")
    arr.forEach(function(name) {
      short+=name.charAt(0);
    });
    return short.toUpperCase();
  }

  }

  renederMessages(){
    return this.state.allMessages.map(message=>this.getMessage(message));
  }

  getMessage(message){
    if(message.type == 'send'){

      return <div key={message.time} style={{justifyContent: "end"}} className="d-flex mb-4">

								<div className=" msg_cotainer_send">
                <strong style={{fontSize:"20px"}}>You</strong><br/>
									{message.content}
									<span className="msg_time_send">{message.time}</span>
								</div>

							</div>;
    }

    if(message.type == 'recieve'){

      return <div key={message.time}  className="d-flex  mb-4">

								<div className=" msg_cotainer">
                <strong style={{fontSize:"20px"}}>{this.state.name}</strong><br/>
									{message.content}
								<span className="msg_time">{message.time}</span>
								</div>
							</div>;
    }




  }
}

export default Chat;

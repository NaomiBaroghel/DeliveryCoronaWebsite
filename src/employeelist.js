
import React, {Component} from 'react';
import {BsTrashFill} from 'react-icons/bs';
import {FaPencilAlt} from 'react-icons/fa';
import {FaCheck} from 'react-icons/fa';
import {GiCancel}  from 'react-icons/gi';

class EmployeeList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userlist: [],
        isLoaded: false,
      };


    }
    async  deletefunc(myemployee)
    {

    if(window.confirm("Are you sure you want to delete this employee ?"))
      {



        var data = {employee:myemployee}
      await fetch('/deleteemployee', { method: 'POST',
      headers:{ 'Content-Type': 'application/json' },
      body: JSON.stringify(data)

       })
       .then(result => {
         alert("Employee deleted")
         document.location.href="/employeelist";

      })
      .catch(error => console.error('Error:', error));

    }
    }

      showupdatefunc(myemployee)
    {
      var id = myemployee.user_id.toString();
      document.getElementById(id+"first_name").style.display="none";
    document.getElementById(id+"first_name_input").style.display="inline";
    document.getElementById(id+"first_name_input").childNodes[1].value=myemployee.first_name;

    document.getElementById(id+"last_name").style.display="none";
  document.getElementById(id+"last_name_input").style.display="inline";
  document.getElementById(id+"last_name_input").childNodes[1].value=myemployee.last_name;



  document.getElementById(id+"email").style.display="none";
document.getElementById(id+"email_input").style.display="inline";
document.getElementById(id+"email_input").childNodes[1].value=myemployee.email;



document.getElementById(id+"password").style.display="none";
document.getElementById(id+"password_input").style.display="inline";
document.getElementById(id+"password_input").childNodes[1].value=myemployee.password;


document.getElementById(id+"phone").style.display="none";
document.getElementById(id+"phone_input").style.display="inline";
document.getElementById(id+"phone_input").childNodes[1].value=myemployee.phone;


document.getElementById(id+"birthday").style.display="none";
document.getElementById(id+"birthday_input").style.display="inline";
document.getElementById(id+"birthday_input").childNodes[1].value=myemployee.birthday;




  document.getElementById(id+"update").style.display="none";
  document.getElementById(id+"ok").style.display="inline";

  document.getElementById(id+"delete").style.display="none";
  document.getElementById(id+"cancel").style.display="inline";




    }

noshowupdatefunc(myemployee)
{
var id = myemployee.user_id.toString();
document.getElementById(id+"first_name").style.display="inline";
document.getElementById(id+"first_name_input").style.display="none";

document.getElementById(id+"last_name").style.display="inline";
document.getElementById(id+"last_name_input").style.display="none";

document.getElementById(id+"email").style.display="inline";
document.getElementById(id+"email_input").style.display="none";


document.getElementById(id+"password").style.display="inline";
document.getElementById(id+"password_input").style.display="none";

document.getElementById(id+"phone").style.display="inline";
document.getElementById(id+"phone_input").style.display="none";

document.getElementById(id+"birthday").style.display="inline";
document.getElementById(id+"birthday_input").style.display="none";



document.getElementById(id+"update").style.display="inline";
document.getElementById(id+"ok").style.display="none";

document.getElementById(id+"delete").style.display="inline";
document.getElementById(id+"cancel").style.display="none";




}

async updatefunc(myemployee)
{
var id = myemployee.user_id.toString();
var myfirst_name=document.getElementById(id+"first_name_input").childNodes[1].value;
var mylast_name= document.getElementById(id+"last_name_input").childNodes[1].value;
var myemail= document.getElementById(id+"email_input").childNodes[1].value;
var mypassword= document.getElementById(id+"password_input").childNodes[1].value;
var myphone = document.getElementById(id+"phone_input").childNodes[1].value;
var mybirthday=document.getElementById(id+"birthday_input").childNodes[1].value;

if(myfirst_name!=null&&myfirst_name!="")
{
  if(mylast_name!=null&&mylast_name!="")
  {

    if(myemail!=null&&myemail!="")
    {

      if(mypassword!=null&&mypassword!="")
      {
        if(myphone!=null&&myphone!="")
        {

          if(mybirthday!=null&&mybirthday!="")
          {

            const data_email = {user_id:parseInt(id,10),email:myemail};
            const data = { user_id:parseInt(id,10),first_name:myfirst_name, last_name:mylast_name, birthday:mybirthday, phone:myphone, email:myemail , password:mypassword,isMenael:0 }
            console.log(data);

            await fetch('/checkemailupdate', { method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(data_email) // data can be `string` or {object}!

          }).then(res => res.json())
          .then(async function(res) {
            console.log(res);
            if(!res.exist)
            {
               await fetch('/updateemployee', { method: 'POST',
               headers:{ 'Content-Type': 'application/json' },
               body: JSON.stringify(data) // data can be `string` or {object}!

                })
                .then(function() {
                  document.location.href="/employeelist";


                })

               .catch(error => console.error('Error:', error));

             }

             else {
               alert("This email already exist");
             }
           })

            .catch(error => console.error('Error:', error));




          }
          else {
            alert("Please enter the Birthday");
          }
        }
        else {
          alert("Please enter the Phone Number");
        }

      }
      else {
        alert("Please enter the Password");
      }
    }
    else {
      alert("Please enter the Email");
    }
  }
  else {
    alert("Please enter the Last Name");
  }

}
else {
  alert("Please enter the First Name");
}


}

    async componentDidMount() {
      await fetch('/getemployee', { method: 'GET',
      headers:{ 'Content-Type': 'application/json' },

       }).then(res => res.json())
       .then(result => {
         console.log(result.user_list);
       this.setState({
         isLoaded: true,
         userlist: result.user_list
       })
     })
      .catch(error => console.error('Error:', error));

  }


  render() {
      const userlist  = this.state.userlist;
      if (!this.state.isLoaded) {
        return (
          <div className='background' >
          <div className = 'wrapemployeelist fadeInDown' >
            <h3 className = "fadeIn" style={{marginBottom:"15px"}}>Employee List</h3>
            <div>Loading ... </div>
           </div>
          </div>
        )
      } else {
        return (
          <div className='background'>
          <div className = 'wrapemployeelist fadeInDown' style={{marginTop:"15%"}} >
            <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Employee List</h3>

<div style={{overflowX:"auto",overflowY:"auto",height:"500px"}}>
            <div class="table">

              <div class="row headerblack ">
                <div class="cell">
                  Name
                </div>
                <div class="cell">
                  Email
                </div>
                <div class="cell">
                  Password
                </div>
                <div class="cell">
                  Birthday
                </div>
                <div class="cell">
                  Phone
                </div>
                <div class="cell">
                  Update
                </div>
                <div class="cell">
                  Delete
                </div>
              </div>
              {userlist.map(user => (



    <div  class="row">
      <div class="cell" data-title="Name">
      <div id={user.user_id + "first_name"} style={{marginBottom:"15%"}} class="fadeIn">{user.first_name}</div>
      <div id={user.user_id + "first_name_input"} style={{display:"none"}}> <input type="text" id="first_name" class="fadeIn inputupdateemployee " name="first_name" placeholder="First Name" required /> </div>
        <div id={user.user_id + "last_name"} class="fadeIn"> {user.last_name} </div>
        <div id={user.user_id + "last_name_input"} style={{display:"none"}}> <input type="text" id="last_name" class="fadeIn inputupdateemployee " name="last_name" placeholder="Last Name"  required /> </div>

      </div>
      <div class="cell" data-title="Email">
    <div id={user.user_id + "email"} class="fadeIn">  {user.email}</div>
    <div id={user.user_id + "email_input"} style={{display:"none"}}> <input type="text" id="email" class="fadeIn inputupdateemployee " name="email" placeholder="Email"  required /> </div>

      </div>
      <div class="cell" data-title="Password">
      <div id={user.user_id + "password"} class="fadeIn">{user.password}</div>
      <div id={user.user_id + "password_input"} style={{display:"none"}}> <input type="text" id="password" class="fadeIn inputupdateemployee " name="password" placeholder="Password"  required /> </div>

      </div>
      <div class="cell" data-title="Birthday">
        <div id={user.user_id + "birthday"} class="fadeIn">{user.birthday}</div>
        <div id={user.user_id + "birthday_input"} style={{display:"none"}}> <input type="text" id="birthday" class="fadeIn inputupdateemployee " name="birthday" placeholder="01/01/1998"   required /> </div>

      </div>
      <div class="cell" data-title="Phone">
        <div id={user.user_id + "phone"} class="fadeIn">{user.phone}</div>
        <div id={user.user_id + "phone_input"} style={{display:"none"}}> <input type="text" id="phone" class="fadeIn inputupdateemployee " name="phone" placeholder="Phone"  required /> </div>

      </div>
      <div class="cell" data-title="Update" style={{cursor:"pointer"}} >
          <div id={user.user_id + "update"} style={{marginLeft: "15px"}} onClick={() => this.showupdatefunc(user)} class="fadeIn"><FaPencilAlt/></div>
          <div id={user.user_id + "ok"} style={{display: "none"}}  onClick={() => this.updatefunc(user)} class="fadeIn" ><p>Update</p><FaCheck/></div>

      </div>
      <div class="cell" data-title="Delete" style={{cursor:"pointer"}}>
          <div id={user.user_id + "delete"} style={{marginLeft: "15px"}} onClick={() => this.deletefunc(user)} class="fadeIn">  <BsTrashFill/></div>
          <div id={user.user_id + "cancel"} style={{display:"none"}} onClick={() => this.noshowupdatefunc(user)} class="fadeIn"><p>Cancel</p> <GiCancel/></div>

      </div>



    </div>






              ))}
              </div>

           </div>
          </div>
          </div>

        );
      }




}
}




export default EmployeeList ;

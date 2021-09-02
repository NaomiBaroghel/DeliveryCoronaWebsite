import React, {Component} from 'react';

import PersonImage from './person.png';
class AddEmployee extends React.Component {

  constructor() {
    super();

    this.state = {
      first_name:'',
      last_name:'',
      birthday:'',
      phone:'',
      email:'',
      password:'',
      };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

  async handleSubmit(event) {
    event.preventDefault();


    const data_email = {email:this.state.email};
    const data = { first_name:this.state.first_name, last_name:this.state.last_name, birthday:this.state.birthday, phone:this.state.phone, email:this.state.email , password:this.state.password }
    console.log(data);

    await fetch('/checkemail', { method: 'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify(data_email) // data can be `string` or {object}!

  }).then(res => res.json())
  .then(async function(res) {
    console.log(res);
    if(!res.exist)
    {
       await fetch('/addemployee', { method: 'POST',
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


  render() {
    return (
  <div className='background'>
  <div className = 'wrapaddemployee fadeInDown' style={{overflowX:"auto"}}>
  <img src={PersonImage} alt="person" style={{height:"80px"}} />

    <h3 className = "fadeIn" style={{marginBottom:"25px"}}>Add Employee</h3>
    <form onSubmit={this.handleSubmit}>
    <label className="labeladdemployee"> Name </label>
<div style={{display:"flex"}}>
    <input type="text" id="first_name" class="fadeIn inputaddemployer " name="first_name" placeholder="First Name" onChange={this.handleChange} required />
    <input type="text" id="last_name" class="fadeIn  inputaddemployer" name="last_name" placeholder="Last Name" onChange={this.handleChange} required/>
    </div>

    <label className="labeladdemployee"> Birthday </label><br/>
    <input style={{width:"99%"}} type="text" id="birthday" className="fadeIn inputaddemployer " name="birthday" placeholder="01/01/1980" onChange={this.handleChange} required/><br/>

    <label className="labeladdemployee"> Phone </label><br/>

    <input  style={{width:"99%"}} type="text" id="phone" className="fadeIn inputaddemployer" name="phone" placeholder="Phone Number" onChange={this.handleChange} required/><br/>


    <label className="labeladdemployee"> Email </label><br/>

      <input   style={{width:"99%"}} type="text" id="email" className="fadeIn inputaddemployer " name="email" placeholder="email@exemple.com" onChange={this.handleChange} required/><br/>

      <label className="labeladdemployee"> Password </label><br/>

      <input style={{width:"99%"}} type="password" id="password" className="fadeIn inputaddemployer" name="password" placeholder="**********" onChange={this.handleChange} required/>

      <input type="submit"  className="fadeIn buttonattemployer " value="Add Employee"/>

    </form>

   </div>
  </div>
);

}
}



export default AddEmployee;

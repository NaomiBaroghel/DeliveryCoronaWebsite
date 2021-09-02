import React, {Component} from 'react';
import './login.css';

class Login extends React.Component {

  constructor() {
    super();

    this.state = {
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

  handleSubmit(event) {
    event.preventDefault();


    const data = { email:this.state.email , password:this.state.password }
    console.log(data);

    fetch('/login', { method: 'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify(data) // data can be `string` or {object}!

     }).then(res => res.json())
     .then(function(res) {
       console.log(res.user.email);
       document.cookie="sessionDelivery="+res.user.email;

       if(res.user.isMenael==1)
       {
         document.cookie="isMenael="+1;
         document.location.href="/deliverylist";


       }
       else {
         document.location.href="/dashboard";

       }



     })

    .catch(error => console.error('Error:', error));


   }


  render() {
    return (
  <div className='background'>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <h2 class="active"> Login </h2>



      <form onSubmit={this.handleSubmit}>
        <input type="text" id="email" class="fadeIn second inputlogin" name="email" placeholder="Email" onChange={this.handleChange}/>
        <input type="password" id="password" class="fadeIn third inputlogin" name="password" placeholder="Password" onChange={this.handleChange}/>
        <input type="submit"  class="fadeIn fourth loginbtn" value="Login"/>
      </form>

      <div id="formFooter">
        <a class="underlineHover" href="#">Forgot Password?</a>
      </div>

    </div>
  </div>
  </div>
);
}
}


export default Login;

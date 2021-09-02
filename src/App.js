import React from 'react';
import './App.css';

import Home from './home';
import About from './about';
import Login from './login';
import Dashboard from './dashboard';

import DeliveryList from './deliverylist';
import AddDelivery from './adddelivery';
import AddAddress from './addaddress';
import KMeans from './kmeans';


import Blog from './blog';
import AddBlog from './addblog';

import EmployeeList from './employeelist';

import AddEmployee from './addemployee';

import Chart from './chart';
import Chat from './chat';


import Ptest from './pagetest';
import fastImage from './fast-delivery.png';
import { NavLink, Switch, Route } from 'react-router-dom';




 function logout()
 {
   document.cookie="sessionDelivery=no";
   document.cookie="isMenael="+0;

   var element = document.getElementById("login_nav");
   element.style.display ="block";
   element = document.getElementById("logout_nav");
   element.style.display ="none";
   element = document.getElementById("delivery_nav");
   element.style.display ="none";
   element = document.getElementById("employee_nav");
   element.style.display ="none";
   element = document.getElementById("chart_nav");
   element.style.display ="none";

   element = document.getElementById("chat_nav");
   element.style.display ="none";
   element = document.getElementById("dashboard_nav");
   element.style.display ="none";
    element = document.getElementById("blog_nav");
   element.style.display ="none";
    element = document.getElementById("blogemployee_nav");
   element.style.display ="none";
      document.location.href="/";


 }
function checkCookies()
{
      var id = findidsession();
      var isMenael = findisMenael();

      if(id!="no")
      {
        console.log("the id is in check cookie");
        console.log(id);
       var element = document.getElementById("login_nav");
       element.style.display ="none";
       element = document.getElementById("logout_nav");
       element.style.display ="block";

       element = document.getElementById("chat_nav");
       element.style.display ="block";
       if(isMenael==1)
       {

       var  element = document.getElementById("employee_nav");
         element.style.display ="block";
         element = document.getElementById("chart_nav");
         element.style.display ="block";
         element = document.getElementById("delivery_nav");
         element.style.display ="block";
          element = document.getElementById("blog_nav");
         element.style.display ="block";
       }
       else {
         var element = document.getElementById("dashboard_nav");
         element.style.display ="block";
          element = document.getElementById("blogemployee_nav");
         element.style.display ="block";
       }


      }



}


function findidsession()
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

function findisMenael()
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

const App = () => (
  <div className='app' onLoad={checkCookies}>
    <Navigation />
    <Main />
   </div>
);

const Navigation = () => (
  <nav style={{zIndex:"100000"}}>
    <ul>
      <li ><NavLink exact activeClassName="current" to='/' style={{borderBottom: "0px"}}> <img src={fastImage} alt="logo" style={{height:"50px"}} /></NavLink></li>
      <li><NavLink exact activeClassName="current" to='/'>Home</NavLink></li>
      <li><NavLink exact activeClassName="current" to='/about'>About</NavLink></li>
      <li id="login_nav" ><NavLink   exact activeClassName="current" to='/login'>Login</NavLink></li>
      <li id="dashboard_nav" style={{display:"none"}}><NavLink   exact activeClassName="current" to='/dashboard' >Dashboard </NavLink></li>
      <li id="blogemployee_nav" style={{display:"none"}}><NavLink   exact activeClassName="current" to='/blog' >Blog </NavLink></li>


      <li id="delivery_nav" style={{display:"none"}}>


      <div class="dropdown-delivery">
  <button class="dropbtn-delivery">   <NavLink exact activeClassName="current" to='/deliverylist'>Delivery </NavLink>
  </button>
  <div class="dropdown-content-delivery">
  <NavLink exact activeClassName="current" to='/deliverylist'> Delivery List</NavLink>
  <NavLink exact activeClassName="current" to='/adddelivery'> Add Delivery</NavLink>
  <NavLink exact activeClassName="current" to='/addaddress'> Add Address</NavLink>
  <NavLink exact activeClassName="current" to='/kmeans'> KMeans</NavLink>

  </div>
  </div>
</li>


      <li id="employee_nav" style={{display:"none"}}  >
      <div class="dropdown-employee">
  <button class="dropbtn-employee">   <NavLink exact activeClassName="current" to='/employeelist'>Employee </NavLink>
  </button>
  <div class="dropdown-content-employee">
  <NavLink exact activeClassName="current" to='/employeelist'> Employee List</NavLink>
  <NavLink exact activeClassName="current" to='/addemployee'> Add Employee</NavLink>
  </div>
</div>

</li>

<li id="blog_nav" style={{display:"none"}}>


<div class="dropdown-blog">
<button class="dropbtn-blog">   <NavLink exact activeClassName="current" to='/blog'>Blog </NavLink>
</button>
<div class="dropdown-content-blog">
<NavLink exact activeClassName="current" to='/addblog'> Add Blog</NavLink>

</div>
</div>
</li>

      <li id="chart_nav" style={{display:"none"}}  ><NavLink exact activeClassName="current" to='/chart'   >Chart</NavLink></li>
      <li id="chat_nav" style={{display:"none"}}  ><NavLink exact activeClassName="current" to='/chat'   >Chat</NavLink></li>

      <li id="logout_nav" style={{display:"none"}} ><NavLink exact activeClassName="current" to='/logout' onClick={logout}  >Logout</NavLink></li>

    </ul>
  </nav>
);







const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/login' component={Login}></Route>
    <Route exact path='/dashboard' component={Dashboard}></Route>

    <Route exact path='/deliverylist' component={DeliveryList}></Route>
    <Route exact path='/adddelivery' component={AddDelivery}></Route>
    <Route exact path='/addaddress' component={AddAddress}></Route>
    <Route exact path='/kmeans' component={KMeans}></Route>

    <Route exact path='/employeelist' component={EmployeeList} ></Route>

    <Route exact path='/addemployee' component={AddEmployee}></Route>

    <Route exact path='/blog' component={Blog}></Route>
    <Route exact path='/addblog' component={AddBlog}></Route>

    <Route exact path='/chart' component={Chart}></Route>
    <Route exact path='/chat' component={Chat}></Route>

    <Route exact path='/ptest' component={Ptest}></Route>
  </Switch>
);

export default App;

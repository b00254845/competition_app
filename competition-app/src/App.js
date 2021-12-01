import './App.css';
import Axios from 'axios'; //API used to communicate with the backend (NodeJS / Server)
import React, { useState } from "react"; //this is an API hook for the constructor function
import * as ReactBootStrap from "react-bootstrap"; //front-end stylesheet for the react page
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"; //renders router and routing declarative component to display the other pages
import about from "./component/about";  //imports the route paths declared for each of the webpages e.g 'About Us', 'Privacy', Contact Us etc
import info from "./component/info"; 
import privacy from "./component/privacy";
import terms from "./component/terms"; 
import contact from "./component/contact";
import closing from "./component/closing"; 


//constructor for the input variables
function App() {
  const [firstnameReg, setFirstnameReg] = useState('');
  const [lastnameReg, setLastnameReg] = useState('');
  const [emailReg, setEmailReg] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [answerReg, setAnswerReg] = useState('');

 //This method validates the details entered and post it to the database
  const submit = () => {
    alert("Thank you for entering the competition, we will contact all winners shortly after the entry's closing date.. Good Luck!" );
    Axios.post("http://localhost:3001/submit", {
      firstname: firstnameReg,
      lastname: lastnameReg,
      email: emailReg,
      date: dateReg,
      answer: answerReg
    
    }).then((res) => {
     console.log(res);
      
  });
};
    //conditonal rendering the components
      return (
       <div className="App">

        <Router>
           
        <div className="content">
                 
        <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ReactBootStrap.Navbar.Brand as={Link} to={"/home"}>UWS COMPETITION SITE</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
        <ReactBootStrap.Nav className="me-auto">
        <ReactBootStrap.Nav.Link as={Link} to={"/about"}>|About Us|</ReactBootStrap.Nav.Link>
       <ReactBootStrap.Nav.Link as={Link} to={"/info"}>|Competition Details|</ReactBootStrap.Nav.Link>
       <ReactBootStrap.Nav.Link as={Link} to={"/privacy"}> |Privacy Policy|</ReactBootStrap.Nav.Link>
       <ReactBootStrap.Nav.Link as={Link} to={"/terms"}> |Terms & Conditions|</ReactBootStrap.Nav.Link>
       <ReactBootStrap.Nav.Link as={Link} to={"/contact"}>|Contact Us|</ReactBootStrap.Nav.Link>
       </ReactBootStrap.Nav>
      <ReactBootStrap.Nav>
      <ReactBootStrap.Nav.Link as={Link} to={"/closing"}> |Competition Closing Date|</ReactBootStrap.Nav.Link>
      </ReactBootStrap.Nav>
   </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Navbar>

         {/* The (Switch) looks through its children (Route) then
            renders current matching URL. */}
          <Switch>

            <Route path="/about" exact component={about}></Route>     
           
            <Route path="/info" component={info}></Route>
            
            <Route path="/privacy" component={privacy}></Route>
          
            <Route path="/terms" component={terms}></Route>
           
            <Route path="/contact" component={contact}></Route>
      
            <Route path="/closing" component={closing}></Route>
            
          </Switch>
          </div>
          
    </Router>
   
               {/* Container for capuring entrant details + html form*/}
         <br/>
            <h1> WELCOME TO OUR COMPETITION WEBSITE </h1>
            <h2>Could you be the next lucky winner?</h2>
            <h3>To have a chance of winning prizes, please register below</h3><br/>
             
             <div className="registeration"></div>
             <h2>Enter Entry Submission Details!!!</h2>
             <strong> First Name: </strong>
             <input type="text" name="firstname" placeholder="Enter First Name...*" required onChange={(e) => {setFirstnameReg(e.target.value)}}/> <br/><br/>
             <strong> Last Name:  </strong>
            <input type="text" name="lastname" placeholder="Enter Last Name...*" required onChange={(e) => {setLastnameReg(e.target.value)}} /> <br/><br/>
            <strong> Email ID:  </strong>
             <input type="text" name="email" placeholder="Enter Your Email Address...*" required onChange={(e) => {setEmailReg(e.target.value)}} /> <br/><br/>   
        
             <strong> Date of Birth:  </strong>
             <input type="date" data-date-inline-picker="true" onChange={(e) => {setDateReg(e.target.value)}}/> <br/><br/>

             <strong> Click dropdown for Competition Question! </strong>
             <div><select className="dropdown">
             <option className="hidden"> Select the Competition Question...* </option>
             <option>What is the famous Scottish only Fizzy Juice?</option>
             </select>
        <br/><br/>
             <div className="form-group">
            <strong>  Your Answer:  </strong>
             <input type="text" name="answer" placeholder="Enter Your Response Here..*" required onChange={(e) => {setAnswerReg(e.target.value)}}/> <br/><br/>
         </div>
        <div>
        <form>
    <label class="checkbox-inline">
      <input type="checkbox" value=""/>By ticking this box, I agree I have read the privacy policy <br/> and consent to the given information being used for the company  <br/> as outlined in the Terms and Conditions of the Competition.
      </label>
     </form>   
          <br/>
             <button onClick={submit}> Submit Entry </button>
         </div>
     </div>
   
     </div>
      )}
export default App; //renders the function component for this web-app.


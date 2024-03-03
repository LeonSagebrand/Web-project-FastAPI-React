
import React from 'react';

    class LoginForm extends React.Component{
      constructor(){
        super();
        this.state = {
          //holds the users values for the form fields
          input: {},
          //holds errors that occur during form submission
          errors: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      //called when the user interacts with any input field
      handleChange(event){
        let input = this.state.input;
        //identify the input field based on its name attribute
        input[event.target.name] = event.target.value;
        this.setState({input})
      }
      //called when the form is submitted
      handleSubmit(event){
        //prevents the default form submission behavior
        event.preventDefault();
        //calls the validate function to check the validity of the form inputs and if it is valid the form is submitted
        if (this.validate()){
          console.log(this.state);
  
          let input = {};
          input["username"] = "";
          input["email"] = "";
          input["password"] = "";
          input["confirm_password"] = "";
          this.setState({input : input});
  
          alert("Form is submitted");
        }
      }
      validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;
  
        //checks if the username is null or undefined
        if (!input["username"]){
          isValid = false;
          errors["username"] ="Please enter your username";
        }
  
        if (typeof input["username"] !== "undefined"){
          const re = /^\S*$/;
          if(input["username"].length < 6 || !re.test(input["username"])){
            isValid = false;
            errors["username"] = "Please enter valid username"
          }
        }
  
        if(!input["email"]){
          isValid = false;
          errors["email"] = "Please enter your email address"
        }
  
        if(typeof input["email"] !== "undefined"){
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if(!pattern.test(input["email"])){
            isValid = false;
            errors["email"] = "Please enter a valid email address"
          }
        }
  
        if(!input["password"]){
          isValid = false;
          errors["password"] = "Please enter your password"
        }
  
  
        if(typeof input["password"] !== "undefined"){
          var patternPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
          if(!patternPassword.test(input["password"])){
            isValid = false;
            errors["password"] = "The password should contain atleast one lowercase, one uppercase, one digit and one special character. The password should be atleast 8 characters long."
          }
        }
  
        if ( typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined"){
          if (input["password"] !== input["confirm_password"]){
            isValid = false;
            errors["confirm_password"] = "Passwords don't match"
          }
        }
  
        this.setState({errors: errors});
  
        return isValid;
      }
      render(){
        return(
  
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-xl font-bold text-center mb-4">Registrering</h1>
            <form onSubmit={this.handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm text-left font-bold">Användarnamn:</label>
            <input
              type="text"
              name="username"
              value={this.state.input.username}
              onChange={this.handleChange}
              className="border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full text-sm"
              placeholder="Ange användarnamn"
              id="username"
            />
            <div className="text-red-500 text-xs font-bold mt-1">{this.state.errors.username}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-left font-bold">Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.input.email}
              onChange={this.handleChange}
              className="border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full text-sm"
              placeholder="Ange Email"
              id="email"
            />
            <div className="text-red-500 text-xs font-bold mt-1">{this.state.errors.email}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-left font-bold">Lösenord:</label>
            <input 
              type="password"
              name="password"
              value={this.state.input.password}
              onChange={this.handleChange}
              className="border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full text-sm"
              placeholder="Ange lösenord"
              id="password"
            />
            <div className="text-red-500 text-xs font-bold mt-1">{this.state.errors.password}</div>
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-left text-sm font-bold">Bekräfta Lösenord:</label>
            <input 
              type="password"
              name="confirm-password"
              id="confirm-password"
              value={this.state.input.confirm_password}
              onChange={this.handleChange}
              className="border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-4 py-2 w-full text-sm"
              placeholder="Bekräfta Lösenord"
            />
            <div className="text-red-500 text-xs font-bold mt-1">{this.state.errors.confirm_password}</div>
          </div>
          <button 
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 px-1 rounded-full w-full hover:bg-blue-700 text-sm">
            Registrera användare
          </button>
        </form>
      </div>
    </div>
  
  
);
      }
    }

export default LoginForm;
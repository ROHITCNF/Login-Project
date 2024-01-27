import Events from "./events/events.js";

class Login {
    constructor(){
     this.events = new Events(); 
    }
}
window.LoginModule = new Login();


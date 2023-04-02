/*
A visitor Class, used only in WebServer.js to generate random IPs for each servers to hold.
If given more time, each Visitor class would be stored inside the servers, and helper functions would be used to retrieve IPs and set states from 
joined to unjoined.
*/

export default class Visitor {
    //Default value of a randomly generated IP.
    constructor(ip=this.generateIP()){
        this.ipAddress = ip;
        this.joined = true;
    }


    getIP = () => {
        return this.ipAddress;
    }
    
    getStatus = () => {
        return this.joined;
    }

    generateIP = () => {
        let ip = "";
        for (let i = 0; i < 3; i++){
          let num = Math.floor((Math.random() * 255) + 1);
          ip = ip.concat(num.toString());
          ip = ip.concat(".");
        }
        ip = ip.concat(Math.floor((Math.random() * 255) + 0));
    
        return ip;  
      }
}

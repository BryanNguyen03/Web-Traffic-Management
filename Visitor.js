export default class Visitor {
    constructor(){
        this.ipAddress = this.generateIP;
        joined = true;
    }
    
    constructor(ipAddress){
        this.ipAddress = ipAddress;
        joined = false;
    }

    getIP = () => {
        return ipAddress;
    }
    
    getStatus = () => {
        return joined;
    }

    generateIP = () => {
        let ip = "";
        for (let i = 0; i < 3; i++){
          let num = Math.floor((Math.random() * 255) + 1);
          ip.concat(num.toString);
          ip.concat(".");
        }
        ip.concat(Math.floor((Math.random() * 255) + 0));
    
        return ip;
      }
}
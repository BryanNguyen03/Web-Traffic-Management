//Simple test program that creates the serverlist Array and adds/removes elements from that array.

//------------------------------------ Initializers for Attributes of Web Server
//Changed everything into OOP
//I feel like I'm coding in C now lmao


export default class WebServer{
  constructor(){
      this.MAXSIZE = 10
      this.server0 = [];
      this.server1 = [];
      this.server2 = [];
      this.serverlist = [this.server0, this.server1, this.server2];
      this.serverStatus = [true, true, true];
      this.queue = [];
      this.blockedIPs = [];
  }

  // ----------------------------------- End of Initializer

  //------------------------------------ Method implementation

  //getServerStatus(server)
  getServerStatus = (serveri) => {
      return this.serverStatus[serveri];
  };

  getServerList = () => {
      return this.serverlist;
  }

  displayServerList = (serveri) =>{
      return this.serverlist[serveri];
  }

  //toggleStatus(server)
  toggleStatus = (serveri) => {
      this.serverStatus[serveri] = !this.getServerStatus(serveri);
  };

  getServerCapacity = (serveri) => {
      return this.serverlist[serveri].length;
  };

  

  /*
  * getAvailableServer will return the next available server to put a user in
  * It returns 0, 1, 2, or false if no servers are available
  * @param1 - serverLogic will indicate the priority of the servers:
  * 1 - Prioritize adding to the lowest server
  * 2 - Prioritize every server EXCEPT 0
  * 3 - Prioritize every server getting to 50% first
  */
  getAvailableServer = (serverLogic) => {
  // If serverlogic == 1, we prioritize adding to the lowest server
      if (serverLogic === 1) {
          // Track the server with the lowest capacity and it's index
          let minIndex = 0;
          let minCapacity = this.getServerCapacity(0);
            
          for (let i = 0; i < this.serverlist.length; i++) {
            if( this.getServerCapacity(i) < minCapacity && this.getServerStatus(i)) {
                minIndex = i;
                minCapacity = this.getServerCapacity(i);
            }
          }
        
          // Return the lowest capacity server, unless it is at max capacity
          if (minCapacity < 10) {
              return minIndex;
          }
      }

  // If serverLogic == 2, then prioritize filling up servers 1 and 2 before server0
      if (serverLogic === 2) {
          // If server's 1 and 2 are full OR server1 and server2 are offline
          if ((this.serverStatus[1] === false && this.serverStatus[2] === false) || ( this.getServerCapacity(1) >= 10 && this.getServerCapacity(2) >= 10)){
          //return server0 if it's online
          if (this.serverStatus[0] && this.getServerCapacity(0) < 10) {
              return 0;
          }
          } else {
              if (this.serverStatus[1] && this.getServerCapacity(1) < 10) {
                  return 1;
              }
              if (this.serverStatus[2] && this.getServerCapacity(2) < 10) {
                  return 2;
              }
          }
      }

  // If serverlogic == 3, then prioritize getting every server to 50% before filling all servers to max capacity
      if (serverLogic === 3) {
          let minIndex = 0;
          let minCapacity = this.serverlist[0].length;
          for (let i = 0; i < this.serverlist.length; i++) {
              if (this.getServerCapacity(i) < this.MAXSIZE * 0.5 && this.getServerStatus(i)) {
                  return i;
              } else if (this.getServerCapacity(i) < minCapacity && this.getServerStatus(i)) {
                  minCapacity = this.getServerCapacity(i);
                  minIndex = i;
              }
          }

          

          if (minCapacity < 10) {
              return minIndex;
          }
      }

      return false; // All servers are full
  };

  registerNewUser = (userIP,serverLogic) => {
      var availserver = this.getAvailableServer(serverLogic);
      if (availserver === false) { //0 is considered false, so we MUST use === to prevent 0 == false errors.
          //if no servers are available, then getAvailableServer returns false
          this.redirectUser(userIP,"queue");
      } else {
          this.redirectUser(userIP,availserver);
      }
  };

  redirectUser = (userIP, serveri) => {
      if (serveri == "queue") {
          console.log(`user moved to queue`);
          this.queue.push(userIP);
      } else {
          this.serverlist[serveri].push(userIP);
      }
  };

  removeUser = (userIP,serveri) => {
    if(this.getServerStatus(serveri)){
      var index = this.serverlist[serveri].indexOf(userIP)
      if(index != -1){
        this.serverlist[serveri].splice(index,1)
      }
    } else {
        console.log(`Server${serveri} is offline! Cannot remove user`)
    }
  }
    
    


///Testing case: creating temp servers and trying to addnew users.

/*
* Test function will add x users to the servers
* @param1 - serverLogic:
* 1 - Prioritize adding to the lowest server
* 2 - Prioritize server 0
* 3 - Prioritize every server getting to 50% first
* @param2 - Number of times to add
* ex: testWebServer(3, 30) -> will run 30 times, each iteration adds a person to the correct server depending on the given logic
*/
  testWebServer = (serverLogic, x) => {
      for (let i = 0; i < x; i++) {
          this.registerNewUser("8",serverLogic);
          
        //   console.log(`serverlist[0] = ${this.serverlist[0]}`);
        //   console.log(`serverlist[1] = ${this.serverlist[1]}`);
        //   console.log(`serverlist[2] = ${this.serverlist[2]}`);
        //   console.log(`queue = ${this.queue}\n`);
      }
    //   console.log(`serverlist[0] capacity = ${this.getServerCapacity(0)} / ${this.MAXSIZE}`);
    //   console.log(`serverlist[1] capacity = ${this.getServerCapacity(1)} / ${this.MAXSIZE}`);
    //   console.log(`serverlist[2] capacity = ${this.getServerCapacity(2)} / ${this.MAXSIZE}`);
  };
}

let p1 = new WebServer();

// p1.toggleStatus(2);
// p1.toggleStatus(1);
console.log("Server2 should now be offline");

p1.testWebServer(3, 31);

p1.removeUser("8",2);


for (let i = 0; i < p1.getServerList().length; i++) {
console.log(`serverlist[${i}] = ${p1.displayServerList(i)}`);
}

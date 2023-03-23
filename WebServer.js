//Simple test program that creates the serverlist Array and adds/removes elements from that array.

//------------------------------------ Initializers for Attributes of Web Server
//Changed everything into OOP
//I feel like I'm coding in C now lmao


class WebServer{
  constructor(){
      this.MAXSIZE = 10
      this.server0 = [];
      this.server1 = [];
      this.server2 = [];
      this.serverlist = [this.server0, this.server1, this.server2];
      this.serverStatus = [true, true, true];
      this.queue = [];
      this.loginCredentials = [["username", "password"]]; //loginCredentials contain lists of [username,password]
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
  * 2 - Prioritize server 0
  * 3 - Prioritize every server getting to 50% first
  */
  getAvailableServer = (serverLogic) => {
  // Updating Server Status
      for (let i = 0; i < this.serverlist.length; i++) {
          if (this.getServerCapacity(i) >= this.MAXSIZE && this.getServerStatus(i) === true) {
              this.toggleStatus(i);
          }
      }

  // If serverlogic == 1, we prioritize adding to the lowest server
      if (serverLogic === 1) {
          // Track the server with the lowest capacity and it's index
          let minIndex = 0;
          let minCapacity = this.getServerCapacity(0);
          for (let i = 0; i < this.serverlist.length; i++) {
              if ((this.getServerCapacity(i) < minCapacity)  && this.getServerStatus(i)) {
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
          // If server's 1 and 2 are full (indicated by it's status)
          if ((this.serverStatus[1] === false && this.serverStatus[2] === false) || ( this.getServerCapacity[1] < 10 && this.getServerCapacity[2] < 10)){
          //return server 0 if it is not full (indicated by it's status)
          if (this.serverStatus[0]) {
              return 0;
          }
          } else {
              if (this.serverStatus[1] && this.getServerCapacity[1] < 10) {
                  return 1;
              }
              if (this.serverStatus[2] && this.getServerCapacity[2] < 10) {
                  return 2;
              }
          }
      }

  // If serverlogic == 3, then prioritize getting every server to 50% before filling all servers to max capacity
      if (serverLogic === 3) {
          let minIndex = 0;
          let minCapacity = this.serverlist[0].length;
          for (let i = 0; i < this.serverlist.length; i++) {
              if (this.getServerCapacity(i) < this.MAXSIZE * 0.5) {
                  return i;
              } else if (this.getServerCapacity(i) < minCapacity) {
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

  registerNewUser = (userIP) => {
      var availserver = this.getAvailableServer();
      if (!availserver) {
          //if no servers are available, then getAvailableServer returns false
          this.redirectUser("queue");
      } else {
          this.redirectUser(availserver);
      }
  };

  redirectUser = (userIP, serveri) => {
      if (serveri == "queue") {
          console.log(`user moved to queue, current queue size = ${this.queue.length}`);
          this.queue.push(userIP);
      } else {
          this.serverlist[serveri].push(userIP);
      }
  };

  removeUser = (userIP,serveri) => {
      index = this.serverlist[serveri].indexOf(userIP)
      if(index != -1){
        arr.splice(index,1)
      }
  }
    
    //Pushes user to serveri
  addUser = (userIP, serveri) => {
      this.serverlist[serveri].push(userIP)
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
          let availServer = this.getAvailableServer(serverLogic);
          console.log(`Adding to Server: ${this.getAvailableServer(serverLogic)}`);
          if (availServer === 0) {
              this.server0.push("8");
          }
          if (availServer === 1) {
              this.server1.push("1");
          }
          if (availServer === 2) {
              this.server2.push("1");
          }
          console.log(`serverlist[0] = ${this.serverlist[0]}`);
          console.log(`serverlist[1] = ${this.serverlist[1]}`);
          console.log(`serverlist[2] = ${this.serverlist[2]}\n`);
      }
      console.log(`serverlist[0] capacity = ${this.getServerCapacity(0)} / ${this.MAXSIZE}`);
      console.log(`serverlist[1] capacity = ${this.getServerCapacity(1)} / ${this.MAXSIZE}`);
      console.log(`serverlist[2] capacity = ${this.getServerCapacity(2)} / ${this.MAXSIZE}`);
  };
}

let p1 = new WebServer();

p1.testWebServer(3, 10);

p1.toggleStatus(2);
console.log("Server2 should now be disabled");

console.log(p1.getServerList().length);

for (let i = 0; i < p1.getServerList().length; i++) {
console.log(`${i}`);
console.log(`serverlist[${i}] = ${p1.displayServerList(i)}`);
}

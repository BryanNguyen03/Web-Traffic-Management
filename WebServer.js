
//------------------------------------ Initializers for Attributes of Web Server
import Visitor from "./Visitor.js";

export default class WebServer {
  constructor() {
    this.MAXSIZE = 10;
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
  };

  displayServerList = (serveri) => {
    return this.serverlist[serveri];
  };

  getQueueCapacity = () => {
    return this.queue.length;
  };

  //toggleStatus(server)
  toggleStatus = (serveri) => {
    this.serverStatus[serveri] = !this.getServerStatus(serveri);
    if (this.serverStatus[serveri] === false) {
      this.serverlist[serveri] = [];
      console.log(`Disconnecting all Users in Server ${serveri}`);
    }
  };

  getServerCapacity = (serveri) => {
    if (this.getServerStatus(serveri)) return this.serverlist[serveri].length;
    return "OFFLINE";
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
        if (
          this.getServerCapacity(i) < minCapacity &&
          this.getServerStatus(i)
        ) {
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
      if (
        (this.serverStatus[1] === false && this.serverStatus[2] === false) ||
        (this.getServerCapacity(1) >= 10 && this.getServerCapacity(2) >= 10)
      ) {
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
        if (
          this.getServerCapacity(i) < this.MAXSIZE * 0.5 &&
          this.getServerStatus(i)
        ) {
          return i;
        } else if (
          this.getServerCapacity(i) < minCapacity &&
          this.getServerStatus(i)
        ) {
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

  // Block IP
  // Block IP
  blockIP = (userIP) => {
    if (this.IPblocked(userIP)) {
      alert(`User IP ${userIP} already blocked`);
      console.log(`User IP ${userIP} already blocked`);
    } else if (userIP.toString().length > 0 && this.IPValid(userIP)) {
      alert(`User IP ${userIP} blocked`);
      this.blockedIPs.push(userIP);
      console.log(`User IP ${userIP} blocked`);
    }
    else{
      alert(`User IP ${userIP} is invalid`);
      console.log(`User IP ${userIP} is invalid`);
    }
  };

  //Checks if the IP is valid, (formating like 0.0.0.0 and no letters etc)

  IPValid = (userIP) => {
      if (/^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/.test(userIP)){
          return true;
      }
      else{
          return false;
      }
  }

  // Check if IP is blocked
  IPblocked = (userIP) => {
    if (this.blockedIPs.indexOf(userIP) !== -1) {
      return true;
    }
    return false;
  };

  registerNewUser = (userIP, serverLogic) => {
    var availserver = this.getAvailableServer(serverLogic);
    if (this.IPblocked(userIP)) {
      //alert("IP has been Blocked");
      console.log(`UserIP ${userIP} blocked`);
      return;
    } else if (availserver === false) {
      //0 is considered false, so we MUST use === to prevent 0 == false errors.
      //if no servers are available, then getAvailableServer returns false
      this.redirectUser(userIP, "queue");
    } else {
      this.redirectUser(userIP, availserver);
    }
  };

  redirectUser = (userIP, serveri) => {
    if (serveri == "queue") {
      console.log(`user moved to queue`);
      this.queue.push(userIP);
    } else {
      console.log(`registered user IP ${userIP}`);
      this.serverlist[serveri].push(userIP);
    }
  };

  removeUser = (userIP) => {
    // Boolean to keep track of whether we cannot remove due to an offline server or if the user was not found
    let removed = false;
    for (let i = 0; i < this.serverlist.length; i++) {
      let index = this.serverlist[i].indexOf(userIP);
      // If the userIP is found in the server
      if (
        this.getServerStatus(i) !== false &&
        index !== -1 &&
        removed === false
      ) {
        console.log(`User IP ${userIP} removed`);
        this.serverlist[i].splice(index, 1);
        removed = true;
      }
    }

    // If server was online, and we did not return yet (in other words, we have not removed the user)
    // Then it was because the user was not found
    if (!removed) {
      console.log(`Unable to remove userIP ${userIP}. userIP cannot be found`);
    }
  };

  //Shifts the front of the queue array into a serveri
  queueToServer = (serveri) => {
    if (this.getServerCapacity(serveri) < 10 && this.queue.length > 0) {
      this.serverlist[serveri].push(this.queue.shift());
    }
  };

  ///Testing case: creating temp servers and trying to addnew users.

  // Helper method for printing our server lists
  printwebservers = () => {
    for (let i = 0; i < this.getServerList().length; i++) {
      console.log(`serverlist[${i}] = [ ${this.displayServerList(i)} ]`);
    }
  };

  /*
   * Test function will add x users to the servers
   * @param1 - serverLogic:
   * 1 - Prioritize adding to the lowest server
   * 2 - Prioritize server 0
   * 3 - Prioritize every server getting to 50% first
   * @param2 - Number of times to add
   * ex: testWebServer(3, 30) -> will run 30 times, each iteration adds a person to the correct server depending on the given logic
   */

  testWebServer = (serverLogic) => {
    //Gets the total capacity of all servers.
    const getTotalServerSize = () => {
      let x = 0;
      this.getServerList().forEach((server) => {
        x += server.length;
      });
      return x;
    };

    let randomNumber = 0;

    // The actual maxsize of all webservers combined would be MAXSIZE * the number of servers
    // so we'll have a 2:1 ratio of adding more users to removing users until we almost reach max capacity
    if (
      getTotalServerSize() <
      this.MAXSIZE * this.getServerList().length - 0.5
    ) {
      randomNumber = Math.floor(Math.random() * 3) + 1;
    }
    // Once our webservers are almost at max capacity, we can swap back to 1:1 ratio of adding to removing
    // Where our randomNumber will indicate whether we add or remove
    else {
      randomNumber = Math.floor(Math.random() * 2) + 1;
    }

    var vis = new Visitor;

    if (randomNumber === 1) {
      this.registerNewUser(vis.getIP(), serverLogic);
    } else if (randomNumber === 2) {
      this.removeUser("8.8.8.8");
    } else {
      this.registerNewUser("8.8.8.8", serverLogic);
    }

    this.printwebservers();
    console.log(`queue = ${this.queue}\n`);

    this.printwebservers();
  };
}

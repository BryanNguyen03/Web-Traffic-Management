//Simple test program that creates the serverlist Array and adds/removes elements from that array.

//------------------------------------ Initializers for Attributes of Web Server
//I feel like I'm coding in C now lmao
const MAXSIZE = 10;
let server0 = [];
let server1 = [];
let server2 = [];
let serverlist = [server0, server1, server2];
let serverStatus = [true, true, true];
let queue = [];
let loginCredentials = [["username", "password"]]; //loginCredentials contain lists of [username,password]
let blockedIPs = [];

// ----------------------------------- End of Initializer

//------------------------------------ Method implementation

//getServerStatus(server)
const getServerStatus = (serveri) => {
  return serverStatus[serveri];
};

//toggleStatus(server)
const toggleStatus = (serveri) => {
  serverStatus[serveri] = !getServerStatus(serveri);
};

const getServerCapacity = (serveri) => {
  return serverlist[serveri].length;
};

/*
 * getAvailableServer will return the next available server to put a user in
 * It returns 0, 1, 2, or false if no servers are available
 * @param1 - serverLogic will indicate the priority of the servers:
 * 1 - Prioritize adding to the lowest server
 * 2 - Prioritize server 0
 * 3 - Prioritize every server getting to 50% first
 */
const getAvailableServer = (serverLogic) => {
  // Updating Server Status
  for (let i = 0; i < serverlist.length; i++) {
    if (getServerCapacity(i) >= MAXSIZE && getServerStatus(i) === true) {
      toggleStatus(i);
    }
  }

  // If serverlogic == 1, we prioritize adding to the lowest server
  if (serverLogic === 1) {
    // Track the server with the lowest capacity and it's index
    let minIndex = 0;
    let minCapacity = getServerCapacity(0);
    for (let i = 0; i < serverlist.length; i++) {
      if (getServerCapacity(i) < minCapacity) {
        minIndex = i;
        minCapacity = getServerCapacity(i);
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
    if (serverStatus[1] === false && serverStatus[2] === false) {
      //return server 0 if it is not full (indicated by it's status)
      if (serverStatus[0]) {
        return 0;
      }
    } else {
      if (serverStatus[1] === true) {
        return 1;
      }
      if (serverStatus[2] === true) {
        return 2;
      }
    }
  }

  // If serverlogic == 3, then prioritize getting every server to 50% before filling all servers to max capacity
  if (serverLogic === 3) {
    let minIndex = 0;
    let minCapacity = serverlist[0].length;
    for (let i = 0; i < serverlist.length; i++) {
      if (getServerCapacity(i) < MAXSIZE * 0.5) {
        return i;
      } else if (getServerCapacity(i) < minCapacity) {
        minCapacity = getServerCapacity(i);
        minIndex = i;
      }
    }

    if (minCapacity < 10) {
      return minIndex;
    }
  }

  return false; // All servers are full
};

const registerNewUser = (userIP) => {
  var availserver = getAvailableServer();
  if (!availserver) {
    //if no servers are available, then getAvailableServer returns false
    redirectUser("queue");
  } else {
    redirectUser(availserver);
  }
};

const redirectUser = (userIP, serveri) => {
  if (serveri == "queue") {
    console.log(`user moved to queue, current queue size = ${queue.length}`);
    queue.push(userIP);
  } else {
    serverlist[serveri].push(userIP);
  }
};

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
const testWebServer = (serverLogic, x) => {
  for (let i = 0; i < x; i++) {
    let availServer = getAvailableServer(serverLogic);
    console.log(`Adding to Server: ${availServer}`);
    if (availServer === 0) {
      server0.push("8");
    }
    if (availServer === 1) {
      server1.push("1");
    }
    if (availServer === 2) {
      server2.push("1");
    }
    console.log(`serverlist[0] = ${serverlist[0]}`);
    console.log(`serverlist[1] = ${serverlist[1]}`);
    console.log(`serverlist[2] = ${serverlist[2]}\n`);
  }
  console.log(`serverlist[0] capacity = ${getServerCapacity(0)} / ${MAXSIZE}`);
  console.log(`serverlist[1] capacity = ${getServerCapacity(1)} / ${MAXSIZE}`);
  console.log(`serverlist[2] capacity = ${getServerCapacity(2)} / ${MAXSIZE}`);
};

testWebServer(3, 10);

toggleStatus(2);
console.log("Server2 should now be disabled");

console.log(serverlist.length);

for (let i = 0; i < serverlist.length; i++) {
  console.log(`${i}`);
  console.log(`serverlist[${i}] = ${serverlist[i]}`);
}

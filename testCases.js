import WebServer from "./WebServer";

/*
 * This file contains three functions - testRemoveUser, testRegister, testBlocking
 * testRemoveUser - tests removing an IP from an offline server, removing an existing IP, removing a non-existing IP
 * testRegiser - tests adding a blocked IP and an unblocked IP with all three server logic algorithms.
 * testBlocking - tests blocking a new IP, and a pre-existing blockedIP
 * testServerLogic - Tests results adding users 20 times in all three logics, and adding over the max capacity
 */

// -- TESTING REMOVE USER --
testRemoveUser = () => {
  console.log("-- TESTING REMOVE USER --\n");
  let p1 = new WebServer();
  console.log("Adding Users to Server: ");
  p1.registerNewUser("5", 3);
  p1.registerNewUser("7", 3);
  p1.registerNewUser("9", 3);
  p1.registerNewUser("15", 1);

  // Case 1 - removing existing IP from online server
  console.log(
    `\nTest 1: Removing existing IP 9 from online server - SHOULD RETURN \"User IP 9 removed\"`
  );
  p1.removeUser("9");

  // Case 2 - removing non-existing IP from online server
  console.log(
    `\nTest 2: Removing non-existing IP 10 from online server - SHOULD RETURN \"Unable to remove userIP 10. userIP cannot be found\"`
  );
  p1.removeUser("10");

  // Toggle server 0 - now offline - disconnects all users
  p1.toggleStatus(0);

  // Case 3 - removing IP from offline server
  console.log(
    `\nTest 3: Removing IP 7 from offline server - SHOULD RETURN \"Unable to remove userIP 7. userIP cannot be found\"`
  );
  p1.removeUser("7");
};

// -- TESTING REGISTER IPs --
testRegister = () => {
  console.log("-- TESTING REGISTER IPs --\n");
  // Test Cases For block/adding IPs
  let p1 = new WebServer();

  // Case 1 - adding a blocked IP (logic 1)
  p1.blockIP("5");
  console.log(
    `\nTest 1: Adding blocked IP 5 with server logic 1 - SHOULD RETURN \"UserIP 5 blocked\"`
  );
  p1.registerNewUser("5", 1);

  // Case 2 - adding a blocked IP (logic 2)
  console.log(
    `\nTest 2: Adding blocked IP 5 with server logic 2 - SHOULD RETURN \"UserIP 5 blocked\"`
  );
  p1.registerNewUser("5", 2);

  // Case 3 - adding a blocked IP (logic 3)
  console.log(
    `\nTest 3: Adding blocked IP 5 with server logic 3 - SHOULD RETURN \"UserIP 5 blocked\"`
  );
  p1.registerNewUser("5", 3);

  // Case 4 - adding a blocked IP (logic 1)
  console.log(
    `\nTest 4: Adding unblocked IP 6 with server logic 1 - SHOULD RETURN \"registered user IP 6\"`
  );
  p1.registerNewUser("6", 1);

  // Case 5 - adding a blocked IP (logic 2)
  console.log(
    `\nTest 5: Adding unblocked IP 6 with server logic 2 - SHOULD RETURN \"registered user IP 6\"`
  );
  p1.registerNewUser("6", 2);

  // Case 6 - adding a blocked IP (logic 3)
  console.log(
    `\nTest 6: Adding unblocked IP 6 with server logic 3 - SHOULD RETURN \"registered user IP 6\"`
  );
  p1.registerNewUser("6", 3);
};

// -- TESTING BLOCKED IPs --
testBlocking = () => {
  console.log("-- TESTING BLOCKED IPs --\n");
  let p1 = new WebServer();
  // Case 1 - adding a non-existing blockedIP
  console.log(
    `\nTest 1: blocking new IP 2 - SHOULD RETURN \"User IP 2 blocked\"`
  );
  p1.blockIP("2");

  // Case 2 - adding a non-existing blockedIP
  console.log(
    `\nTest 2: blocking new IP 5 - SHOULD RETURN \"User IP 5 blocked\"`
  );
  p1.blockIP("5");

  // Case 3 - adding a pre-existing blockedIP
  console.log(
    `\nTest 3: blocking pre-existing IP 2 - SHOULD RETURN \"User IP 2 already blocked\"`
  );
  p1.blockIP("2");

  // Case 4 - adding a pre-existing blockedIP
  console.log(
    `\nTest 4: blocking pre-existing IP 5 - SHOULD RETURN \"User IP 5 already blocked\"`
  );
  p1.blockIP("5");
};

// -- TESTING SERVER LOGIC --
testServerLogic = () => {
  // Case 1: Adding 20 users to servers using logic 1
  let p = testWebServer(1, 20);

  // Case 2: Adding 20 users to servers using logic 2

  // Case 3: Adding 20 users to servers using logic 3

  // Case 4: Adding over max capacity of users to servers using any logic
};

// Helper method for testing server logic
testWebServer = (serverLogic, x) => {
  let p1 = new WebServer();
  for (let i = 0; i < x; i++) {
    p1.registerNewUser(serverLogic, i);
  }
  return p1;
};

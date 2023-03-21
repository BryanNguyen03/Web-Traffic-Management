//Simple test program that creates the serverlist Array and adds/removes elements from that array.


//------------------------------------ Initializers for Attributes of Web Server
//I feel like I'm coding in C now lmao
const MAXSIZE = 10
let server0 = []
let server1 = []
let server2 = []
let serverlist = [server0,server1,server2]
let serverStatus = [True,True,True]
let queue = []
let loginCredentials = [ ["username","password"] ] //loginCredentials contain lists of [username,password]
let blockedIPs = []

// ----------------------------------- End of Initializer


//------------------------------------ Method implementation

//getServerStatus(server)
const getServerStatus = (serveri) => {
    return serverStatus[serveri]
}


//toggleStatus(server)
const toggleStatus = (serveri) => {
    serverStatus[serveri] = !getServerStatus[serveri]
}

const getServerCapacity = (serveri) => {
    return serverlist[serveri].length
}


//We use serverlogic here, which is to specify what the WebOwner can choose to prioritize certain servers over others
//e.g: (serverlogic => if server0 is 5/10, try filling server1 and server2 to 5/10 first before filling server1.)
//I'm not really sure how to implement these logics so I'm gonna use a dummy value for now

const getAvailableServer = (serverLogic) => {
    serverLogic = 3 //Dummy code that's just meant for preventing compile warnings lol

    for (let i = 0; i < serverlist.length; i++) {

        if (serverlist[i].length < MAXSIZE && getServerStatus(serverlist[i])) return i //index represents the server
    }
    return false //fail case, returns NaN to show all servers are full.
}



const registerNewUser = (userIP) => {
    var availserver = getAvailableServer()
    if(!availserver) { //if no servers are available, then getAvailableServer returns false
        redirectUser("queue")
    } else {
        redirectUser(availserver)
    }
}

const redirectUser = (userIP,serveri) => {
    if (serveri == "queue") {
        console.log(`user moved to queue, current queue size = ${queue.length}`)
        queue.push(userIP)
    } else {
        serverlist[serveri].push(userIP)
    }
    
}






///Testing case: creating temp servers and trying to addnew users.

server1.push("3")
server2.push("6")
server0.push("8")
server0.push("13")
server2.push("15")
server0.push("16")


toggleStatus(2);
console.log("Server2 should now be disabled")


console.log(serverlist.length)

for (let i = 0; i < serverlist.length; i++) {
    console.log(`${i}`)
    console.log(`serverlist[${i}] = ${serverlist[i]}`)
    
}





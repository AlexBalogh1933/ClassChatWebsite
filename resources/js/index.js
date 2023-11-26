let sendButtonAnon;
let sendButtonUser;
let chatDisplay;
let typeMessage;

window.localStorage.clear();

getAllElements();
checkForSignedIn();

//Set the interval at which the updateMessages() function is run.
const MILLISECONDS_IN_ONE_SECOND = 1000;
setInterval(updateMessages, MILLISECONDS_IN_ONE_SECOND);

//for all needed, getElementById()
async function getAllElements(){
  sendButtonAnon = document.getElementById("sendButtonAnon");//Button to Send Anonymously
  sendButtonUser = document.getElementById("sendButtonAsUser");//Button to Send as yourself (username)
  chatDisplay = document.getElementById("chatDisplay");//Box the chat is diplayed in
  typeMessage = document.getElementById("typeMessage");//Box you type the message you would like to send in
  accountInformation = document.getElementById("accountInformation");//Div containing sign in/current user info
  usernameField = document.getElementById("usernameInput");//Username field to sign in
  passwordField = document.getElementById("passwordInput");//Password field to sign in
  signInButton = document.getElementById("signInButton");//Button to sign in
  signUpButton = document.getElementById("signUpButton");//Button to sign up, see TODO
  logOutButton = document.getElementById("logOutButton");//Button to log out current user
  chatbar = document.getElementById("chatbar");//Div containing both send message buttons and typeMessage
}

//Checks to see if the user is signed in. HTML is changed based on true/false.
async function checkForSignedIn(){
  //Get the current user data
  let currentUser = await Parse.User.currentAsync();
  //if a user is signed in
  if(currentUser != null){
    accountInformation.innerHTML = 
    `
    <p>Welcome, ${currentUser.get('username')}</p>
    <button id="logOutButton" type="button">Log Out</button>
    `;

    chatbar.innerHTML = 
    `
      <input id ="typeMessage" class="typeMessage" type="text" placeholder="Type a message ...">
      <button id="sendButtonAnon" class="sendMessageAnonBTN" type="button">Send as: A Classmate</button>
      <button id="sendButtonAsUser" class="sendMessageUserBTN" type="button">Send as: You</button>
    `;
    getAllElements();

    //Adds logout button logic
    logOutButton.addEventListener("click", function(logOutButtonEvent){
      logOutButtonEvent.preventDefault();
      logOut();
    });

    //Adds send as a user logic
    //Send as a User (USERNAME)
    sendButtonUser.addEventListener("click", function(sendButtonUserClickEvent){
      sendButtonUserClickEvent.preventDefault();
      saveNewMessageUser(typeMessage.value);
      updateMessages();
      typeMessage.value = "";
    });

    //Adds send anon logic
    sendButtonAnon.addEventListener("click", function(sendButtonAnonClickEvent){
      sendButtonAnonClickEvent.preventDefault();
      saveNewMessageAnon(typeMessage.value);
      updateMessages();
      typeMessage.value = "";
    });
  }   
  //if a user is not signed in
  else{
    accountInformation.innerHTML = 
    `
      <input id="usernameInput" type="text" placeholder="Username"></input>
      <input id="passwordInput" type="text" placeholder="Password"></input>
      <button id="signInButton" type="button">Sign In</button>
      <button id="signUpButton" type="button">Sign Up</button>
    `;

    chatbar.innerHTML = 
    `
      <input id ="typeMessage" class="typeMessage" type="text" placeholder="Type a message ...">
      <button id="sendButtonAnon" class="sendMessageAnonBTN" type="button">Send as: A Classmate</button>
    `;
    getAllElements();

    //Adds signUpButtonLogic
    //TODO: Was setup temporarily to create mock users
    signUpButton.addEventListener("click", function(signUpButtonClickEvent){
    signUpButtonClickEvent.preventDefault();
    signUp();
    });

    //Adds signInButtonLogic
    signInButton.addEventListener("click", function(signInButtonClickEvent){
    signInButtonClickEvent.preventDefault();
    signIn();
    });

    //Adds send anon logic
    sendButtonAnon.addEventListener("click", function(sendButtonAnonClickEvent){
      sendButtonAnonClickEvent.preventDefault();
      saveNewMessageAnon(typeMessage.value);
      updateMessages();
      typeMessage.value = "";
    });
  }
}

//Updates the list of messages
async function updateMessages(){
  try{
    const messages = new Parse.Query("Message");
    messages.ascending("createdAt");
    const results = await messages.find();

    let messagesString = "";

    for (let i = 0; i < results.length; i++){
      const object = results[i];
      const messageString = object.get("sender") + ": (" + object.get("createdAt")  + ") " + object.get("contents") + "\n";
      messagesString += messageString;
    }

    chatDisplay.value = messagesString;
  } 
  catch(error){
    alert(`Failed to retrieve messages, with error code: ${error.message}`);
  }
}

//Log In to an account
async function signIn(){
  var username = usernameField.value;
  var password = passwordField.value;
  try{
    var user = Parse.User
    .logIn(username, password);
    await delay(1000);
    //setTimeout(checkForSignedIn(), 1000);
    checkForSignedIn();
  }
  catch(error){
    alert("Failed to sign in with error code: " + error.message);
  }
  
}

//TODO: Was setup temporarily to create mock users
async function signUp(){
  //Create a new instance of the user class
  try{
    var user = new Parse.User();
    user.set("username", "lambrics");
    user.set("password", "1234");
    user.set("email", "lambrics@ucmail.uc.edu");
    user.signUp();
    checkForSignedIn();
  }
  catch(error){
    alert('Failed to create user, with error code: ' + error.message);
  }
}

//Logs out the current user
async function logOut(){
  try{
    Parse.User.logOut();
    await delay(1000);
    checkForSignedIn();
  }
  catch(error){
    alert("Failed to log out with error code: " + error.message)
  }
}

//Send as A Classmate (ANONYMOUS)
//Sends a message anonymously as "A Classmate"
async function saveNewMessageAnon(Message){
    try{
      const message = new Parse.Object("Message");
      message.set("sender", "A Classmate");
      message.set("contents", Message);
      let result = await message.save();
    }
    catch(error){
      alert('Failed to send message, with error code: ' + error.message);
    }
}

//Sends a message NON anonymously as username
async function saveNewMessageUser(Message){
  try{
    const message = new Parse.Object("Message");
    let currentUser = await Parse.User.currentAsync();
    let currentUsername = currentUser.get('username');
    message.set("sender", currentUsername);
    message.set("contents", Message);
    let result = await message.save(); 
  }
  catch(error){
    alert('Failed to send message, with error code: ' + error.message);
  }
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
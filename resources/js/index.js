let sendButtonAnon;
let sendButtonUser;
let chatDisplay;
let typeMessage;
let accountInformation;
let usernameField;
let passwordField;
let signInButton;
let signUpButton;
let logOutButton;
let chatbar;
let favoritesPopup;
let groupsPopup;
let createGroupButton;
let groupsList;
let groupsListDiv;
let currentChatName;
let accountPage;

window.localStorage.clear();

let currentGroup = "0"; // 0 = General

//run 'browserify index.js -o bundle.js' for every new implementation of the profanity package
//https://browserify.org/
//implement @2toad profanity package
var profanity = require('@2toad/profanity').profanity;

getAllElements();
checkForSignedIn();

//Set the interval at which the updatesidebarButtonsMessages() function is run.
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
  favoritesPopup = document.getElementById("favoritesPopup");
  groupsPopup = document.getElementById("groupsPopup");
  createGroupButton = document.getElementById("createGroupButton");//Button to create a group
  groupsList = document.getElementById("groupsList");//List of user's groups
  groupsListDiv = document.getElementById("groupsListDiv");//Div containing groupsList
  currentChatName = document.getElementById("currentChatName");
  accountPage = document.getElementById("accountPage");//Account Page Button
}

//Checks to see if the user is signed in. HTML is changed based on true/false.
async function checkForSignedIn(){
  //Get the current user data
  let currentUser = await Parse.User.currentAsync();

  //if a user is signed in
  if(currentUser != null){
    accountPage.innerHTML =
    `
    <li class="account"><a href="resources/html/account.html">Account</a></li>
    `;

    accountInformation.innerHTML = 
    `
    <p class="signInWelcome">Welcome, ${currentUser.get('username')}</p>
    <button id="logOutButton" class="logOutBTN" type="button">Log Out</button>
    `;

    chatbar.innerHTML = 
    `
      <input id ="typeMessage" class="typeMessageUser" type="text" placeholder="Type a message ...">
      <button id="sendButtonAnon" class="sendMessageAnonBTN" type="button">Send as: A Classmate</button>
      <button id="sendButtonAsUser" class="sendMessageUserBTN" type="button">Send as: ${currentUser.get('username')}</button>
    `;

    groupsPopup.innerHTML = 
    `
      <h1>Your Groups</h1>
      <button id="createGroupButton" type="button">Create Group</button>
      <button type="button">Join Group</button>
      <p>Select a group to view the chat.</p>
      <p>
        <div id="groupsListDiv">
          <ul id="groupsList"> 
          </ul>
        </div>
      <p>
    `

    listGroups();
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

    //Adds create group logic
    createGroupButton.addEventListener("click", function(createGroupButtonClickEvent){
      createGroupButtonClickEvent.preventDefault();
      createGroup();
      delay(MILLISECONDS_IN_ONE_SECOND);
      getAllElements();
      listGroups();
    })


  }   
  //if a user is not signed in
  else{
    accountPage.innerHTML =
    `
    
    `;//clears accountPage section
    accountInformation.innerHTML = 
    `
      <input id="usernameInput" class="usernameInput" type="text" placeholder="Username"></input>
      <input id="passwordInput" class="passwordInput"type="password" placeholder="Password"></input>
      <button id="signInButton" class="signInButton" type="button">Sign In</button>
      <button id="signUpButton" class="signUpButton" type="button">Sign Up</button>
    `;

    chatbar.innerHTML = 
    `
      <input id ="typeMessage" class="typeMessageAnon" type="text" placeholder="Type a message ...">
      <button id="sendButtonAnon" class="sendMessageAnonBTN" type="button">Send as: A Classmate</button>
    `;

    favoritesPopup.innerHTML =
    `
      <h1>Your Favorites</h1>
      <p>Please sign in to view your favorites.</p>
      <a href="#" class="popup-box-close">X</a>
    `;

    groupsPopup.innerHTML = 
    `
      <h1>Your Groups</h1>
      <p>Please sign in to view your groups.</p>
      <a href="#" class="popup-box-close">X</a>
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
      if(object.get("groupID") == currentGroup){
        const messageString = object.get("sender") + ": (" + object.get("createdAt")  + ") " + object.get("contents") + "\n";
        messagesString += messageString;
      }
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
    //check for profanity
    if(profanity.exists(Message)){
      alert('The message you are trying to send contains language others may consider offensive. Please refrain from using language others may find harmful or offensive.');
    }
    else{
      const message = new Parse.Object("Message");
      message.set("sender", "A Classmate");
      message.set("contents", Message);
      message.set("groupID", currentGroup);
      let result = await message.save();
    }
  }
  catch(error){
    alert('Failed to send message, with error code: ' + error.message);
  }
}

//Sends a message NON anonymously as username
async function saveNewMessageUser(Message){
  try{
    //check for profanity
    if(profanity.exists(Message)){
      alert('The message you are trying to send contains language others may consider offensive. Please refrain from using language others may find harmful or offensive.')
    }
    else{
      const message = new Parse.Object("Message");
      let currentUser = await Parse.User.currentAsync();
      let currentUsername = currentUser.get('username');
      message.set("sender", currentUsername);
      message.set("contents", Message);
      message.set("groupID", currentGroup);
      let result = await message.save(); 
    }
  }
  catch(error){
    alert('Failed to send message, with error code: ' + error.message);
  }
}

async function createGroup(){
  let name = prompt("Enter the name of your group:")
  let doesExist = false;
  try{
    //Verify if name is already being used
    const groups = new Parse.Query("Group");
    const results = await groups.find();

    for(let i = 0; i < results.length; i++){
      const group = results[i];
      const groupName = group.get("name");
      if(groupName.toLowerCase() == name.toLowerCase() || name.toLowerCase() == "general"){
        doesExist = true;
      }
    }

    if(doesExist){
      alert(`The group name, ${name}, is already in use. Please try again with another name.`);
    }
    else{
      const group = new Parse.Object("Group");
        let currentUser = await Parse.User.currentAsync();
        let members = [currentUser.get("username")];
        group.set("name", name);
        group.set("members", members);
        let result = await group.save();
        delay(MILLISECONDS_IN_ONE_SECOND);
    }
  }
  catch(error){
    alert('Failed to create group, with error code: ' + error.message);
  }
      
}

async function listGroups(){
  getAllElements();
  try{
    groupsListDiv.innerHTML = 
    `
        <ul id="groupsList">
          
        </ul>
    `
    
    getAllElements();
    const groups = new Parse.Query("Group");
    groups.ascending("name");
    const results = await groups.find();

    //List general
    let liGeneral = document.createElement("li");
    liGeneral.innerText = "General";
    liGeneral.addEventListener("click", function(selectGeneralClickEvent){
      selectGeneralClickEvent.preventDefault();
      selectGroup("0", "General");
    })
    groupsList.appendChild(liGeneral);

    //List other groups
    for (let i = 0; i < results.length; i++){
      const group = results[i];
      const groupMembers = group.get("members");
      const groupId = group.id;
      const groupName = group.get("name");
      const currentUser = await Parse.User.currentAsync();
      const currentUsername = currentUser.get('username');
      if(groupMembers.includes(currentUsername)){
        let li = document.createElement("li");
        li.innerText = groupName;

        //add selection logic to li items
        li.addEventListener("click", function(selectGroupClickEvent){
          selectGroupClickEvent.preventDefault();
          selectGroup(groupId, groupName);
        })
        groupsList.appendChild(li);
      }
    }
  }
  catch(error){
    alert(`Failed to get groups with error code: ${error.message}`)
  }
}

async function selectGroup(GroupId, GroupName){
  currentGroup = GroupId;
  currentGroupName = GroupName;
  currentChatName.innerHTML = `${currentGroupName}`;
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}
const sendButtonAnon = document.getElementById("sendButtonAnon");
const chatDisplay = document.getElementById("chatDisplay");
const typeMessage = document.getElementById("typeMessage");
const usernameField = document.getElementById("usernameInput");
const passwordField = document.getElementById("passwordInput");
const signInButton = document.getElementById("signInButton");
let isSignedIn = false;

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

//Send as A Classmate
sendButtonAnon.addEventListener("click", function(sendButtonAnonClickEvent){
  sendButtonAnonClickEvent.preventDefault();
  saveNewMessageAnon(typeMessage.value);
  updateMessages();
  typeMessage.value = "";
});

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

async function checkForSignedIn(){
  //if the user is NOT signed in
  if (!isSignedIn){
    //TODO: index.html displays the sign in option
  }
  //if the user is signed in
  else{
    //TODO: index.html displays the information of the current signed in user
  }
}

//Set the interval at which the updateMessages() function is run.
const MILLISECONDS_IN_ONE_SECOND = 1000;
setInterval(updateMessages, MILLISECONDS_IN_ONE_SECOND);
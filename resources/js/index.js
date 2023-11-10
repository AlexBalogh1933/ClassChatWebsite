const sendButtonAnon = document.getElementById("sendButtonAnon");
const chatDisplay = document.getElementById("chatDisplay");
const typeMessage = document.getElementById("typeMessage");

//Send as A Classmate
sendButtonAnon.addEventListener("click", function(sendButtonAnonClickEvent){
  sendButtonAnonClickEvent.preventDefault();
  saveNewMessageAnon(typeMessage.value);
  typeMessage.value = "";
});

//Sends a message anonymously as "A Classmate"
async function saveNewMessageAnon(Message){
  const message = new Parse.Object("Message");

  message.set("sender", "A Classmate");
  message.set("contents", Message);
  try{
    let result = await message.save()
    //alert('New object created with ObjectId: ' + result.id);
  } catch(error){
    alert('Failed to send message, with error code: ' + error.message);
  }
}

//TODO: retrieve all messages from DB class & into text area
async function retrieveMessage(){
  const query = new Parse.Query("Message");

  try{
    const message = await query.get("p2iO6jVG7n");
    const sender = message.get("sender");
    const contents = message.get("contents");

    chatDisplay.append(sender + ": " + contents);
    //alert(`${sender}: ${contents}`);
  } catch(error){
    alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}

async function checkProfanity(Message){
  
}
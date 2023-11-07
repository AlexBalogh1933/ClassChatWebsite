//TODO: add user input parameter for message contents
async function saveNewMessageAnon(){
  const message = new Parse.Object("Message");

  message.set("sender", "Nobody");
  message.set("contents", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
  try{
    let result = await message.save()
    alert('New object created with ObjectId: ' + result.id);
  } catch(error){
    alert('Failed to create new object, with error code: ' + error.message);
  }
}

async function retrieveMessage(){
  const query = new Parse.Query("Message");

  try{
    const message = await query.get("Crap");
    const sender = message.get("sender");
    const contents = message.get("contents");

    alert(`${sender}: ${contents}`)
  } catch(error){
    alert(`Failed to retrieve the object, with error code: ${error.message}`);
  }
}
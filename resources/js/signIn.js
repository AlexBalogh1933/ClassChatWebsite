let accountInformation;
let usernameField;
let passwordField;
let signInButton;
let signUpButton;
let logOutButton;

getAllElements();
checkForSignedIn();

async function getAllElements(){
  accountInformation = document.getElementById("accountInformation");
  usernameField = document.getElementById("usernameInput");
  passwordField = document.getElementById("passwordInput");
  signInButton = document.getElementById("signInButton");
  signUpButton = document.getElementById("signUpButton");
  logOutButton = document.getElementById("logOutButton");
}

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
    getAllElements();

    logOutButton.addEventListener("click", function(logOutButtonEvent){
      logOutButtonEvent.preventDefault();

    })
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
    getAllElements();

    //TODO: Was setup temporarily to create mock users
    signUpButton.addEventListener("click", function(signUpButtonClickEvent){
    signUpButtonClickEvent.preventDefault();
    signUp();
    });

    signInButton.addEventListener("click", function(signInButtonClickEvent){
    signInButtonClickEvent.preventDefault();
    signIn();
    });
  }
}

function delay(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
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

async function logOut(){
  try{
    currentUser.logOut();
    checkForSignedIn();
  }
  catch(error){
    alert("Failed to log out with error code: " + error.message)
  }
}
// if someone is logged in then show main frame1

// save saveToLocalStorage  kon logged in uski jaankari
// else show auth pageXOffset

// let tasks = [
//   {
//     userId: "xyz123",
//     status: true,
//     timeStamp: "28/06/2026, 11:30:09",
//     taskId: 1782712809149,
//     taskName: "task3",
//     description: "asdfsdf",
//   },
// ];

// let users = [
//   { userId: "awegfa", password: "asdf" },
//   { userId: "a1234a", password: "asdfasdf" },
// ];

let authFrame = document.getElementById("auth-frame");
let userId = document.createElement("input");
userId.classList = "border-2 border-red-500";
userId.placeholder = "enter User id";
let password = document.createElement("input");
password.classList = "border-2";
password.placeholder = "enter password";

let authButton = document.createElement("button");
authButton.innerText = "Submit";
authButton.addEventListener("click", () => {
  let id = userId.value;
  let pass = password.value;
  console.log(id, pass);
});
authFrame.appendChild(userId);
authFrame.appendChild(password);
authFrame.appendChild(authButton);

// setLoggedInUserToLocalStorage({ userId: "asdg", password: "sreg" });


let loggedInUser = getLoggedInUserFromLocalStorage();
if (!loggedInUser) {
  mainFrame.style.display = "none";
} else {
  authFrame.style.display = "none";
}
function getLoggedInUserFromLocalStorage() {
  let user = localStorage.getItem("loggedInUser");
  return JSON.parse(user);
}
function setLoggedInUserToLocalStorage(user) {
  localStorage.setItem("loggedInUser", JSON.stringify(user));
  return JSON.stringify(user);
}

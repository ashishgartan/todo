let frame2 = document.createElement("div");
frame2.style.display = "none";
frame2.classList = "border-2 border-purple-300 bg-purple-100";

let tasks = retrieveFromLocalStorage();
if (tasks == null) {
  tasks = [];
} else {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    addToFrame2(task.taskName, task.description);
  }
}
// [
// {
//  taskName:"Running",
// description:"I have to run at 5 am"
// },{}
// ]
let msgDiv = document.createElement("div");
msgDiv.innerText = "There is no task";
msgDiv.classList = "border-2 bg-red-300";
msgDiv.id = "msg-block";

let mainFrame = document.getElementById("main-frame");
let addButton = document.createElement("button");
addButton.innerText = "Add";
addButton.classList =
  "rounded-sm border-2 border-green-300 bg-green-500 h-10 w-20";
addButton.addEventListener("click", hideAndShow);

let showHideTasksButton = document.createElement("button");
showHideTasksButton.innerText = "Show";
showHideTasksButton.classList =
  "rounded-sm border-2 border-green-300 bg-green-500 h-10 w-20";
showHideTasksButton.addEventListener("click", showAndHideButton);

function showAndHideButton() {
  if (showHideTasksButton.innerText == "Show") {
    showHideTasksButton.innerText = "Hide";
  } else {
    showHideTasksButton.innerText = "Show";
  }
  hideAndShow();
}
// Frame1 work

let frame1 = document.createElement("div");
frame1.style.display = "block";
frame1.classList = "border-2 border-blue-300 bg-blue-100";

let input = document.createElement("input");
input.id = "input-data";
input.placeholder = "type task name....";
input.classList = "border-2 bg-red-200";
let description = document.createElement("textarea");
description.placeholder = "type task description...";
description.id = "description-data";
description.classList = "border-2 bg-yellow-200";
let addItemButton = document.createElement("button");
addItemButton.innerText = "Add Item";
addItemButton.classList =
  "rounded-sm border-2 border-green-300 bg-green-500 h-7 w-20";
addItemButton.addEventListener("click", () => {
  //add item
  let myinput = getInput();
  let mydescription = getDescription();
  if (myinput == "" || mydescription == "") {
    alert("enter informations to continue");
    return;
  }
  //show them in fram2
  addToFrame2(myinput, mydescription);
  if (showHideTasksButton.innerText == "Show") {
    showHideTasksButton.innerText = "Hide";
  } else {
    showHideTasksButton.innerText = "Show";
  }
  tasks.push({ taskName: myinput, description: mydescription });
  saveToLocalStorage(tasks);
  hideAndShow();
  console.log(tasks);
});

frame1.appendChild(input);
frame1.appendChild(description);
frame1.appendChild(addItemButton);

// Frame 2 work

// Main Frame work
mainFrame.appendChild(addButton);
mainFrame.appendChild(showHideTasksButton);
mainFrame.appendChild(frame1);
mainFrame.appendChild(frame2);

function hideAndShow() {
  if (frame1.style.display == "block") {
    console.log("1st if");
    frame1.style.display = "none";
    frame2.style.display = "block";
  } else if (frame2.style.display == "block") {
    console.log("2nd if");
    frame2.style.display = "none";
    frame1.style.display = "block";
  }
  // let msgBlock = document.getElementById("msg-block");
  let flag = false;
  if (tasks.length == 0) {
    frame2.appendChild(msgDiv);
    flag = true;
  } else {
    if (flag == true) {
      frame2.removeChild(msgDiv);
    }
  }
}
function getInput() {
  let myinput = document.getElementById("input-data");
  let result = myinput.value;
  myinput.value = "";
  return result;
}
function getDescription() {
  let mydescription = document.getElementById("description-data");
  let result = mydescription.value;
  mydescription.value = "";
  return result;
}

function addToFrame2(myinput, mydescription) {
  let mytask = document.createElement("div");
  let mydescriptionSize = mydescription.length;
  let heading = document.createElement("h2");
  heading.innerText = myinput;
  heading.classList = "border-2 bg-pink-100 m-1";

  let paragraph = document.createElement("p");
  paragraph.innerText = mydescription;
  paragraph.classList = "border-2 bg-pink-300 m-1 break-all truncate";
  let readMoreLessButton = document.createElement("button");
  if (mydescriptionSize >= 100) {
    readMoreLessButton.innerText = "Read More";
    readMoreLessButton.classList =
      "text-blue-600 underline underline-offset-2 text-sm";
    readMoreLessButton.addEventListener("click", () => {
      if (readMoreLessButton.innerText == "Read More") {
        readMoreLessButton.innerText = "Read Less";
      } else {
        readMoreLessButton.innerText = "Read More";
      }
      paragraph.classList.toggle("truncate");
    });
  }
  let date = document.createElement("p");
  let todayDate = new Date();
  date.innerText = todayDate;

  mytask.appendChild(heading);
  mytask.classList = "m-2 border-2";
  mytask.appendChild(paragraph);
  if (mydescriptionSize >= 100) {
    mytask.appendChild(readMoreLessButton);
  }
  mytask.appendChild(date);
  frame2.appendChild(mytask);
}

function saveToLocalStorage(tasks) {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}

function retrieveFromLocalStorage() {
  let tasksString = localStorage.getItem("tasks");
  let tasksArray = JSON.parse(tasksString);
  return tasksArray;
}

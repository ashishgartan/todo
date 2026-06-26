let frame2 = document.createElement("div");
frame2.style.display = "none";
frame2.classList = "border-2 border-purple-300 bg-purple-100 rounded-xl";

let msgDiv = document.createElement("div");
msgDiv.innerText = "There is no task";
msgDiv.classList = "border-2 bg-red-300 rounded-xl";
msgDiv.id = "msg-block";

let taskBox = document.createElement("div");
let searchBox = document.createElement("input");
searchBox.placeholder = "type something to search";
searchBox.classList = "bg-blue-200 border-1 rounded-sm";

let searchButton = document.createElement("button");
searchButton.innerText = "Search";
searchButton.classList = "bg-blue-600 border-1 rounded-sm";
searchButton.addEventListener("click", () => {
  let count = taskBox.childElementCount;
  console.log(count);
  let searchValue = searchBox.value;
  if (searchValue == "") {
    alert("empty search not allowed");
    return;
  }
  // for (let i = count - 1; i >= 0; i--) {
  //   taskBox.children[i].remove();
  // }
  taskBox.innerHTML = "";
  let svalue = searchValue.toLocaleLowerCase().trim();
  for (let i = 0; i < tasks.length; i++) {
    let taskName = tasks[i].taskName.toLowerCase().trim();
    if (taskName == svalue || taskName.includes(svalue)) {
      console.log("task found");
      addToFrame2(tasks[i], false);
    }
  }
  if (taskBox.childElementCount == 0) {
    taskBox.appendChild(msgDiv);
  }
});

frame2.appendChild(searchBox);
frame2.appendChild(searchButton);
frame2.appendChild(taskBox);

let tasks = retrieveFromLocalStorage();
if (tasks == null) {
  tasks = [];
} else {
  buildtask();
}
function buildtask() {
  for (let i = 0; i < tasks.length; i++) {
    addToFrame2(tasks[i], false);
  }
}
// [
// {
//  taskName:"Running",
// description:"I have to run at 5 am"
// },{}
// ]

let mainFrame = document.getElementById("main-frame");
let addButton = document.createElement("button");
addButton.innerText = "Add";
addButton.classList =
  "rounded-sm border-2 border-green-300 bg-green-500 h-10 w-20 rounded-xl";
addButton.addEventListener("click", hideAndShow);

let showHideTasksButton = document.createElement("button");
showHideTasksButton.innerText = "Show";
showHideTasksButton.classList =
  "rounded-sm border-2 border-green-300 bg-green-500 h-10 w-20 rounded-xl";
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
frame1.classList = "border-2 border-blue-300 bg-blue-100 rounded-xl";

let input = document.createElement("input");
input.id = "input-data";
input.placeholder = "type task name....";
input.classList = "border-2 bg-red-200 rounded-xl";
let description = document.createElement("textarea");
description.placeholder = "type task description...";
description.id = "description-data";
description.classList = "border-2 bg-yellow-200 rounded-xl";
let addItemButton = document.createElement("button");
addItemButton.innerText = "Add Item";
addItemButton.classList =
  "rounded-sm border-2 border-green-300 bg-green-500 h-7 w-20 rounded-xl";
addItemButton.addEventListener("click", () => {
  //add item
  let task = {};
  task["status"] = false;
  task["timeStamp"] = new Date().toLocaleString();
  //show them in fram2
  let id = new Date().getTime();
  task["taskId"] = id;
  task["taskName"] = getInput();
  task["description"] = getDescription();
  if (task.taskName == "" || task.description == "") {
    alert("enter informations to continue");
    return;
  }
  console.log(id);
  addToFrame2(task, true);
  if (showHideTasksButton.innerText == "Show") {
    showHideTasksButton.innerText = "Hide";
  } else {
    showHideTasksButton.innerText = "Show";
  }
  tasks.push(task);
  tasks.sort((task1, task2) => {
    return task2.taskId - task1.taskId;
  });
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
  taskBox.innerHTML = "";
  buildtask();
  if (frame1.style.display == "block") {
    console.log("1st if");
    frame1.style.display = "none";
    frame2.style.display = "block";
  } else if (frame2.style.display == "block") {
    console.log("2nd if");
    frame2.style.display = "none";
    frame1.style.display = "block";
  }

  if (tasks.length == 0) {
    if (frame2.contains(msgDiv) == false) {
      frame2.appendChild(msgDiv);
    }
    frame2.appendChild(msgDiv);
  } else {
    if (frame2.contains(msgDiv)) {
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

function addToFrame2(task, flag) {
  console.log(task.taskId);
  let mytask = document.createElement("div");
  let mydescriptionSize = task.description.length;
  let heading = document.createElement("h2");
  heading.innerText = task.taskName;
  heading.classList = "border-2 bg-pink-100 m-1 rounded-xl";

  let paragraph = document.createElement("p");
  paragraph.innerText = task.description;
  paragraph.classList =
    "border-2 bg-pink-300 m-1 break-all truncate rounded-xl";
  let readMoreLessButton = document.createElement("button");
  if (mydescriptionSize >= 100) {
    readMoreLessButton.innerText = "Read More";
    readMoreLessButton.classList =
      "text-blue-600 underline underline-offset-2 text-sm rounded-xl";
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
  let todayDate = task.timeStamp;
  date.innerText = todayDate;

  mytask.appendChild(heading);
  mytask.classList = "m-2 border-2 rounded-xl";
  mytask.appendChild(paragraph);
  if (mydescriptionSize >= 100) {
    mytask.appendChild(readMoreLessButton);
  }
  let status = document.createElement("button");
  status.innerText = "Done";
  status.classList = "bg-blue-200 border-2 m-1 rounded-xl";

  status.addEventListener("click", () => {
    console.log(task.taskId);
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId == task.taskId) {
        console.log("id matched", tasks[i].status);
        if (tasks[i].status == true) {
          tasks[i].status = false;
        } else {
          tasks[i].status = true;
        }
      }
    }
    saveToLocalStorage(tasks);
    mytask.classList.toggle("bg-yellow-500");
    if (status.innerText == "Done") {
      status.innerText = "UnDone";
    } else if (status.innerText == "UnDone") {
      status.innerText = "Done";
    }
    console.log("done clicked");
  });

  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList = "bg-yellow-200 border-2 m-1 rounded-xl";

  editButton.addEventListener("click", () => {
    console.log(task.taskId);
    saveButton.style.display = "block";
    editButton.style.display = "none";
    mytask.childNodes[0].remove();
    mytask.childNodes[0].remove();
    mytask.childNodes[0].remove();
    let newInput = document.createElement("input");
    newInput.value = task.taskName;
    newInput.classList = "bg-red-200 border-2 ";
    let newDescription = document.createElement("textarea");
    newDescription.value = task.description;
    newDescription.classList = "bg-yellow-200 border-2 ";
    mytask.prepend(newDescription);
    mytask.prepend(newInput);
    saveToLocalStorage(tasks);
  });

  let saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.classList = "bg-black text-white border-2 m-1 rounded-xl";
  saveButton.style.display = "none";
  saveButton.addEventListener("click", () => {
    console.log(task.taskId);
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId == task.taskId) {
        console.log("id matched", tasks[i].status);
        if (tasks[i].status == true) {
          tasks[i].status = false;
        } else {
          tasks[i].status = true;
        }
      }
    }
    saveToLocalStorage(tasks);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList = "bg-red-600 border-2 m-1 rounded-xl";

  deleteBtn.addEventListener("click", () => {
    console.log(task.taskId);
    let newArray = tasks.filter((t) => t.taskId != task.taskId);
    saveToLocalStorage(newArray);
    mytask.remove();
  });
  mytask.appendChild(date);
  mytask.appendChild(status);
  mytask.appendChild(editButton);
  mytask.appendChild(saveButton);
  mytask.appendChild(deleteBtn);
  if (flag) {
    taskBox.prepend(mytask);
  } else taskBox.appendChild(mytask);
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

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
    Swal.fire({
      title: "Error!",
      text: "Enter some value to search",
      icon: "error",
      confirmButtonText: "Cool",
    });
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
    Swal.fire({
      title: "Error!",
      text: "Enter Some infor continue",
      icon: "error",
      confirmButtonText: "Cool",
    });
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
  let icon1 =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>';
  let icon2 =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-check-icon lucide-check-check"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>';
  if (task.status == true) {
    status.innerHTML = icon2;
    mytask.classList.toggle("bg-yellow-500");
  } else {
    status.innerHTML = icon1;
    mytask.classList.toggle("bg-yellow-500");
  }
  status.classList = "bg-blue-200 border-2 m-1 rounded-full p-1";
  status.addEventListener("click", () => {
    console.log(task.taskId);
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].taskId == task.taskId) {
        console.log("id matched", tasks[i].status);
        if (tasks[i].status == true) {
          tasks[i].status = false;
          status.innerHTML = icon1;
        } else {
          tasks[i].status = true;
          status.innerHTML = icon2;
        }
      }
    }
    saveToLocalStorage(tasks);
    mytask.classList.toggle("bg-yellow-500");
    console.log("done clicked");
  });

  let editButton = document.createElement("button");
  editButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-sparkles-icon lucide-pencil-sparkles"><path d="M10 3H8"/><path d="m15.007 5.008 3.987 3.986"/><path d="M20 15v4"/><path d="M21.174 6.813a2.82 2.82 0 0 0-3.986-3.987L3.842 16.175a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M22 17h-4"/><path d="M4 5v4"/><path d="M6 7H2"/><path d="M9 2v2"/></svg>';
  editButton.classList = "bg-yellow-200 border-2 m-1 rounded-full  p-1";

  editButton.addEventListener("click", () => {
    console.log(task.taskId);
    saveButton.style.display = "inline";
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
  saveButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save-check-icon lucide-save-check"><path d="M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35"/><path d="m16 19 2 2 4-4"/><path d="M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>';
  saveButton.classList = "bg-black text-white border-2 m-1 rounded-full  p-1";
  saveButton.style.display = "none";
  saveButton.addEventListener("click", () => {
    console.log(task.taskId);
    let newTaskName = mytask.childNodes[0].value;
    let newDescription = mytask.childNodes[1].value;
    mytask.childNodes[0].remove();
    mytask.childNodes[0].remove();
    let newHeading = document.createElement("h2");
    newHeading.classList = "border-2 bg-pink-100 m-1 rounded-xl";
    newHeading.innerText = newTaskName;
    let newParagraph = document.createElement("p");
    newParagraph.classList =
      "border-2 bg-pink-300 m-1 break-all truncate rounded-xl";
    newParagraph.innerText = newDescription;
    mytask.prepend(newParagraph);
    mytask.prepend(newHeading);
    for (let i = 0; i < tasks.length; i++) {
      if (task["taskId"] == tasks[i].taskId) {
        tasks[i].taskName = newTaskName;
        tasks[i].description = newDescription;
        tasks[i].timeStamp = new Date().toLocaleString();
      }
    }
    saveToLocalStorage(tasks);
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
  deleteBtn.classList = "bg-red-600 border-2 m-1 rounded-full  p-1";

  deleteBtn.addEventListener("click", () => {
    console.log(task.taskId);
    let permission;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your Task has been deleted.",
          icon: "success",
        });
        let newArray = tasks.filter((t) => t.taskId != task.taskId);
        saveToLocalStorage(newArray);
        mytask.remove();
      }
    });
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

// let frame2 = document.createElement("div");
// frame2.style.display = "none";
// // IMPROVED: Unified card layout with white background, subtle shadow, and clean padding
// frame2.classList =
//   "border border-slate-200 bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-4";

// let msgDiv = document.createElement("div");
// msgDiv.innerText = "There is no task";
// // IMPROVED: Replaced heavy bg-red-300 with an elegant, modern alert style
// msgDiv.classList =
//   "p-4 text-center text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-xl";
// msgDiv.id = "msg-block";

// let taskBox = document.createElement("div");
// // IMPROVED: Added gap between task elements
// taskBox.classList = "flex flex-col gap-3 mt-2";

// // IMPROVED: Flex wrapper to make search box and button look cohesive together
// let searchWrapper = document.createElement("div");
// searchWrapper.classList = "flex gap-2 w-full";

// let searchBox = document.createElement("input");
// searchBox.placeholder = "Search tasks...";
// // IMPROVED: Modern text input styling with focus rings
// searchBox.classList =
//   "flex-1 px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";

// let searchButton = document.createElement("button");
// searchButton.innerText = "Search";
// // IMPROVED: Clean, flat primary button style
// searchButton.classList =
//   "px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl transition-all shadow-sm shadow-blue-100";
// searchButton.addEventListener("click", () => {
//   let count = taskBox.childElementCount;
//   console.log(count);
//   let searchValue = searchBox.value;
//   if (searchValue == "") {
//     Swal.fire({
//       title: "Error!",
//       text: "Enter some value to search",
//       icon: "error",
//       confirmButtonText: "Cool",
//     });
//     return;
//   }
//   taskBox.innerHTML = "";
//   let svalue = searchValue.toLocaleLowerCase().trim();
//   for (let i = 0; i < tasks.length; i++) {
//     let taskName = tasks[i].taskName.toLowerCase().trim();
//     if (taskName == svalue || taskName.includes(svalue)) {
//       console.log("task found");
//       addToFrame2(tasks[i], false);
//     }
//   }
//   if (taskBox.childElementCount == 0) {
//     taskBox.appendChild(msgDiv);
//   }
// });

// searchWrapper.appendChild(searchBox);
// searchWrapper.appendChild(searchButton);
// frame2.appendChild(searchWrapper);
// frame2.appendChild(taskBox);

// let tasks = retrieveFromLocalStorage();
// if (tasks == null) {
//   tasks = [];
// } else {
//   buildtask();
// }
// function buildtask() {
//   for (let i = 0; i < tasks.length; i++) {
//     addToFrame2(tasks[i], false);
//   }
// }

// let mainFrame = document.getElementById("main-frame");
// // IMPROVED: Container styling for the entire wrapper block
// mainFrame.classList =
//   "max-w-md mx-auto my-10 p-4 flex flex-col gap-4 font-sans antialiased text-slate-800";

// // IMPROVED: Added a top navigation bar container for Add/Show buttons
// let topNav = document.createElement("div");
// topNav.classList = "flex gap-3 justify-end mb-1";

// let addButton = document.createElement("button");
// addButton.innerText = "Add Task";
// // IMPROVED: Clean UI styling for header buttons
// addButton.classList =
//   "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 rounded-xl transition-all";
// addButton.addEventListener("click", hideAndShow);

// let showHideTasksButton = document.createElement("button");
// showHideTasksButton.innerText = "Show";
// showHideTasksButton.classList =
//   "px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-xl transition-all";
// showHideTasksButton.addEventListener("click", showAndHideButton);

// function showAndHideButton() {
//   if (showHideTasksButton.innerText == "Show") {
//     showHideTasksButton.innerText = "Hide";
//   } else {
//     showHideTasksButton.innerText = "Show";
//   }
//   hideAndShow();
// }

// // Frame1 work
// let frame1 = document.createElement("div");
// frame1.style.display = "block";
// // IMPROVED: Form layout container styling
// frame1.classList =
//   "border border-slate-200 bg-white p-6 rounded-2xl shadow-sm flex flex-col gap-4";

// let input = document.createElement("input");
// input.id = "input-data";
// input.placeholder = "Task title...";
// // IMPROVED: Clean structural spacing
// input.classList =
//   "px-4 py-2.5 text-base font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all";

// let description = document.createElement("textarea");
// description.placeholder = "Type task description...";
// description.id = "description-data";
// // IMPROVED: Fixed height, styling matching input field
// description.classList =
//   "px-4 py-3 h-28 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none transition-all";

// let addItemButton = document.createElement("button");
// addItemButton.innerText = "Save Task";
// // IMPROVED: Clean submission visual button styling
// addItemButton.classList =
//   "w-full py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] rounded-xl transition-all shadow-md shadow-emerald-100";
// addItemButton.addEventListener("click", () => {
//   let task = {};
//   task["status"] = false;
//   task["timeStamp"] = new Date().toLocaleString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//     month: "short",
//     day: "numeric",
//   });
//   let id = new Date().getTime();
//   task["taskId"] = id;
//   task["taskName"] = getInput();
//   task["description"] = getDescription();
//   if (task.taskName == "" || task.description == "") {
//     Swal.fire({
//       title: "Error!",
//       text: "Enter Some information to continue",
//       icon: "error",
//       confirmButtonText: "Cool",
//     });
//     return;
//   }
//   console.log(id);
//   addToFrame2(task, true);
//   if (showHideTasksButton.innerText == "Show") {
//     showHideTasksButton.innerText = "Hide";
//   } else {
//     showHideTasksButton.innerText = "Show";
//   }
//   tasks.push(task);
//   tasks.sort((task1, task2) => {
//     return task2.taskId - task1.taskId;
//   });
//   saveToLocalStorage(tasks);
//   hideAndShow();
//   console.log(tasks);
// });

// frame1.appendChild(input);
// frame1.appendChild(description);
// frame1.appendChild(addItemButton);

// // Layout assembly
// topNav.appendChild(addButton);
// topNav.appendChild(showHideTasksButton);
// mainFrame.appendChild(topNav);
// mainFrame.appendChild(frame1);
// mainFrame.appendChild(frame2);

// function hideAndShow() {
//   taskBox.innerHTML = "";
//   buildtask();
//   if (frame1.style.display == "block") {
//     console.log("1st if");
//     frame1.style.display = "none";
//     frame2.style.display = "block";
//   } else if (frame2.style.display == "block") {
//     console.log("2nd if");
//     frame2.style.display = "none";
//     frame1.style.display = "block";
//   }

//   if (tasks.length == 0) {
//     if (frame2.contains(msgDiv) == false) {
//       frame2.appendChild(msgDiv);
//     }
//     frame2.appendChild(msgDiv);
//   } else {
//     if (frame2.contains(msgDiv)) {
//       frame2.removeChild(msgDiv);
//     }
//   }
// }

// function getInput() {
//   let myinput = document.getElementById("input-data");
//   let result = myinput.value;
//   myinput.value = "";
//   return result;
// }
// function getDescription() {
//   let mydescription = document.getElementById("description-data");
//   let result = mydescription.value;
//   mydescription.value = "";
//   return result;
// }

// function addToFrame2(task, flag) {
//   console.log(task.taskId);
//   let mytask = document.createElement("div");
//   // IMPROVED: Unified minimalist clean card style for task item
//   mytask.classList =
//     "p-4 border border-slate-100 bg-slate-50/70 rounded-xl flex flex-col gap-2 relative group hover:shadow-md hover:border-slate-200 transition-all";

//   let mydescriptionSize = task.description.length;

//   let heading = document.createElement("h2");
//   heading.innerText = task.taskName;
//   // IMPROVED: Clear text hierarchy styling
//   heading.classList =
//     "text-base font-semibold text-slate-800 pr-24 break-words";

//   let paragraph = document.createElement("p");
//   paragraph.innerText = task.description;
//   // IMPROVED: Natural text lines spacing and text colors
//   paragraph.classList =
//     "text-sm text-slate-600 break-words leading-relaxed truncate";

//   let readMoreLessButton = document.createElement("button");
//   if (mydescriptionSize >= 100) {
//     readMoreLessButton.innerText = "Read More";
//     readMoreLessButton.classList =
//       "text-xs font-semibold text-blue-600 hover:text-blue-800 self-start mt-0.5 transition-colors";
//     readMoreLessButton.addEventListener("click", () => {
//       if (readMoreLessButton.innerText == "Read More") {
//         readMoreLessButton.innerText = "Read Less";
//       } else {
//         readMoreLessButton.innerText = "Read More";
//       }
//       paragraph.classList.toggle("truncate");
//     });
//   }

//   let date = document.createElement("p");
//   date.innerText = task.timeStamp;
//   // IMPROVED: Render timestamp neatly at the bottom right corner/footer of the card
//   date.classList = "text-[11px] text-slate-400 mt-1 font-medium";

//   mytask.appendChild(heading);
//   mytask.appendChild(paragraph);
//   if (mydescriptionSize >= 100) {
//     mytask.appendChild(readMoreLessButton);
//   }
//   mytask.appendChild(date);

//   // IMPROVED: Action items alignment bar grouped together at the top-right corner of each card
//   let actionBar = document.createElement("div");
//   actionBar.classList = "absolute top-3 right-3 flex items-center gap-1.5";

//   let status = document.createElement("button");
//   let icon1 =
//     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
//   let icon2 =
//     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/></svg>';

//   // IMPROVED: Beautiful minimal indicators instead of jarring layout styles
//   if (task.status == true) {
//     status.innerHTML = icon2;
//     status.classList =
//       "p-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors";
//     mytask.classList.add("border-l-4", "border-l-emerald-500", "opacity-75");
//   } else {
//     status.innerHTML = icon1;
//     status.classList =
//       "p-1.5 text-slate-400 bg-white border border-slate-200 rounded-lg hover:text-slate-600 hover:bg-slate-50 transition-colors";
//     mytask.classList.add("border-l-4", "border-l-blue-400");
//   }

//   status.addEventListener("click", () => {
//     console.log(task.taskId);
//     for (let i = 0; i < tasks.length; i++) {
//       if (tasks[i].taskId == task.taskId) {
//         if (tasks[i].status == true) {
//           tasks[i].status = false;
//           status.innerHTML = icon1;
//           status.className =
//             "p-1.5 text-slate-400 bg-white border border-slate-200 rounded-lg hover:text-slate-600 hover:bg-slate-50 transition-colors";
//           mytask.className =
//             "p-4 border border-slate-100 bg-slate-50/70 rounded-xl flex flex-col gap-2 relative group hover:shadow-md hover:border-slate-200 transition-all border-l-4 border-l-blue-400";
//         } else {
//           tasks[i].status = true;
//           status.innerHTML = icon2;
//           status.className =
//             "p-1.5 text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors";
//           mytask.className =
//             "p-4 border border-slate-100 bg-slate-50/70 rounded-xl flex flex-col gap-2 relative group hover:shadow-md hover:border-slate-200 transition-all border-l-4 border-l-emerald-500 opacity-75";
//         }
//       }
//     }
//     saveToLocalStorage(tasks);
//     console.log("done clicked");
//   });

//   let editButton = document.createElement("button");
//   editButton.innerHTML =
//     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
//   editButton.classList =
//     "p-1.5 text-slate-500 bg-white border border-slate-200 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-colors";

//   editButton.addEventListener("click", () => {
//     console.log(task.taskId);
//     saveButton.style.display = "inline-flex";
//     editButton.style.display = "none";
//     mytask.childNodes[0].remove();
//     mytask.childNodes[0].remove();
//     mytask.childNodes[0].remove();

//     let newInput = document.createElement("input");
//     newInput.value = task.taskName;
//     newInput.classList =
//       "w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1";

//     let newDescription = document.createElement("textarea");
//     newDescription.value = task.description;
//     newDescription.classList =
//       "w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-16";

//     mytask.prepend(newDescription);
//     mytask.prepend(newInput);
//     saveToLocalStorage(tasks);
//   });

//   let saveButton = document.createElement("button");
//   saveButton.innerHTML =
//     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>';
//   saveButton.classList =
//     "p-1.5 text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 transition-colors";
//   saveButton.style.display = "none";
//   saveButton.addEventListener("click", () => {
//     console.log(task.taskId);
//     let newTaskName = mytask.childNodes[0].value;
//     let newDescription = mytask.childNodes[1].value;
//     mytask.childNodes[0].remove();
//     mytask.childNodes[0].remove();

//     let newHeading = document.createElement("h2");
//     newHeading.classList =
//       "text-base font-semibold text-slate-800 pr-24 break-words";
//     newHeading.innerText = newTaskName;

//     let newParagraph = document.createElement("p");
//     newParagraph.classList =
//       "text-sm text-slate-600 break-words leading-relaxed truncate";
//     newParagraph.innerText = newDescription;

//     mytask.prepend(newParagraph);
//     mytask.prepend(newHeading);
//     for (let i = 0; i < tasks.length; i++) {
//       if (task["taskId"] == tasks[i].taskId) {
//         tasks[i].taskName = newTaskName;
//         tasks[i].description = newDescription;
//         tasks[i].timeStamp = new Date().toLocaleString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//           month: "short",
//           day: "numeric",
//         });
//         date.innerText = tasks[i].timeStamp;
//       }
//     }
//     saveButton.style.display = "none";
//     editButton.style.display = "inline-flex";
//     saveToLocalStorage(tasks);
//   });

//   let deleteBtn = document.createElement("button");
//   deleteBtn.innerHTML =
//     '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>';
//   deleteBtn.classList =
//     "p-1.5 text-slate-400 bg-white border border-slate-200 rounded-lg hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors";

//   deleteBtn.addEventListener("click", () => {
//     console.log(task.taskId);
//     let newArray = tasks.filter((t) => t.taskId != task.taskId);
//     saveToLocalStorage(newArray);
//     mytask.remove();
//   });

//   actionBar.appendChild(status);
//   actionBar.appendChild(editButton);
//   actionBar.appendChild(saveButton);
//   actionBar.appendChild(deleteBtn);
//   mytask.appendChild(actionBar);

//   if (flag) {
//     taskBox.prepend(mytask);
//   } else taskBox.appendChild(mytask);
// }

// function saveToLocalStorage(tasks) {
//   let tasksString = JSON.stringify(tasks);
//   localStorage.setItem("tasks", tasksString);
// }

// function retrieveFromLocalStorage() {
//   let tasksString = localStorage.getItem("tasks");
//   let tasksArray = JSON.parse(tasksString);
//   return tasksArray;
// }

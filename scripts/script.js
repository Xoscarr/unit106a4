let important = false;
let formVisible = true;

function toggleImportant() {
  if (!important) {
    $("#iImportant").removeClass("far").addClass("fas");
    important = true;
  } else {
    $("#iImportant").removeClass("fas").addClass("far");
    important = false;
  }
}

function saveTask() {
  console.log("Saving Task");

  //read values from the form
  let title = $("#txtTitle").val();
  let desc = $("#txtDescription").val();
  let date = $("#txtDate").val();
  let location = $("#txtLocation").val();
  let invitee = $("#txtInvitee").val();

  console.log(title, important, desc, date, location, invitee);

  //create a Task object
  let task = new Task(important, title, desc, date, location, invitee);
  //console log the object
  console.log(task);
  console.log(JSON.stringify(task));
  // send an http request to save the task on a server

  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks/",
    type: "POST",
    data: JSON.stringify(task), // parse/encode the object to a json string
    contentType: "application/json",

    success: function (res) {
      console.log("Server response", res);
      displayTask(JSON.parse(res));
      clearForm();
    },
    error: function (error) {
      console.log("error", error);
      //show us an error
    },
  });
}
/**
 * create displayTask function
 * that recieves task object
 * and console logs the tile of the recieved task
 */

function displayTask(task) {
  console.log(task.title);

  let syntax = `
  <div id="${task._id}" class="task"> 
            <i class="far fa-star"></i>
            <div class="inner-task">
                <div class="title">
                    <h5><b>${task.title}</b></h5>
                </div>
                <div class="description">
                    <p>${task.description}</p>
                </div>
                <div class="date">
                    <p>${task.date}</p>
                </div>
                <div class="invitees">
                    <p>${task.invitee}</p>
                </div>
                <div class="location"><label class="location">${task.location}</label></div>
            </div>
            <button onclick="markDone('${task._id}')" class="btn btn-sm btn-info"> Done </button>
        </div>`;

  $("#pendingList").append(syntax);
}
function markDone(id) {
  console.log("task complete!", id);
  //find the div with the id
  $("#" + id).remove();
}

function clearForm() {
  $("#txtTitle").val("");
  $("#txtDescription").val("");
  $("#txtDate").val("");
  $("#txtLocation").val("");
  $("#txtInvitee").val("");
}

function toggleForm() {
  if (formVisible) {
    $("#section-form").slideUp(300);
    formVisible = false;
  } else {
    $("#section-form").slideDown(300);
    formVisible = true;
  }
  // hide #section-form
}
function retrieveTasks() {
  //create a get request to "https://fsdiapi.azurewebsites.net/api/tasks/"
  $.ajax({
    type: "GET",
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    success: function (res) {
      console.log("Data", res);
      let data = JSON.parse(res); // parse json string into objects
      for (let i = 0; i < data.length; i++) {
        let task = data[i];
        console.log(task.name);
        // if the name is equal to your name
        if (task.name == "Oscar") {
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.log("Error", err);
    },
  });

  // console log the response from the server
}

function init() {
  console.log("task manager");

  // load data
  retrieveTasks();

  // hook events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(saveTask);
  $("#btnTasks").click(toggleForm);
}

window.onload = init;

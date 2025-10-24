#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const tasksStatus = ["todo", "in-progress", "done"];
const commands = ["add", "update", "delete", "list"];

const filePath = path.join(__dirname, "tasks.json");

function loadTasks() {
  try {
    const tasks = fs.readFileSync(filePath, { encoding: "utf8" });
    return JSON.parse(tasks);
  } catch (error) {
    return [];
  }
}

function addTasks(task) {
  try {
    const tasks = loadTasks();
    const taskObject = {
      id: (tasks?.length ?? 0) + 1,
      description: task,
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks.push(taskObject);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    console.log(
      `✅ Task '${task}' has been added to your task list successfully!`
    );
  } catch (error) {
    console.log("❌ Failed to add the task. Please try again.");
  }
}

function updateTask(id, status) {
  try {
    const tasks = loadTasks();
    let found = false;
    const updatedTasks = tasks.map((task) => {
      if (task.id === Number(id)) {
        found = true;
        return {
          ...task,
          status,
          updatedAt: new Date().toISOString(),
        };
      }
      return task;
    });
    if (found) {
      fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2));
      console.log(`✅ Task with ID '${id}' has been updated successfully!`);
    } else {
      console.log(`❌ Task with ID '${id}' not found.`);
    }
  } catch (error) {
    console.log("❌ Failed to update the task. Please try again.");
  }
}
function deleteTask(id) {
  try {
    const tasks = loadTasks();
    const filteredTasks = tasks.filter((task) => task.id !== Number(id));
    if (tasks.length === filteredTasks.length) {
      console.log(`❌ Task with ID '${id}' not found.`);
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(filteredTasks, null, 2));
    console.log(`✅ Task with ID '${id}' has been deleted successfully!`);
  } catch (error) {
    console.log("❌ Failed to delete the task. Please try again.");
  }
}

const argv = process.argv.slice(2);
const command = argv[0];
if (!commands.includes(command)) {
  console.log(
    "Invalid command. Please use 'add', 'update', 'delete', or 'list'."
  );
  process.exit(1);
}
const taskStatus =
  argv.length > 1 && !!tasksStatus.indexOf(argv[1]) ? argv[1] : null;

switch (command) {
  case "list":
    const tasks = loadTasks();
    if (!tasks.length) {
      console.log("The task list is empty ☹️. Please add some tasks first!");
      break;
    }
    if (taskStatus) {
      const filteredTasks = tasks
        .filter((task) => task.status === taskStatus)
        .map((item) => console.log(item));
      if (!filteredTasks.length) {
        console.log(
          `No tasks found with status '${taskStatus}' ☹️. Please add some tasks with this status first!`
        );
        break;
      }
    } else {
      tasks.map((item) => console.log(item));
    }
    break;

  case "add":
    const task = argv?.[1];
    if (!task) {
      console.log("Please provide a valid taks to add to your list!");
      break;
    }
    addTasks(task);
    break;

  case "update":
    const updateId = argv?.[1];
    const status = argv?.[2];
    if (!updateId || !status || !tasksStatus.includes(status)) {
      console.log(
        "Please provide a valid task ID and status to update your task!"
      );
      break;
    }
    updateTask(updateId, status);
    break;

  case "delete":
    const deleteId = argv?.[1];
    if (!deleteId) {
      console.log("Please provide a valid task ID to delete your task!");
      break;
    }
    deleteTask(deleteId);
    break;

  default:
    console.log(`
Usage
todo add        // to add a new task
todo list       // to list all your tasks    
todo list <status> // to list tasks with specific status (todo, in-progress, done)
todo update <task_id> <status>  // to update a task status
todo delete <task_id>  // to delete a task
  `);
    break;
}

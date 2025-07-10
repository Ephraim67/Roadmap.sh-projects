import {
  addTask,
  listTasks,
  updateTask,
  deleteTask,
  markInProgress,
  markDone
} from "./index.js";

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

const args = process.argv.slice(2);

(async () => {
  if (args[0] === "add") {
    const taskDescription = args.slice(1).join(" ");
    if (!taskDescription) {
      console.log(`${colors.red}Please provide a task description.${colors.reset}`);
      console.log(`${colors.yellow}Sample: node index.js add "Drink Water"${colors.reset}`);
    } else {
      await addTask(taskDescription);
    }
  } else if (args[0] === "list") {
    const status = args[1];
    await listTasks(status);
  } else if (args[0] === "update") {
    const id = args[1];
    const newStatus = args[2];
    if (!id || !newStatus) {
      console.log(`${colors.red}Please provide a task ID and new status.${colors.reset}`);
      console.log(`${colors.yellow}Sample: node index.js update 1 done${colors.reset}`);
    } else {
      await updateTask(id, newStatus);
    }
  } else if (args[0] === "delete") {
    const id = args[1];
    if (!id) {
      console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
      console.log(`${colors.yellow}Sample: node index.js delete 1${colors.reset}`);
    } else {
      await deleteTask(id);
    }
  } else if (args[0] === "mark-in-progress") {
    const id = args[1];
    if (!id) {
      console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
      console.log(`${colors.yellow}Sample: node index.js mark-in-progress 1${colors.reset}`);
    } else {
      await markInProgress(id);
    }
  } else if (args[0] === "mark-done") {
    const id = args[1];
    if (!id) {
      console.log(`${colors.red}Please provide a task ID.${colors.reset}`);
      console.log(`${colors.yellow}Sample: node index.js mark-done 1${colors.reset}`);
    } else {
      await markDone(id);
    }
  } else {
    console.log(`${colors.cyan}Usage: node cli.js <command> [arguments]${colors.reset}`);
    console.log(`${colors.cyan}Commands:${colors.reset}`);
    console.log(`${colors.yellow}  add <task description>            - Add a new task${colors.reset}`);
    console.log(`${colors.yellow}  list [status]                     - List tasks (status: done, todo, in-progress)${colors.reset}`);
    console.log(`${colors.yellow}  update <id> <new-status>          - Update a task's status by ID${colors.reset}`);
    console.log(`${colors.yellow}  delete <id>                       - Delete a task by ID${colors.reset}`);
    console.log(`${colors.yellow}  mark-in-progress <id>             - Mark a task as in-progress by ID${colors.reset}`);
    console.log(`${colors.yellow}  mark-done <id>                    - Mark a task as done by ID${colors.reset}`);
  }
})();

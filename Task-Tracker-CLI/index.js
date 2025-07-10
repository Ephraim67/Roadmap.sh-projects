import { promises as fs } from 'fs';

const filePath = 'tasks.json';
const VALID_STATUSES = ['todo', 'done', 'in-progress'];

// Function to read tasks from the file
async function readTasks() {
    try {
        await fs.access(filePath);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

// Function to write tasks to the file
async function writeTasks(tasks) {
    try {
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    } catch (e) {
        console.error('Error writing tasks:', e);
    }
}

// Function to get the next unique ID for a task
function getNextID(tasks) {
    const ids = tasks.map(task => Number(task.id));
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

// Function to list tasks by status
async function listTasks(status) {
    const tasks = await readTasks();

    let filteredTasks = tasks;

    if (status) {
        filteredTasks = tasks.filter(
            task => task.status.toLowerCase() === status.toLowerCase()
        );
    }

    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
    } else {
        console.log(
            status
                ? `Tasks with status "${status}":`
                : 'All tasks:'
        );

        filteredTasks.forEach((task, index) => {
            console.log(
                `${index + 1}. [${task.status}] ${task.title}`
            );
        });
    }
}

// Function to add a new task
async function addTask(description) {
    const tasks = await readTasks();
    const newTask = {
        id: getNextID(tasks),
        title: description,
        status: 'todo'
    };
    tasks.push(newTask);
    await writeTasks(tasks);

    console.log('Task added:', newTask);
}

// Function to update a task's status
async function updateTask(id, status) {
    if (!VALID_STATUSES.includes(status.toLowerCase())) {
        console.log(`Invalid status. Valid options: ${VALID_STATUSES.join(', ')}`);
        return;
    }

    const tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    tasks[taskIndex].status = status.toLowerCase();
    await writeTasks(tasks);

    console.log(`Task ${id} updated to status "${status}".`);
}

// Function to delete a task
async function deleteTask(id) {
    let tasks = await readTasks();
    const taskIndex = tasks.findIndex(task => task.id === Number(id));

    if (taskIndex === -1) {
        console.log(`Task with ID ${id} not found.`);
        return;
    }

    tasks = tasks.filter(task => task.id !== Number(id));
    await writeTasks(tasks);

    console.log(`Task ${id} deleted.`);
}

// Function to mark a task as in progress
async function markInProgress(id) {
    await updateTask(id, 'in-progress');
}

// Function to mark a task as done
async function markDone(id) {
    await updateTask(id, 'done');
}

export {
    readTasks,
    writeTasks,
    listTasks,
    addTask,
    updateTask,
    deleteTask,
    markInProgress,
    markDone
};

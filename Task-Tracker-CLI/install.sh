Setting up Task Tracker CLI...

1. Create projects directory
mkdir -p ~/.task-tracker/projects
cd ~/.task-tracker/projects

2. Initialize package.json
npm init -y

3. Install necessary packages
npm install yargs uuid chalk

yargs: A command-line argument parser for Node.js.
uuid: A library to generate unique identifiers.
chalk: A library to style terminal strings.

4. Create main script file
touch index.js

5. Create an empty json to store tasks
ech "[]" > tasks.json


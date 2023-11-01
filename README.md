![Logo](https://www.cpne.ch/wp-content/uploads/2020/06/CPNE_logo_RVB_150.jpg)

# [Ex N°7 - React To Do List ]

This project is a simple todoList that permits you to add, delete and complete tasks in real time with an ExpressJS backend and a JSON file for storage.

## Lessons Learned

- Create a backend with ExpressJS
- Dynamic routing with ExpressJS
- UseEffect in React
- Fetch data in React
- Use of axios
- Understanding the base of async/await

## Tech Stack

**Client:** React

**Server:** Node, ExpressJS

## Installation

Install the react project with npm

```bash
  cd .\todolist\
  npm install
  npm start
```

Open another terminal in the root of the project and do the following steps to run the backend ExpressJS :

```bash
  cd .\NodeServer\
  npm install
  node app.js
```

## Build

To build the react project run

```bash
  cd todolist\
  npm run build
```

## Author

- Ricardo

## Appendix

**ModalContent - Component parameters :**

- onClose : Function to close the modal
- text : Text to show in modal
- type : Type of modal (error, success), css on ./src/pages/ToDoList/App.css

**ExpressJS - Methods**

- GET /tasks - Fetch all tasks
- PPOST /tasks - Add a tasks. JSON format {"name" : "x", "completed" : false}
- POST /tasks/:name/complete - Complete the task
- DELETE /tasks/:name - Delete the task

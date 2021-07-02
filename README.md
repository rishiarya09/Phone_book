# PhoneBook

Phone book is a single page web application used to maintain the contacts of the users. It is developed using the node js backend. and Angular front-end.
Rest API has been used to get, create, delete and update the contacts.

Below are the screenshots of the application front end.
![screenshot](https://github.com/rishiarya09/Phone_book/blob/main/repo1.PNG)

![screenshot](https://github.com/rishiarya09/Phone_book/blob/main/repo2.PNG)

## Requirements

Requirement to install the application:
  Node js any version should be pre installed.
  Angular latest version
  mongo db

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---
### Angular Installation

    You can find how to install and use the application in the frontend folder 
---

### Mongo db
- ### Mongo in windows
    DOwnload mongo db from the [Mogdb](https://www.mongodb.com/try/download/community?tck=docs_server) here.
    just install the msi file it wil automatically install everything.

- ### Mongo in linux
   Follow this documentaion [documentaion](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) to install in ubuntu.
---
### Install the application
- ## Backend
    $ git clone https://github.com/rishiarya09/Phone_book
    $ cd backend
    $ npm install
- ## Frontend
    $ cd front-end
    $npm install
Above instructions will install node modules in the respective folders.

## Running the project
- ## First step
    $ cd backend
    $ npm start
- ## second step
    $ cd front-end
    $ ng serve --open
this should open automatically in http://localhost:4200/

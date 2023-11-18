# Contact Database Using Node.js and MongoDB

A simple application for storing and displaying contacts using Node.js and MongoDB. You can register/login with your email/password.

[How to run](#how-to-run-the-project),

[How to run for beginners](#how-to-run-the-project-for-beginners),

[Config with .env](#configuration-with-env),

[Usage examples](#usage),

[Docker Setup](#docker-setup)

## Setup

To run this project locally, follow these steps:

1. Install [Node.js](https://nodejs.org/) LTS version if you haven't already.

2. Install [MongoDB](https://www.mongodb.com/try/download/community) if you haven't already.

3. Clone this project from the GitHub repository:
   [HTTP](https://github.com/pawelszopinski/nodejs-homework.git),
   [SSH](git@github.com:pawelszopinski/nodejs-homework.git)

4. Navigate to the project directory and install the dependencies:
   npm install

## How to Run the Project

To run the project, follow these steps:

1. Start the Node.js server by entering the following command in the project directory:
   npm start

2. ### Configuration with .env

To get started, you can create your own `.env` file. You can use the provided `.env.example` as a template:

Here is an example of what your `.env` file might look like:

```plaintext
PORT= 3000
USER= your_username
PASSWORD= your_password
hostDB= your_database_host
dbName= your_database_name
SECRET= your_another_password
```

## How to Run the Project for beginners

1. Web Browser: You can use a web browser to make requests to your API. Enter the URL in your browser, e.g., [http://localhost:3000/api/contacts], to send a GET request and view the response.

2. curl: It's a command-line tool that allows you to make HTTP requests. You can use curl to test various HTTP methods. For example (GET request)

   `curl http://localhost:3000/api/contacts`

3. JavaScript/Node.js: You can write a simple JavaScript or Node.js script that uses the axios or node-fetch module to make HTTP requests and test your API. Here's an example using Node.js with axios:

```javascript
const axios = require('axios');
<!-- // GET request -->
axios.get('http://localhost:3000/api/contacts')
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error(error);
});
```

## Usage

[Register/Login](#registerlogin)

[List of contacts](#retrieve-all-contacts-get)

[Contact by ID](#retrieve-a-contact-by-id-get)

[Create a new contact](#create-a-new-contact-post)

[Update a contact](#update-a-contact-put)

[Update contact's Favorite Status](#update-contacts-favorite-status-patch)

[Delete a contact](#delete-a-contact-delete)

### Register/Login

[Register]((http://localhost:3000/api/users/signup))

[Login]((http://localhost:3000/api/users/login))

Place email and password in the req body.

Below are examples of how to interact with the contact database using various HTTP methods. Make sure to replace {contactId} with the actual ID of the contact you want to retrieve, update, or delete.

### Retrieve All Contacts (GET)

To retrieve a list of all contacts, use the following endpoint:

GET /api/contacts
[Back to list of methods](#usage)

### Retrieve a Contact by ID (GET)

To retrieve a single contact by its ID, use the following endpoint:

GET /api/contacts/{contactId}
[Back to list of methods](#usage)

### Create a New Contact (POST)

To create a new contact, use the following endpoint with a JSON payload containing the contact details:

POST /api/contacts

**Example JSON payload:**

{
"name": "John Doe",
"email": "<johndoe@example.com>",
"phone": "+1234567890"
}
[Back to list of methods](#usage)

### Update a Contact (PUT)

To update an existing contact, use the following endpoint with the contact's ID and a JSON payload containing the updated contact details:

PUT /api/contacts/{contactId}

**Example JSON payload:**

{
"name": "Updated Name",
"email": "<updated@example.com>",
"phone": "+9876543210"
}
[Back to list of methods](#usage)

### Update Contact's Favorite Status (PATCH)

To update a contact's favorite status, use the following endpoint with the contact's ID and a JSON payload specifying the new favorite status:

PATCH /api/contacts/{contactId}/favorite

**Example JSON payload to set as favorite:**

{
"favorite": true
}
[Back to list of methods](#usage)

### Delete a Contact (DELETE)

To delete a contact, use the following endpoint with the contact's ID:

DELETE /api/contacts/{contactId}
[Back to list of methods](#usage)
[Back to the top](#contact-database-using-nodejs-and-mongodb)

## Docker Setup

This project can be easily containerized using Docker. Follow the steps below to run the application in a Docker container.

### Prerequisites

Make sure you have Docker installed on your machine. If you don't have it installed, you can download it from [Docker's official website](https://www.docker.com/get-started).

### Build Docker Image

Navigate to the project directory in your terminal and run the following command to build the Docker image:

```bash
docker build -t nodejs-homework-server 

```

### Run Docker Container

After successfully building the Docker image, you can run the Docker container using the following command:

```bash
docker-compose up

```

This command uses the docker-compose.yml file, which should be present in your project directory. If it's not, make sure to create one with the necessary configurations.

[Back to the top](#contact-database-using-nodejs-and-mongodb)

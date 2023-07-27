# React Contacts App with React Router v6.4 API

[Project Link](https://main--melodious-alpaca-0ee727.netlify.app/)

This repository contains a React contacts application that utilizes React Router v6.4 for client-side routing. The app integrates with a RESTful API to perform CRUD (Create, Read, Update, Delete) operations on contacts. It also includes a search functionality using search parameters to efficiently find specific contacts.

It is the frontend part of a fullstack app, MERN stack, [link to backend repo](https://github.com/oolaoluwatobi/backend-contact-app-mern)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Client-Side Routing with React Router v6.4](#client-side-routing-with-react-router-v6.4)
- [RESTful API Endpoints](#restful-api-endpoints)
- [Search Functionality using Serach Parameters](#search-functionality-using-search-parameters)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The React contacts app is designed to manage a list of contacts using modern React practices. It utilizes React Router v6.4 for smooth client-side routing. The app integrates with a RESTful API that provides endpoints to perform CRUD operations on contacts.

## Features

- Client-side routing with React Router v6.4
- RESTful API endpoints for contact management
- Create, update, and delete contacts
- Search functionality using search parameters

## Installation

Follow these steps to set up and run the backend locally:

1. Clone the repository:

```bash
git clone https://github.com/oolaoluwatobi/contatcts-app-mern-client.git
```

2. Change into the project directory:

```bash
cd contatcts-app-mern-client
```

3. Install the required dependencies:
```bash
npm install
```

## Usage

To start the backend server, use the following command:

```bash
npm start
```

The server will start running on `http://localhost:3000`

## Client-Side Routing with React Router v6.4

React Router v6.4 provides smooth client-side routing in the contacts app. It enables declarative route definitions and renders components based on the current URL.

```bash
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      ...
      <Route path="/" element={<ContactsList />} />
      <Route path="/contact/:id" element={<ContactDetail />} />
      <Route path="/create" element={<CreateContact />} />
      <Route path="/edit/:id" element={<EditContact />} />
      <Route path="*" element={<NotFound />} />
      ...

    </Route>
  );

function App() {
  return <RouterProvider router={router} />;
}

```

In the above example, each route corresponds to a specific component to be rendered when the URL matches the defined path.

##  RESTful API Endpoints

The app interacts with a RESTful API to manage contacts. Some of the API endpoints include:

- Fetch all subscribers/contacts: `GET /` or `GET /subscribers`
- Fetch a single subscriber: `GET /subscribers/:id`
- Create a new subscriber/contact: `POST /subscribers`
- Update an existing subscriber/contact: `PUT /subscribers/:id`
- Delete a contact `DELETE /subscribers/:id`

Please refer to the source code in the [backend repo](https://github.com/oolaoluwatobi/backend-contact-app-mern) for a complete list of available endpoints and their functionalities.

## Search Functionality using Search Parameters

The app includes a search functionality using search parameters. Users can search for specific subscribers/contacts using thier Firstname. The app will display matching contacts accordingly.

## Contributing

We welcome contributions from the community! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

Thank you for using this Node.js, Express.js, and MongoDB backend with MVC pattern! I hope this implementation of JWT authentication, protected routes, and RESTful API endpoints serves as a helpful reference for your projects. Happy coding!
## Screenshots

![App Screenshot](https://github.com/oolaoluwatobi/contatcts-app-mern-client/blob/main/public/contacts%20app%20home%202023-07-27%20092338.png)
![App Screenshot](https://github.com/oolaoluwatobi/contatcts-app-mern-client/blob/main/public/single%20contact%202023-07-27%20092501.png)
![App Screenshot](https://github.com/oolaoluwatobi/contatcts-app-mern-client/blob/main/public/edit%20contact%202023-07-27%20092549.png)
![App Screenshot](https://github.com/oolaoluwatobi/contatcts-app-mern-client/blob/main/public/new%20contact%202023-07-27%20092644.png)


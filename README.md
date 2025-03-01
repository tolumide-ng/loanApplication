# Big Loan Application

## Table of Content

- [About this Application](#about-this-application)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [General](#general)
- [How does the application work](#how-does-the-application-work)
- [Running this application locally and testing](#running-this-application-locally-and-testing)
  - [Using Docker Compose](#using-docker-compose)
    - [Prerequisites](#prerequisites)
    - [Start the Application locally](#using-docker-compose-start-the-application-locally)
    - [Shutting down the Application](#using-docker-compose-shutting-down-the-application)
  - [Using npm](#using-npm)
    - [Prerequisites](#prerequisites-1)
    - [Run the Application's Unit tests](#using-npm-run-the-applications-unit-tests)
    - [Start the Application locally](#using-npm-start-the-application-locally)
    - [Shutdown the Application](#using-npm-shutdown-the-application)
  - [Some Decisions made](#some-decision-made)
  - [TroubleShooting](#troubleshooting)
  - [Recording](#recording)

## About this Application

The application focuses on the following key principles:

- **Accessibility(Respsonsiveness)**: The application is designed to be user-friendly across devices, making navigation and interaction seamless on both mobile and desktop platforms
- **Modularity**: Embraces the Atomic Design Pattern
- **Testability**: Enables robust and efficient testing to ensure reliability and quality
- **Performance**: Optimizes performance by loading resources only when needed, reducing initial load times
- **Clean Code**: Writing maintainable, readable, and efficient code for better collaboration and future updates.
- **Scalability**
- **Error Handling**

### Frontend

- This project evaluates the eligibility of users for Loan Application
- It collects private data such as firstName, lastName, date of Birth, monthly Salary etc, to evaluate the users eligibility for the loan they're applying
- It also provides detailed information where possible when the input data provided by the user is invalid
- In an occasion where a user misplaces mistakenly refreshes there browser, the application reloads the form using the initially provided data so the user doesn't have to waste time anymore
- Application users can always restart the loan application at any point in the process by using the `Restart Loan Application` Button on the bottom of the application

### Backend

- The Application uses a prebuilt fastify backend

### General

- This application is accessible on all types of devices (mobile and desktop)
- This project uses the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/) for it's component structure
- It is built with:

  - [React v18.3.1](https://reactjs.org/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Docker](https://docs.docker.com/compose/install/)
  - [Axios](https://www.npmjs.com/package/axios) for Handling Network requests
  - Styled with [ChakraUI](https://v2.chakra-ui.com/) which depends on emotion, framer-motion
  - Scaffolded with [CreateVite](https://www.npmjs.com/package/create-vite)
  - Manages the Created forms with [React-Hook-form](https://react-hook-form.com/)
  - Bundled with [Vite](https://www.npmjs.com/package/vite)
  - Handles Form Validation using [Zod](https://zod.dev/)

- The application is tested (Unit tests) using:
  - [Jest](https://jestjs.io/) and,
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## How Does the application work

As mentioned earlier, this application determines the eligibility of users based on their provided information for loan Application. It works well on Mobile and Desktop devices.

<br />
<br />

> [!NOTE] Please ensure that port `4000` and port `3000` are free and available for use on your machine as these are the ports used in this application
>
> - Port 4000: Frontend
> - Port 3000: Backend

## Running this application locally and testing

1. Open your workspace terminal
2. Clone this repository
3. Cd into the cloned repository
4. There are two ways you can start or test this application locally:

### Using Docker Compose:

#### Prerequisites:

1.  [Docker](https://docs.docker.com/get-docker/)
2.  [Docker Compose](https://docs.docker.com/compose/install/)

#### Using Docker Compose: Start the Application locally

1. To start the application with docker-compose, simply run (on MacOS):

```
docker-compose up
```

1. To start the application with docker-compose, simply run (on Ubuntu):

```
sudo docker compose up
```

Visit [`localhost:4000`](localhost:4000) on your favourite browser to view the application

#### Using Docker Compose: Shutting down the Application

1. Press `Cmd + C` on a MacOS or `Ctrl+ C` on Ubuntu to stop the application
2. Run (on MacOS):

```
docker-compose down
```

2. Run (on Ubuntu):

```
sudo docker compose down
```

### Using npm:

#### Prerequisites:

1. [Node](https://nodejs.org/en/) at least v21.7.3
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### Using npm: Run the Application's Unit tests

1. Install the dependencies with:

```
npm install
```

2. Run the tests with:

```
npm test
```

#### Using npm: Start the Application locally

1. Install the dependencies with:

```
npm install
```

2. Start the application with:

```
npm start
```

Visit [`localhost:4000`](localhost:4000) on your favourite browser to view the application

#### Using npm: Shutdown the Application

1. Press `Cmd + C` on MacOs or `Ctrl + C` on Ubuntu to stop the application

## Some Decision Made

- The backend (API_URL) was intentionally exposed on this application to make the access easier in one command without having to set up any config which might introduce an inconvience for users
  - In a Production application, this would be stored and accessed using secret management tools like a `.env` file

## TroubleShooting:

1. Be sure to confirm that you do not have another project running on [`port 3000`](localhost:3000) and [`port 4000`](localhost:4000) before running this application

```
Error: EACCES: Permission denied, mkdir '/<file_path>
```

Solution:

- Run `rm -rf node_modules` in the repository and then `npm install` again
  Why did that happen?: Well, it's possible that you had ran `docker-compose` earlier

## Recording

1. [Desktop Screens](./public/DesktopScreens.mp4)
2. [Mobile Screens](./public/mobileScreens.mp4)

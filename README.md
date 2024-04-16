<img src="/frontend/src/assets/logo.png" alt="EventHub logo" title="EventHub" align="right" height="80" />

# EventHubV2 <br/>
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Table of Contents

- [Project Details](#project-details)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Contributions](#contributions)
- [License](#license)

## Project Details

EventHubV2 is a web application designed for simplified and smooth management and organization of events. Users can sign up seamlessly and start creating or registering for events.
Cut the hassle with **EventHub - Elevating Occasions, Creating Connections**.

_Made for NUS' IS3106 - Enterprise Systems Interface Design and Development._

<sup>*This is the second version of the EventHub project, which was originally built using Java EE and PrimeFaces. The EventHubV2 project has been revamped to use the MERN (MongoDB, Express, React, Node.js) stack, providing a more modern and visually appealing user interface.</sup>

## Tech Stack
This project utilizes the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js. Below is a brief overview of each technology:

- **MongoDB:** NoSQL database used for storing and managing data in a flexible, schema-less format. It is employed in this project to persistently store user data, application configurations, and other relevant information.
  
- **Express.js:** A minimalist web framework for Node.js that simplifies the process of building robust web applications and APIs. In this project, Express.js is used to create the backend server, handle HTTP requests, and define the application's routing logic.
  
- **React.js:** A JavaScript library for building user interfaces, particularly single-page applications (SPAs). The frontend of this app is built using React.js to deliver an interactive and responsive user experience.
  
- **Node.js:** JavaScript runtime environment that allows developers to run JavaScript code on the server-side. In this project, Node.js is used to run the backend server, interact with the database, and handle business logic.

## Features
EventHub is designed with the user in mind, prioritizing essential functions while streamlining the user experience. This approach enables users to easily navigate events, engage with peers, and efficiently handle their event-related tasks.

- **User Authentication and Registration**: Ensures secure access for users by verifying their identity and allowing them to create accounts.
  
- **Edit Profile**: Allows users to modify their personal information and preferences.
  
- **Browse Upcoming Events**: Provides users with a convenient way to explore events scheduled for the future.
  
- **View Event Details**: Offers comprehensive information about each event, including its date, time, location, registration deadline, and description.
  
- **Register/Unregister from Event**: Allows users to sign up for or cancel their registration to specific events.
  
- **Create New Event**: Empowers users to organize and announce their own events within the platform.
  
- **Take Attendance for Event**: Facilitates the tracking of attendees and their participation in events.

## Additional Features
Apart from the previously mentioned base features, this version of EventHub provides some additional features:

- **Real-Time updates**: EventHub provides dynamic updates such that it will show popups when there are new events to be found on your homepage and updates to your event status without needing to refresh the page.

- **Data Security**: To ensure the security of sensitive information such as user passwords and other confidential data, the application employs hashing algorithms to maintain data integrity and confidentiality within the system.

## Installation
1. Ensure that you have [Node.js](https://nodejs.org/en) installed, and that you have a [MongoDB Atlas](https://www.mongodb.com/atlas/database) and [Cloudinary](https://cloudinary.com/) account set up.
2.	Clone the repository to your local machine.
```bash
git clone https://github.com/tristantanjh/EventHubV2.git
```
3.	Create a `.env` file in both the frontend and backend folders.
  - In the backend `.env` file, specify your port for hosting the backend server and your mongoDB Atlas database url like this:
```bash
PORT=<YOUR_PORT>
DATABASE_URL=<YOUR_DATABASE_URL>
```
  - In the frontend `.env` file, specify your Cloudinary cloud name and upload preset like this:
```bash
VITE_CLOUDNAME=<YOUR_CLOUD_NAME>
VITE_UPLOADPRESET=<YOUR_UPLOAD_PRESET>
```
4.	`cd` into both frontend and backend folders and run `npm i` on both.
5.	After these steps, do `npm run dev` in both the frontend and backend folders to start the servers.
6.   Visit `http://localhost:5173` to explore the application! 

## Contributions
Contributions to EventHub are welcome and appreciated! Here's how you can contribute:

- **Bug Reports:** If you encounter any bugs or issues while using EventHub, please open a new issue on the GitHub repository. Be sure to provide detailed information about the problem you're experiencing, including steps to reproduce it.
  
- **Feature Requests:** Have an idea for a new feature or improvement? Feel free to suggest it by opening a new issue on GitHub. We value your feedback and are always looking for ways to enhance EventHub.
  
- **Code Contributions:** If you're interested in contributing code to EventHub, you can fork the repository, make your changes, and submit a pull request. Please ensure that your code follows the project's coding standards and guidelines.
  
- **Documentation:** Improving documentation is another valuable way to contribute. If you notice any errors or outdated information in the documentation, or if you'd like to add new sections or examples, please submit a pull request with your changes.
  
- **Testing:** Help us ensure the stability and reliability of EventHub by testing new features, bug fixes, and updates. You can report any issues you encounter during testing or provide feedback on the user experience.
  
- **Spread the Word:** Enjoy using EventHub? Spread the word to others who might benefit from it! Share your experiences on social media, forums, or with your colleagues and friends.

No contribution is too small, and every contribution helps make EventHub better for everyone. Thank you for considering contributing to our project!

## License
This project is licensed under the Apache-2.0 License - see the LICENSE file for details.

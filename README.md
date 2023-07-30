⚠️ **Disclaimer:** If you encounter any errors or issues while using the live app, it's most likely due to one of my API tokens expiring or my account reaching its usage limit. In such cases, I advise you to run the application from the source code provided in this repository.

<h1 align="center">
<img src="assets/logo/cover.png" alt="text Logo" width="600">
</h1>

<div align="center">
<a href="https://text-mocha.vercel.app/"><h2 align="center">Link to demo</h2></a>
</div>

<div align="center">
  <video width="640" height="360" controls>
    <source src="assets/demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>


[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square)](https://nextjs.org/)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?style=flat-square)](https://www.typescriptlang.org/)
</div>

Welcome to `Text`, a chat application built using TypeScript and the Next.js framework. This project utilizes Prisma as the query builder and MongoDB as the database. The application supports multiple login methods, including credentials, Google, and GitHub. With `Text`, you can send messages, images, view user status (online or offline), create groups, and see if others have read your messages.

`Text` is just a learning experiment with TypeScript. I have not faced any issues, however there is still a chance that the project might contains bugs or incomplete features

# Features
- `Login Methods`: Text supports three different login methods: credentials, Google, and GitHub. Choose the one that suits you best.

- `Messaging`: Communicate with friends and family by sending messages. You can also send images to share memorable moments.

- `User Status`: Easily check if a user is online or offline, helping you connect with others at the right time.

- `Group Chats`: Create groups and have group conversations with multiple participants.

- `Read Receipts`: Know when someone has read your message, so you can be sure your message has been received.

# Build Instructions
To run Text locally, follow these steps:

 - Clone the repository to your local machine

```bash
git clone https://github.com/humblepenguinn/text
```

 - Install the dependencies

```bash
npm install
```

- Create a .env file in the root directory of the project and add the necessary environment variables. Please refer to the `env-needed` file for the required variables.

- Start the development server.

```bash
npm run dev
```


Open your web browser and visit http://localhost:3000 to access `Text`.

Note: Please make sure to read the env-needed file carefully and provide all the required environment variables to ensure the proper functioning of the application.

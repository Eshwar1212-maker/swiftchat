# Project Title

This is a full stack chat application that uses Nextjs 13 app router and api, Typescript for type safety, prisma and MongoDB for database management, Tailwind CSS and headlessui for styling, and Pusher for real-time web socket communication.

![Live Website](https://swiftchat-spvb.vercel.app/?callbackUrl=%2Fusers)

## Table of Contents

1. [About the Project](#about-the-project)
2. [Tech Stack](#tech-stack)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [Contact](#contact)

## About The Project

This project was built for learning purposes along with future endeavours to add more complexity and add these features to another app.

## Tech Stack

This project utilizes a variety of cutting-edge technologies:

- **Next 13**: for app routing and API
- **Typescript**: for type safety
- **React**: for building the user interface
- **Prisma and MongoDB**: for database management
- **Pusher**: for real-time web socket communication
- **Tailwind CSS and Headlessui**: for styling

## Features

- Beautiful user interface.
- Capability to view seen and unseen messages.
- Group chat creation feature.
- Image upload functionality.
- Integration with Github and Google for login.
- "IsActive" status for users.


## Installation

Due to the use of environment variables, you can't run this project as-is. However, you can set up a local version:

1. Clone the repository: `git clone https://github.com/your_username/your_project.git`
2. Install the dependencies: `npm install`
3. Create a `.env` file and set up the required environment variables. You'll need to set up your own values for the following:
   - `NEXT_PUBLIC_PUSHER_APP_KEY`
   - `NEXT_PUBLIC_PUSHER_APP_CLUSTER`
   - `PUSHER_SECRET`
   - `PUSHER_APP_ID`
   - `MONGODB ATLAST URL `
   - `GOOGLE CREDENTIALS`
   - `GITHUB CREDENTIALS`
   - `NEXTAUTH SECRET`

## Usage

Once installed, you can run `npm run dev` to start the server, then navigate to `http://localhost:3000` in your web browser.

## Contributing

While this project is not currently open source, feedback and suggestions are welcome. Feel free to report bugs or suggest features by opening a new issue.

## Developer

Eshwar Tangirala, https://www.linkedin.com/feed/

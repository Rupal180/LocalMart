\# LocalMart 🛒

\### Grocery Store Finder \& Price Comparison Platform



LocalMart is a full-stack grocery shopping platform that helps users find nearby grocery stores, check product availability, and compare prices across different stores.



The main goal of LocalMart is to make grocery shopping easier, especially for people visiting a new place who may not know where nearby grocery stores are located.



\## Problem Statement



People often face difficulty finding nearby grocery stores, checking product availability, and comparing prices across different stores. This becomes more challenging when they are in a new area and are unaware of the nearby shopping options.



\## Key Features



\- Find and explore nearby grocery stores

\- Search for grocery products

\- Check product availability

\- Compare product prices across stores

\- Identify the cheaper option

\- Customer and vendor authentication

\- Add, update, and remove cart items

\- Vendor product management

\- Checkout and order history interface



\## Tech Stack



\*\*Frontend\*\*

\- React.js

\- Vite

\- JavaScript

\- HTML

\- CSS



\*\*Backend\*\*

\- Node.js

\- Express.js



\*\*Database\*\*

\- MongoDB Atlas



\*\*Tools\*\*

\- Git

\- GitHub



\## Project Structure



```text

LocalMart/

├── client/       # React frontend

└── server/       # Node.js and Express backend

```



\## Getting Started



\### 1. Clone the repository



```bash

git clone https://github.com/Rupal180/LocalMart.git

cd LocalMart

```



\### 2. Install frontend dependencies



```bash

cd client

npm install

```



\### 3. Start the frontend



```bash

npm run dev

```



\### 4. Set up the backend



Open another terminal:



```bash

cd server

npm install

```



Create a `.env` file inside the `server` folder:



```env

MONGO\_URI=your\_mongodb\_connection\_string

PORT=5000

```



Replace the connection string with your own MongoDB Atlas URI.



\### 5. Start the backend



```bash

node server.js

```



\## Learning Outcomes



\- Full-stack web application development

\- Building REST APIs using Express.js

\- Connecting React frontend with backend APIs

\- MongoDB database integration

\- User authentication and cart management

\- Version control using Git and GitHub



\## Project Status



LocalMart is currently under development. More features and improvements will be added as the project progresses.




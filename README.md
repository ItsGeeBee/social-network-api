# Social Network API 
18 NoSQL: social media application

## User Story

* AS A social media startup
* I WANT an API for my social network that uses a NoSQL database
* SO THAT my website can handle large amounts of unstructured data


## Acceptance Critera

* GIVEN a social network API
* WHEN I enter the command to invoke the application
* THEN my server is started and the Mongoose models are synced to the MongoDB database
* WHEN I open API GET routes in Insomnia for users and thoughts
* THEN the data for each of these routes is displayed in a formatted JSON
* WHEN I test API POST, PUT, and DELETE routes in Insomnia
* THEN I am able to successfully create, update, and delete users and thoughts in my database
* WHEN I test API POST and DELETE routes in Insomnia
* THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list 

## Overview

* Application can be triggered by entering `npm start` on terminal command line
* Functionality of the application can be test in Insomina on the localhost port 

## Technologies Used
* Express
* Mongoose
* Moment 
* MongoDB

## Video Links & Example look
### Thoughts and Reactions
https://drive.google.com/file/d/1whLm_1M6PIQt7SzFdgSGoa2QGAS01z0w/view?usp=sharing

### Users and Friends
https://drive.google.com/file/d/1BfMreWXuw3IHqa45krcI1T-MlBo1s9nF/view?usp=sharing



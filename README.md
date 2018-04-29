# WDI_LDN_PROJECT3
Group MEAN stack project
![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 3 - Crave Angular Web Application

For my third project, we were required to build a MEAN stack web application in a group of 3. After brainstorming within the team and rolling out options that were not plausible, we came up with the idea to build 'CRAVE'.

"CRAVE'S" target audience are for people who are in need of food desperately after a night out on the town or a late night at work. The app plots relevant restaurants/food places that are currently open onto the users given map route home.

Extra filtering options are also available to the user. They're able to filter the results based on their current emotional state:

- Hammered
- Hungover
- Hardworking
- Hangry

#### My Responsibilities:

As part of the team I was mainly responsible for the following:

- Building out the backend shell including the router, environment, User model and secure route.
- Geolocate functionality in order to pick up the users current location.
- Loading modal for when the app is locating the user.
- Allowing the user to save their home and work address and select these as end points of their journey.
- Testing utilising Mocha and Chai - specifically Registration route.

(I also carried out other bug fixing and design aspects)

##### The app utilises the following technologies:

- MONGO to store our user database/credentials.
- Express to enable a fully RESTful register, login and profile edit/update process
- AngularJS to allow us to use an MVC framework and updating the state without redirecting the user/reloading the page.
- Node.js - as our server-side programming framework.
- Google Maps API - calling these main services: Directions Render, Directions Service, Places Service.
- JSONWebToken, BCrypt and Satellizer to securely store user passwords.
- UIRouter to allow for state changes.
- Mocha - the test runner, Chai - for assertion library, nyc - test coverage reporter.
- Angular-messages to run flash messages.
- Bluebird as our promise library.
- Bulma for styling.
- SCSS for nested styling.     
- Body-Parser - for form data.
- GitHub to manage version control.
- Trello to create, submit and manage user stories and manage workflow using Agile methodology.
- Heroku to host our final web application.
- Snazzy Maps for Google Map styling.

##### The app is produced with a mobile first experience in mind, so please [visit](https://crave-london.herokuapp.com/) if you're craving food on your route home.

---

###### The app loads with Google Maps in view and the user's navigation menu at the bottom of the browser window, making it clear using an animation, that the user can interact with it.

<p align="center">
<img src="https://i.imgur.com/HyA2Gm0.jpg" height="400">
<img src="https://i.imgur.com/Z0DG7Kj.jpg" height="400">
<img src="https://i.imgur.com/1WJ7vBg.png" height="400">

</p>


###### The user can then choose their starting point via Google geolocator, or via autocomplete, if this functionality fails.  And then choose their destination, emotional state, followed by travel mode.

<p align="center"><img src="https://i.imgur.com/J1GC2uG.png" height="400"></p>

###### We then utilise Directions Service and Directions Render, to create a polyline from the users origin/destination route and Places Service to plot the filtered pins/places. These are sorted by whether the restaurants are open at the time of search.

###### The user can also interact with each pin, by clicking and an info window appears, with relevant data.

###### We then call Directions Render again, to display turn by turn instructions, which our user can also interact with and see where they are on their chosen route.


<p align="center">
<img src="https://i.imgur.com/L2eHbdw.jpg" height="400">
<img src="https://i.imgur.com/f4O7132.jpg" height="400">
<img src="https://i.imgur.com/YGLZyKM.jpg" height="400">
</p>



###### For regular users of the app, they can register and create an account securely, to store their home and work address, which appear in the user's navigation panel, if logged in.

###### Also, once logged in, the user can edit their home address, work address and username at any time.

<p align="center">
<img src="https://i.imgur.com/us1563V.png" height="400">
<img src="https://i.imgur.com/3LY2NfJ.jpg" height="400">
</p>

---



###### Installation Instructions
- Install dependencies 'yarn install'
- Start local MongoDB server in Node.js 'mongod'
- Launch the app locally with 'yarn start:client' & 'yarn start:server'

---

###### Enhancements:
- Functionality that the user can be tracked whilst walking the router
- Saving favourite food places for future
- Including a taxi API so the user could book one if needed.

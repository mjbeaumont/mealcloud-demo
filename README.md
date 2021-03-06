# Restaurant Ordering App

## Introduction
This is the front end code for a prototype of a re-usable restaurant ordering app. The backend can be found [here](https://www.github.com/mjbeaumont/mealcloud-portal). 

This was used to pitch the idea of a re-usable ordering platform that could embedded in the overall design of a restaurant's website to allow them to accept online orders quickly, and was created in under a month. It is a WIP.

Please see the [TODO](#TODO) for important information.

See [DEMO](https://mealcloud.beaumontwebdev.com) 

## Technologies Used
* Vue.js
* Vuex
* DayJS
* VeeValidate
* Axios
* PrimeVue
* Tailwind CSS
* Stripe JS SDK

## Features
1. Calendar (datepicker) created from scratch.
2. Google Map Integration on checkout page
3. Payments processed by [Stripe](https://www.stripe.com)
4. Orders submit to a backend portal (see above) where they are stored for processing.

## Installation

````
npm install
npm serve
````
You will need to copy .env.example to .env.development.local and provide your own Stripe API key. More information can be found [here](https://stripe.com/docs/api/authentication).

## TODO

1. There is functionality that is handled by this app (order total calculations) that should NEVER be trusted to a client-side app. This should be moved to the server-side app.
2. Add Unit/E2E tests
3. Create order confirmation page
4. Make it more clear that menu categories can be expanded
5. Auto-open cart after adding item to cart
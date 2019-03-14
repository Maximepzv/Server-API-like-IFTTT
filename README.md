# Application structure:    
    - properties
        ------ config.json             <!-- will hold our datas configuration -->
    
    - models
        ------ user.js                 <!-- our user model -->
        ------ area.js                 <!-- our action / reaction model -->
        
    - src
        ------ api                     <!-- all the routes for our application -->
        - lib
            ------ passport-user.js    <!-- our passportJs strategy and routes configuration -->
            ------ token.js            <!-- management functions of our Json Web Tokens -->
        - services
            ------ actions             <!-- all our actions -->
            ------ reaction            <!-- all our reactions -->
            list.js                    <!-- object containing the list of our actions and reactions -->
    
    - package.json                     <!-- handle our npm packages -->
    
    - index.js                         <!-- setup our application -->


# HTTP requests
## Published Postman Collection
`https://documenter.getpostman.com/view/5660009/S11RKak6` 

## POST Signup
`http://localhost:8080/api/signup`
#### Description
Creates a new user in the database
#### HEADERS
**Content-Type** application/x-www-form-urlencoded
#### BODY
**username** test@example.com

**password** 1234



## POST Signin
`http://localhost:8080/api/signin`
#### Description
Creates a signed token and returns it in response
#### HEADERS
**Content-Type** application/x-www-form-urlencoded
#### BODY
**username** test@example.com

**password** 1234



## POST Authentication with Facebook
`http://localhost:8080/api/auth/facebook`
#### Description
Create or find user in database then creates a signed token and returns it



## GET Authentication with Google
`http://localhost:8080/api/auth/google`
#### Description
Create or find user in database then creates a signed token and returns it in query params in the callback url
#### RESPONSE
Redirect to `http://localhost:8081/signin?token={{token}}`



## GET Add service Google
`http://localhost:8080/api/add/google?token={{token}}`
#### Description
Authenticate the user from the JWT in query params then redirect him to the google's authenticate service then update his profile  
#### PARAMS
**token** {{token}}
#### RESPONSE
Redirect to `http://localhost:8081/signin?token={{token}}`



## GET getProfile
`http://localhost:8080/api/getProfile`
#### Description
Returns the profile of the authenticated user
#### HEADERS
**Authorization** JWT {{token}}



## GET getServices
`http://localhost:8080/api/getservices`
#### HEADERS
**Authorization** JWT {{token}}
#### RESPONSE
List of services to which the user is connected 

    "msg": [
        {
            "google": {...},
            "twitter": {...},
            "facebook": {...},
            ...
        },
        "_id": "..."
    ]



## GET getArea
`http://localhost:8080/api/getArea`
#### HEADERS
**Authorization** JWT {{token}}
#### RESPONSE
Lists the reaction actions to which the user has subscribed



## PUT newArea
`http://localhost:8080/api/newArea`
#### DESCRIPTION
Create a new reaction action for the authenticated user.
Starts it and saves it in the database. 
#### HEADERS
**Authorization** JWT {{token}}
**Content-Type** application/json
#### BODY

    {
        "recipe": {
            "action": {
        	    "title": String,
                "options": Object
	        },
	        "reaction": {
        	    "title": String,
    	        "options": Object
	        }
        }
    }



# Authentication
### Dependencies
- Passport
- JSON Web Token (JWT)
## How does it works ?
- When the user logs in, the backend creates a signed token and returns it in response
- The client saves the token locally (typically in localStorage) and sends it back in every subsequent request that needs authentication
- All requests needing authentication pass through a middleware that checks the provided token and allows the request only if the token is verified

# MongoDB documents
## Users
    user {
        local {
            email: {
                type: String,
                unique: true,
                required: true
            },   
            password: {
                type: String
            },
            firstName: {
                type: String
            },
            lastName: {
                type: String
            },
        },
        facebook: {
            id: String,
            token: String,
            refreshToken: String,
            email: String
        },
        google: {
            id: String,
            token: String,
            refreshToken: String,
            email: String
        }
    }

# List of services, actions and reactions

## Weather
#### ACTIONS
    name: temperatureBelow
    description: This Trigger fires when the temperature drops below a specific value
    options: {
        'city':  City string format,
        'units': 'imperial' or 'metric',
        'limit': Limit value string format
    }
    -------------------------------------------------------------------------------------------------------------------------------------------
    name: temperatureAbove
    description: This Trigger fires when the temperature rises above a specific value
    options: {
        'city':  City string format,
        'units': 'imperial' or 'metric',
        'limit': Limit value string format
    }
    -------------------------------------------------------------------------------------------------------------------------------------------
    name: pressureBelow
    description: This Trigger fires when the pressure drops below a specific value
    options:{
        'city':  City string format,
        'units': 'imperial' or 'metric',
        'limit': Limit value string format
    }
    -------------------------------------------------------------------------------------------------------------------------------------------
    name: pressureAbove
    description: This Trigger fires when the pressure goes above a specific value
    options:{
        'city':  City string format,
        'units': 'imperial' or 'metric',
        'limit': Limit value string format
    }
    -------------------------------------------------------------------------------------------------------------------------------------------
    name: humidityAbove
    description: This Trigger fires when the humidity rises above a specific value
    options:{
        'city':  City string format,
        'units': 'imperial' or 'metric',
        'limit': Limit value string format
    }
    -------------------------------------------------------------------------------------------------------------------------------------------
    name: humidityBelow
    description: This Trigger fires when the humidity drops below a specific value
    options:{
        'city':  City string format,
        'units': 'imperial' or 'metric',
        'limit': Limit value string format
    }


## Time
#### ACTIONS
    name: on_every_tick
    description: This Trigger fires on every specific time
    options: {
        'cronTime':  Cron time string format,
    }

## Rss
#### ACTIONS
    name: matches_on_title
    description: This Trigger fires every time a new item in the feed you specify contains a particular keyword or simple phrase in the title
    options: {
        'url': url of the feed,
        'title': keyword or simple phrase, string format
    }
    -------------------------------------------------------------------------------------------------------------------------------------------
    name: matches_on_content
    description: This Trigger fires every time a new item in the feed you specify contains a particular keyword or simple phrase in the content
    options:  {
        'url': url of the feed,
        'content': keyword or simple phrase, string format
    }


## Gmail
#### REACTIONS
    name : send_mail
    description: This reaction will send an email from your Gmail account
    options: {
        'to': destination email address, string format
        'subject': email subject, string format
        'content': email content, string format
    }

## Calendar 
#### REACTIONS
    name: add_to_calendar
    description: This reaction will create a new event in your Google calendar
    options: {
        'eventName': Name of the event
        'eventStart': Starting date of the event
        'eventEnd': Ending date of the event
        -----------------------------------
       | Date format:                      |
       | YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS |
       | ex:                               |
       | 2019-03-14 or 2019-03-14T10:42:00 |
        -----------------------------------
    }

## Ping
#### REACTIONS
    name: ping_once
    description: This reaction will ping a specific ip
    options: {
        'host': IP address to ping
    }

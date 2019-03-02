# Application structure:    
    - properties
    ------ config.json    <!-- will hold our datas configuration -->
    
    - models
        ------ user.js    <!-- our user model -->
        ------ recipe.js  <!-- our action / reaction model -->
        
    - src/api             <!-- all the routes for our application -->
    - src/services        <!-- all our global functions and external services -->
    
    - package.json        <!-- handle our npm packages -->
    
    - index.js            <!-- setup our application -->

# HTTP requests
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
Create or find user in database then creates a signed token and returns it in response
#### HEADERS
**Content-Type** application/x-www-form-urlencoded
#### BODY
**access_token** access_token from facebook

## POST Add Facebook service to the user
`http://localhost:8080/api/auth/facebook`
#### Description
Add the facebook service to the user then creates a signed token and returns it in response
#### HEADERS
**Content-Type** application/x-www-form-urlencoded
**Authorization** JWT {{token}}
#### BODY
**access_token** access_token from facebook


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
            token: String,
            id: String,
            email: String
        },
        google: {
            token: String,
            id: String
        },
        twitter: {
            token: String,
            id: String
        }
    }

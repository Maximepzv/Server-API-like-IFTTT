# Application structure:
    - bin
    ------ www          <!-- node startup scripts -->    
    
    - config
    ------ database.js  <!-- will hold our database connection settings -->
    ------ passport.js  <!-- configuring the strategies for passport -->
    
    - models
        ------ user.js  <!-- our user model -->
    
    - public            <!-- our ressources html -->
    
    - routes            <!-- all the routes for our application -->
    
    - views
    ------ index.jade   <!-- show our home page -->
    ------ error.jade   <!-- show our error page -->
    ------ layout.jade  <!-- our html layout -->
    
    - package.json      <!-- handle our npm packages -->
    
    - app.js            <!-- setup our application -->

# HTTP requests
#### Description
Creates a new user in the database
## POST Signup
`http://localhost:8080/api/signup`
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
        username: {
            type: String,
            unique: true
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
        email: {
            type: String,
            unique: true,
            required: true
        },
        facebook: {
            token: String,
            id: String
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

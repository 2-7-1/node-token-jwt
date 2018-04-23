# node-token-jwt

A simple API using express demonstrating:

-- JSON Web Tokens (JWT) for validation and authentication.  (https://jwt.io/)
-- A JWT validation and user "authentication" gateway function.  
    Request to the protected resorce /api/get-message must have JWT token in header ("x-access-token"), query string (?token=), or JSON body ({"token": "..."})

## USE
This API has two endpoints:
-- POST /api/get-token:
    This endpoint must be called with a valid user JSON in the body.  For this demo:
    {
        "userName": "Mr. Node",
        "password": "password"
    }

    It returns a JSON object containing a JWT, for example:
    {
        "success": true,
        "message": "User JWT",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik1yLiBOb2RlIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTUyNDUwOTU5NywiZXhwIjoxNTI0NTExMDM3fQ.rtBhPdZC_ULbvEWnMmyN1etqArfr9SrvDBQ_dEwX5D4"
    }

    Using the "token" property, we call the second endpoint.

-- GET /api/get-message
    This enpoint must include the obtianed  the JWT token in header ("x-access-token"), query string (?token=), or JSON body ({"token": "..."}).

    express.Router() is used to create a "gateway" function where the JWT signature is validated to ensure that it came from the server.  Then the payload in the JWT is extracted and the userName and password are authenticated.  Only then does this function proceed to this endpoint.
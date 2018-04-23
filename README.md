# node-token-jwt

A simple API using express demonstrating:

-- JSON Web Tokens (JWT) for validation and authentication.  (https://jwt.io/)
-- An "authentication" gateway endpoint.  Request to protected resorce /api/get-message must have JWT token
    in header ("x-access-token"), query string (?token=), or JSON body ({"token": "..."})

## USE
This API has
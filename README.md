# spda-afisha

## How to use

To run this solution you just need to run [docker-compose.yaml](./docker-compose.yaml) file.
However you should provide `serviceAccountKey.json`, that should be placed in same directory as `docker-compose.yaml`.

## spda-afisha-backend

### Deployment

#### Docker container

We have deployed a container with backend application to [Github Container Registry](https://github.com/vladdan16/spda-afisha/pkgs/container/spda-afisha-backend).

#### Hosted swagger

[Here](http://51.250.91.163/swagger-ui) is you can find deployed swagger to test backend.

### Authorization

In order to access backend API you should be authorized through Firebase and provide Authorization token in request header.

#### How to get token

You can obtain firebase token through firebase API.

1. With existing user:

`POST https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[firebase_api_key]`

Body:
```json
{
  "email": "youremail@gmail.com",
  "password": "yoursecretpassword",
  "returnSecureToken": true
}
```

2. Create new user:

`POST https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[firebase_api_key]`

Body:
```json
{
  "email": "youremail@gmail.com",
  "password": "yoursecretpassword",
  "returnSecureToken": true
}
```

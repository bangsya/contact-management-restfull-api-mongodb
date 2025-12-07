# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "bangsya",
  "password": "rahasia",
  "name": "Muhammad Syafi'i"
}
```

Response Body Succes :

```json
{
  "data": {
    "_id": "unique-id",
    "username": "bangsya",
    "name": "Muhammad Syafi'i"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "bangsya",
  "password": "rahasia"
}
```

Response Body Succes :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password is wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Request Header :

- Authorization : token

Request Body :

```json
{
  "username": "bangsya", // optional
  "password": "new-password", // optional
  "name": "Muhammad Syafi'i new" // optional
}
```

Response Body Succes :

```json
{
  "data": {
    "_id": "unique-id",
    "username": "bangsya",
    "name": "Muhammad Syafi'i new"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Get User API

Endpoint : GET /api/users/current

Request Header :

- Authorization : token

Response Body Succes :

```json
{
  "data": {
    "_id": "unique-id",
    "username": "bangsya",
    "name": "Muhammad Syafi'i"
  }
}
```

Response Body Error :

```json
{
  "errors": "User not found"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Request Header :

- Authorization : token

Response Body Succes :

```json
{
  "data": "Logout success"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

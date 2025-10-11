# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :

- Authorization : token

Request Body :

```json
{
  "firstName": "Bangsya",
  "lastName": "Code",
  "email": "bangsya@pzn.com",
  "phone": "32423423434"
}
```

Response Body Success :

```json
{
  "message": "Contact created successfully",
  "data": {
    "_id": "unique-id",
    "firstName": "Bangsya",
    "lastName": "Code",
    "email": "bangsya@pzn.com",
    "phone": "32423423434",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "_id": "unique-id",
  "firstName": "Bangsya New",
  "lastName": "Code new",
  "email": "bangsya1@pzn.com",
  "phone": "32423423434"
}
```

Response Body Success :

```json
{
  "message": "Contact updated successfully",
  "data": {
    "_id": "unique-id",
    "firstName": "Bangsya New",
    "lastName": "Code new",
    "email": "bangsya1@pzn.com",
    "phone": "32423423434",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "_id": "unique-id",
    "firstName": "Bangsya New",
    "lastName": "Code new",
    "email": "bangsya1@pzn.com",
    "phone": "32423423434",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :

- Authorization : token

Query params :

- name : Search by first_name or last_name, using like, optional
- email : Search by email using like, optional
- phone : Search by phone using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "_id": "unique-id-1",
      "firstName": "Eko",
      "lastName": "Khannedy",
      "email": "eko@pzn.com",
      "phone": "32423423434",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    },
    {
      "_id": "unique-id-2",
      "firstName": "Eko",
      "lastName": "Khannedy",
      "email": "eko@pzn.com",
      "phone": "32423423434",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Remove Contact API

Endpoint : DELETE /api/contacts/:id

Headers :

- Authorization : token

Response Body Success :

```json
{
  "data": "Contact deleted successfully"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found"
}
```

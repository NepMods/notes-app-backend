
# Note Project Backend

Backend implementation for notes app demo Project in express.js for DeskGoo.

# Notes App Frontend (Flutter)

This is the [Notes App Frontend](https://github.com/NepMods/notes-app). It allows users to register, log in, and manage their notes securely through a sleek and modern UI.


## API Reference

#### Login

```http
  POST /login
```
## generates a barear token (JWT)

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** Username |
| `password` | `string` | **Required** Password |


#### Register

```http
  POST /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** Username |
| `password` | `string` | **Required** Password |

#### Get all Notes of a user

```http
  GET /notes
```
Auth required: Barear token from the /login response

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |


#### add a note

```http
  POST /notes
```
Auth required: Barear token from the /login response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** Title of note |
| `body` | `string` | **Required** Body of note |

#### update a note

```http
  PUT /notes/:id
```
Auth required: Barear token from the /login response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required** Title of note |
| `body` | `string` | **Required** Body of note |

#### delete a note

```http
  DELETE /notes/:id
```
Auth required: Barear token from the /login response

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |


## Contributing

Contributions are always welcome!



# Note Project Backend

Backend implementation for notes app demo Project in express.js for DeskGoo.


## License

[MIT](https://choosealicense.com/licenses/mit/)




# Node.js ToDo Application

This is a basic ToDo application built with Node.js that allows you to manage tasks using RESTful APIs.

## Features

- **GET /todos:** Retrieve all ToDo items.
- **POST /todos/new:** Add a new ToDo item.
- **DELETE /todos/delete?id=:id:** Delete a ToDo item by ID.
- **PUT /todos/update?id=:id:** Update a ToDo item by ID.

## Requirements

- Node.js installed on your machine.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/SrikantAich/To-Do.git
   cd To-Do
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   node server.js
   ```

The server will start running on `http://localhost:3000`.

## Usage

### Retrieve all ToDo items

Send a GET request to `http://localhost:3000/todos`.

### Add a new ToDo item

Send a POST request to `http://localhost:3000/todos/new` with a JSON payload containing `title` and `priority`.

Example:
```json
{
  "title": "Learn Vue.js",
  "priority": "High"
}
```

### Update a ToDo item

Send a PUT request to `http://localhost:3000/todos/update?id=:id` with a JSON payload containing fields to update (`title`, `priority`, `status`).

Example:
```json
{
  "title": "Learn Vue.js",
  "priority": "High",
  "status": "Pending"
}
```

### Delete a ToDo item

Send a DELETE request to `http://localhost:3000/todos/delete?id=:id`.

Replace `:id` with the ID of the ToDo item you want to delete.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---


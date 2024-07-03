const http = require("http");
const url = require("url");

const data = [
  {
    id: "jkhsadkjhj",
    title: "Learn Node.js",
    priority: "High",
    status: "Pending",
  },
  {
    id: "kbdejwqkje",
    title: "Learn React.js",
    priority: "High",
    status: "Pending",
  },
  {
    id: "kbhfrqweq",
    title: "Learn Angular.js",
    priority: "High",
    status: "Pending",
  },
];

// request object is used to get the information from the user (url, method, headers, etc)

const server = http.createServer((request, response) => {
  console.log(request.method);
  console.log(request.url);

  const parsedUrl = url.parse(request.url, true);
  const { pathname, query } = parsedUrl;
  const method = request.method;

  if (pathname === "/todos" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    // response.end("Response from GET request");
    response.end('Response from GET request\n'+JSON.stringify(data));
  }

  else if (pathname === "/todos/new" && method === "POST") {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk.toString();
    });

    request.on('end', () => {
      const payload = JSON.parse(body);
      const {title,priority}=payload;
      const newTodo = {
        id: generateRandomId(),
        title,
        priority,
        status: "Pending",
      };

      data.push(newTodo);
      response.writeHead(201, { "Content-Type": "application/json" });
      response.end('ToDo Added\n'+JSON.stringify(newTodo));
      console.table(data);
    });

  
  } 
  else if (pathname === '/todos/delete' && method === 'DELETE') {
    const { id } = query;
    const index = data.findIndex((todo) => todo.id === id);
    const deletedTodo = data[index];
    // console.log(index);
    // console.log(deletedTodo);
    data.splice(index, 1);
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: 'Todo deleted successfully', todo: deletedTodo }));
    console.table(data);
}

else if(pathname=== '/todos/update' && method === 'PUT')
{
    const{id}=query;
    const index = data.findIndex((todo) => todo.id === id);
    const todo = data[index];
    let body='';
    request.on('data', (chunk) => {
        body += chunk.toString();
    });
    request.on('end', () => {
      let payload;
      
      try {
          payload = JSON.parse(body);
      } catch (error) {
          console.error('Error parsing JSON:', error);
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: 'Invalid JSON payload' }));
          return;
      }
  
      // Check the payload structure and update 'todo' accordingly
      if (payload.title !== undefined && payload.priority === undefined && payload.status === undefined) {
          // Case where only title is present
          const { title } = payload;
          console.log('Received payload with only title:', title);
          todo.title = title;
      } else if (payload.title !== undefined && payload.priority !== undefined && payload.status === undefined) {
          // Case where title and priority are present
          const { title, priority } = payload;
          console.log('Received payload with title and priority:', title, priority);
          todo.title = title;
          todo.priority = priority;
      } else if (payload.title !== undefined && payload.priority !== undefined && payload.status !== undefined) {
          // Case where title, priority, and status are present
          const { title, priority, status } = payload;
          console.log('Received payload with title, priority, and status:', title, priority, status);
          todo.title = title;
          todo.priority = priority;
          todo.status = status;
      } else {
          // Handle other cases or fallback
          console.log('Received payload with unknown structure:', payload);
          response.writeHead(400, { "Content-Type": "application/json" });
          response.end(JSON.stringify({ message: 'Invalid payload structure' }));
          return;
      }
  
      // Respond with success message
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: 'Payload processed successfully', todo }));
  });
  
  
}
else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: 'Route not found' }));
}


  function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

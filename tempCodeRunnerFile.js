const http = require("http");
const url = require("url");

const data = [
  {
    id: 1,
    title: "Learn Node.js",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    title: "Learn React.js",
    priority: "High",
    status: "Pending",
  },
  {
    id: 3,
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

  else if(pathname === "/todos/new" && method === "POST")
    {

    }

    function id()
    {
      
    }

});

const PORT = 3000;

server.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

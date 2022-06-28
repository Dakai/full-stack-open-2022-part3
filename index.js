const { request, response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});
// middleware
app.use(cors({ origin: true }));
app.use(express.json());
//app.use(morgan("tiny")); //Exercises 3.7
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
); //Exercises 3.8
//app.use(express.urlencoded());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  const entry = persons.length;
  //const date = new Date();
  //response.send(`Phonebook has info for {} people</br>${date}`);
  response.send(`Phonebook has info for ${entry} people</br></br>${Date()}`);
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  //console.log(id);
  const person = persons.find((person) => person.id === id);
  if (persons) {
    response.json(person);
  } else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.put("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  const body = request.body;
  const person = {
    id: id,
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

const generateId = () => {
  let id = Math.floor(Math.random() * 1000);
  return id;
  /*
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;

	return maxId + 1;
	*/
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  //console.log(request.body);
  //console.log(body);
  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "name can not be blank",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "number can not be blank",
    });
  }

  const ifIncluded = () => {
    const nametrim = body.name.trim();
    const person = persons.find((person) => person.name === nametrim);
    return person;
  };
  //console.log(ifIncluded());

  if (ifIncluded()) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    //content: body.content,
    //important: body.important || false,
    //date: new Date(),
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);

  /*
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const person = {
    //content: body.content,
    //important: body.important || false,
    //date: new Date(),
    name: body.content.name,
    number: body.content.number,
    id: generateId(),
  };
  persons = persons.concat(person);
	response.json(person);
	*/
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

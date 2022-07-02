require("dotenv").config();
const { request, response } = require("express");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

const morgan = require("morgan");
morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

// middleware
app.use(express.static("build"));
app.use(express.json());
app.use(cors({ origin: true }));
//app.use(morgan("tiny")); //Exercises 3.7
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
); //Exercises 3.8

/*
//Backend Connected to a database
const mongoose = require("mongoose");
const pwd = process.argv[2];
const database = "Persons";

const url = `mongodb+srv://dakai:${pwd}@cluster0.xuyas.mongodb.net/${database}?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.connect(url);
*/
/*
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
*/
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    console.log(persons);
    const entry = persons.length;
    //const entry = Object.keys(Person).length;
    response.send(`Phonebook has info for ${entry} people</br></br>${Date()}`);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  //const id = Number(request.params.id);
  const id = request.params.id;
  //console.log(id);
  Person.find({})
    .then((persons) => {
      const person = persons.find((person) => person.id === id);
      if (person) {
        response.json(person);
      } else response.status(404).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const person = persons.find((person) => person.id === request.params.id);
      if (person) {
        Person.findByIdAndRemove(request.params.id)
          .then(() => {
            console.log("delete response", response);
            response.status(204).end();
          })
          .catch((error) => next(error));
      } else response.status(404).end();
    })
    .catch((error) => next(error));

  /*const id = request.params.id;
  Person.find({})
    .then((persons) => {
      persons = persons.filter((person) => person.id !== id);
      response.status(204).end();
    })
		.catch((error) => next(error));
		*/
});

app.put("/api/persons/:id", (request, response, next) => {
  const content = request.body;
  Person.findByIdAndUpdate(request.params.id, content, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

/*
app.put("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      const body = request.body;
      console.log(body);
      //console.log(request.body);
      //console.log(body);
      //Part3 3.14
      const person = new Person({
        name: body.name,
        number: body.number,
      });
      person.save();
      response.status(204).end();
    })
    .catch((error) => next(error));
});
*/
/*
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
*/
/*
const generateId = () => {
  let id = Math.floor(Math.random() * 1000);
  return id;
 };
*/
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  //console.log(body);
  //Part3 3.14
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then(() => {
      response.json(person);
    })
    .catch((error) => next(error));
  /*
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
	*/
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

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name == "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
// handler of requests with result to errors
app.use(errorHandler); //Exercises 3.16

//const PORT = process.env.PORT || 3001;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

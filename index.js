const express = require("express");
const app = express();

app.use(express.json());

require("dotenv").config();
const Person = require("./models/person");

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  const info = `
    <p>Phonebook has info for ${phonebookEntries.length} people</p>
    <br/>
    <p>${new Date()}</p>
  `;
  response.send(info);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const index = phonebookEntries.findIndex((entry) => entry.id === id);

  if (index === -1) {
    response.status(404).json({ error: "Entry not found" });
  } else {
    phonebookEntries.splice(index, 1);
    response.status(204).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

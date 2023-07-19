const express = require("express");
const app = express();

app.use(express.json());
const phonebookEntries = [
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

app.get("/api/persons", (request, response) => {
  response.json(phonebookEntries);
});

app.get("/api/persons/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const entry = phonebookEntries.find((entry) => entry.id === id);

  if (!entry) {
    response.status(404).json({ error: "Entry not found" });
  } else {
    response.json(entry);
  }
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
  const newEntry = request.body;
  newEntry.id = generateRandomId();

  phonebookEntries.push(newEntry);
  response.status(201).json(newEntry);
});

function generateRandomId() {
  return Math.floor(Math.random() * 100000) + 1;
}

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

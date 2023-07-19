const express = require("express");
const app = express();

// Define the phonebook entries array
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

// Route handler for getting all phonebook entries
app.get("/api/persons", (request, response) => {
  response.json(phonebookEntries);
});

// Route handler for getting a specific phonebook entry by ID
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
    response.status(204).end(); // Respond with status code 204 (No Content) to indicate successful deletion
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

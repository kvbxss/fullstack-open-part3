const mongoose = require("mongoose");
require("dotenv").config();

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const uri = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(uri);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log(`added ${person.name} number ${person.number} to phonebook`);
  mongoose.connection.close();
});

Person.find({}).then((result) => {
  console.log("phonebook:");
  result.forEach((person) => {
    console.log(person.name, person.number);
  });
  mongoose.connection.close();
});

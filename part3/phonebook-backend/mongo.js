const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://rei:${password}@cluster0.uzywych.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log('Connected');

    if (process.argv.length === 3) {
      Person.find({}).then((persons) => {
        console.log('phonebook:');
        persons.forEach((person) => console.log(person.name, person.number));

        return mongoose.connection.close();
      });
    }

    if (process.argv.length === 5) {
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({
        name,
        number,
      });

      person.save().then((result) => {
        console.log(`added ${result.name} ${result.number} to phonebook`);

        return mongoose.connection.close();
      });
    }
  })
  .catch((err) => console.log(err));

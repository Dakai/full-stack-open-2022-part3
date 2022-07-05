const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the pwd as an argv: node mongo.js <pwd>')
  process.exit(1)
}

const database = 'Persons'

const pwd = process.argv[2]

const url = `mongodb+srv://dakai:${pwd}@cluster0.xuyas.mongodb.net/${database}?retryWrites=true&w=majority`

const name = process.argv[3]
const number = process.argv[4]
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && number) {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({
        name: name,
        number: number,
      })
      return person.save().then(() => {
        console.log('person saved')
        return mongoose.connection.close()
      })
    })
    .catch((err) => console.log(err))
}

if (process.argv.length === 3) {
  mongoose
    .connect(url)
    .then((result) => {
      //console.log("connected", result);
      //console.log("connected");
      console.log('phonebook:')
      Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
      /*
    const note = new Note({
      content: "HTML is easy",
      date: new Date(),
      important: true,
    });
		return note.save();
			.then(() => {
        console.log("note saved");
        return mongoose.connection.close();
			});
		*/
    })
    .catch((err) => console.log(err))
}

import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

/*
mongodb+srv://<username>:<password>@aac-devs-cluster.0arqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongodb+srv://aac-devs:<password>@aac-devs-cluster.0arqf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

PExgv4VtCQqdZzVw
 */
const url = `mongodb+srv://aac-devs:${password}@aac-devs-cluster.0arqf.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);

/*
const note = new Note({
  content: 'CSS is Easy',
  date: new Date(),
  important: true,
});

note.save().then((result) => {
  console.log('note saved!');
  console.log(result);
  mongoose.connection.close();
});
*/

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let contacts = [
  // Example contact data
  {
    id: '1',
    firstName: 'A.',
    lastName: 'Rabin',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    displayPhoto: 'https://via.placeholder.com/150',
    physicalAddress: '123 Elm Street, Springfield',
    groupName: 'Friends',
    photoUrl: 'assets/images/dp-w.jpg'
  }
  // Add more contacts here...
];

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
});

// Add more routes as needed (POST, PUT, DELETE)

module.exports = app;

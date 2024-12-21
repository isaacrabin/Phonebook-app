const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Mock data (replace this with your JSON file or database connection)
const  contacts = [
    {
      "id": "1",
      "firstName": "A.",
      "lastName": "Rabin",
      "email": "john.doe@example.com",
      "phoneNumber": "123-456-7890",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "123 Elm Street, Springfield",
      "groupName": "Friends",
      "photoUrl": "assets/images/dp-w.jpg"
    },
    {
      "id": "2",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "phoneNumber": "234-567-8901",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "456 Oak Avenue, Metropolis",
      "groupName": "Work"
    },
    {
      "id": "3",
      "firstName": "Michael",
      "lastName": "Brown",
      "email": "michael.brown@example.com",
      "phoneNumber": "345-678-9012",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "789 Pine Road, Gotham"
    },
    {
      "id": "4",
      "firstName": "Emily",
      "lastName": "Davis",
      "email": "emily.davis@example.com",
      "phoneNumber": "456-789-0123",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "321 Maple Street, Star City",
      "groupName": "Family"
    },
    {
      "id": "5",
      "firstName": "William",
      "lastName": "Johnson",
      "email": "william.johnson@example.com",
      "phoneNumber": "567-890-1234",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "654 Birch Lane, Central City"
    },
    {
      "id": "6",
      "firstName": "Olivia",
      "lastName": "Wilson",
      "email": "olivia.wilson@example.com",
      "phoneNumber": "678-901-2345",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "987 Willow Way, Coast City"
    },
    {
      "firstName": "James",
      "lastName": "Martinez",
      "phoneNumber": "789-012-3456",
      "email": "james.martinez@example.com",
      "physicalAddress": "432 Cedar Street, Keystone City",
      "groupName": "family",
      "id": "7"
    },
    {
      "id": "8",
      "firstName": "Sophia",
      "lastName": "Garcia",
      "email": "sophia.garcia@example.com",
      "phoneNumber": "890-123-4567",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "123 Spruce Drive, Hub City",
      "groupName": "Friends"
    },
    {
      "id": "9",
      "firstName": "Benjamin",
      "lastName": "Anderson",
      "email": "benjamin.anderson@example.com",
      "phoneNumber": "901-234-5678",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "456 Redwood Circle, Blüdhaven"
    },
    {
      "id": "10",
      "firstName": "Isabella",
      "lastName": "Thomas",
      "email": "isabella.thomas@example.com",
      "phoneNumber": "012-345-6789",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "789 Aspen Lane, Emerald City",
      "groupName": "Family"
    },
    {
      "firstName": "Janet",
      "lastName": "Jackson",
      "phoneNumber": "123-456-7891",
      "email": "alexander.jackson@example.com",
      "physicalAddress": "321 Magnolia Street, Harmony",
      "groupName": "work",
      "id": "11"
    },
    {
      "id": "12",
      "firstName": "Mia",
      "lastName": "White",
      "email": "mia.white@example.com",
      "phoneNumber": "234-567-8902",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "654 Cherry Avenue, Eden"
    },
    {
      "id": "13",
      "firstName": "Daniel",
      "lastName": "Harris",
      "email": "daniel.harris@example.com",
      "phoneNumber": "345-678-9013",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "987 Cypress Drive, Avalon",
      "groupName": "Work"
    },
    {
      "firstName": "Ameliaure2",
      "lastName": "Clark",
      "phoneNumber": "0729176560",
      "email": "amelia.clark@example.com",
      "physicalAddress": "432 Palm Street, Olympus",
      "groupName": "friend",
      "id": "14"
    },
    {
      "id": "15",
      "firstName": "Ethan",
      "lastName": "Lewis",
      "email": "ethan.lewis@example.com",
      "phoneNumber": "567-890-1235",
      "displayPhoto": "https://via.placeholder.com/150",
      "physicalAddress": "123 Fir Road, Utopia"
    }
  ];



// API endpoints
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: 'Contact not found' });
  }
});

// Create a new contact
app.post('/api/contacts', (req, res) => {
  const newContact = req.body;
  newContact.id = (contacts.length + 1).toString(); // Assign a simple incremental ID
  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Update a contact by ID
app.put('/api/contacts/:id', (req, res) => {
  const contactIndex = contacts.findIndex(c => c.id === req.params.id);
  if (contactIndex === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  contacts[contactIndex] = { ...contacts[contactIndex], ...req.body };
  res.json(contacts[contactIndex]);
});

// Delete a contact by ID
app.delete('/api/contacts/:id', (req, res) => {
  const contactIndex = contacts.findIndex(c => c.id === req.params.id);
  if (contactIndex === -1) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  contacts.splice(contactIndex, 1);
  res.status(204).end();
});

// Bulk update contacts
app.put('/api/contacts/bulk', (req, res) => {
  const updatedContacts = req.body;
  updatedContacts.forEach(updatedContact => {
    const index = contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...updatedContact };
    }
  });
  res.json(updatedContacts);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

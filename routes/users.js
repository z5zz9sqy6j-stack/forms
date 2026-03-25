const express = require('express');
const router = express.Router();

const users = [
    {
        firstName: 'George',
        lastName: 'Smith',
        gender: 'Male',
        age: 30
    },
    {
        firstName: 'Justyna',
        lastName: 'Brown',
        gender: 'Female',
        age: 28
    }
];

router.get('/', (req, res) => {
    res.redirect('/users/list');
});

router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    const age = req.body.age;

    const isValid =
        firstName !== '' &&
        lastName !== '' &&
        gender !== '' &&
        age !== '';

    if (isValid) {
        users.push({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            age: age
        });

        res.redirect('/users/list');
    } else {
        res.render('users/new', {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            age: age
        });
    }
});

router.get('/list', (req, res) => {
    res.render('users/list', { users: users });
});

router.get('/new', (req, res) => {
    res.render('users/new', {
        firstName: '',
        lastName: '',
        gender: '',
        age: ''
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];

    if (!user) {
        return res.send('User not found');
    }

    res.render('users/show', {
        user: user,
        id: id
    });
});

router.delete('/:id', (req, res) => {
    res.send(`Deleting user data for id: ${req.params.id}`);
});

router.put('/:id', (req, res) => {
    res.send(`Updating user data for id: ${req.params.id}`);
});

module.exports = router;
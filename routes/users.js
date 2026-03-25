const express = require('express');
const router = express.Router();

const users = [
    { name: 'George' },
    { name: 'Jenil' }
];

router.route('/')
    .get((req, res) => {
        res.send('User List');
    })
    .post((req, res) => {
        const firstName = req.body.firstName;
        const isValid = firstName !== "";

        if (isValid) {
            console.log(`Adding user: ${firstName}`);
            users.push({ name: firstName });
            res.render('users/list', { users });
        } else {
            console.log('Error adding user');
            res.render('users/new', { firstName: firstName });
        }
    });

router.get('/list', (req, res) => {
    res.render('users/list', { users });
});

router.get('/new', (req, res) => {
    res.render('users/new', { firstName: 'Test' });
});

router.route('/:id')
    .get((req, res) => {
        res.send(`Getting user data: ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Deleting user data for id: ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Updating user data for id: ${req.params.id}`);
    });

module.exports = router;
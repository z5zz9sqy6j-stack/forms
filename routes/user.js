const express = require('express');
const router = express.Router();



router.get('/', (req, res)=>{
res.send('User List');
});

router.get('/new', (req, res)=>{
res.send('User New Form');
});

//router.get('/:id', (req, res)=>{
//res.send(`getting user data: ${req.params.id}`);
//}); 

router.route ('/:id').get((req, res)=>{
res.send(`getting user data: ${req.params.id}`);
}).delete((req, res)=>{
res.send(`deleting user data for id : ${req.params.id}`);
}).put((req, res)=>{
res.send(`updating user data for id : ${req.params.id}`);
});    


module.exports = router;
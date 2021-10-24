const express = require('express');
const router = express.Router();
const User = require("../models/user.model")

// http://localhost:5000/apis/user
router.post("/user", (req, res) => {
    //Create a restaurant
    const newUser = new User({
        name: req.body.name,
        password: req.body.password,
        Tel: req.body.Tel,
        imageurl: req.body.imageurl,
    });

    //Save to database
    User.create(newUser, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user"
            })
        else res.send(data);
    })

});

// GetByid restaurants 
// http://localhost:5000/apis/restaurants/1
router.get('/user/:id', (req, res) => {
    //แปลงจาก string to num
    const userId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    User.getById(userId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `user not found with this id ${userId}`,
                });
            }
            else {
                res.status(500).send({
                    message: "Error retriveving with this id " + userId,
                })
            }
        }
        else {
            res.send(data);
        }
    });
});


// Get all restaurants 
// http://localhost:5000/apis/restaurants
router.get('/user', (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(5000)({
                // ถ้า err.message เป็นจริงก็โชว์ ถ้าไม่ก็โชว์ หลัง ||
                message: err.message || "Some erroe"
            });
        } else {
            res.send(data);
        }
    });
});


//Update restaurants
// http://localhost:5000/apis/restaurants/1 

router.put('/user/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    //เช็คว่า body เป็น object ไหม แล้วเป็นค่าว่างรึป่าว
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "Content Can not be empty!",
        });
    }

    User.updateById(userId, new User(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `User not found with this id: ${userId}`,
                });
            } else {
                res.status(500).send({
                    message: "Error updating user data with this id" + userId,
                });
            }
        } else {
            res.send(data);
        }
    });
});

//Delete by id
// http://localhost:5000/apis/restaurants/1 
router.delete('/user/:id', (req, res) => {
    const userId = Number.parseInt(req.params.id);  //แปลงให้เป็นจำนวนเต็ม
    //เช็คว่า body เป็น object ไหม แล้วเป็นค่าว่างรึป่าว
    User.removeById(userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `user not found with this id: ${userId}`,
                });
            } else {
                res.status(500).send({
                    message: "Error deleting user data with this id" + userId,
                });
            }
        } else {
            res.send({ message: "user is deleted successfully" });
        }

    });
});
module.exports = router;
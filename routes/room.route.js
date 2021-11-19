var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Room = require("../models/Room.model")

const isLoggedIn = require('./../middleware/isLoggedIn')

router.get('/', async (req, res) => {
    try {
        listRooms = await Room.find()
        res.render('rooms/rooms-list', { rooms: listRooms});
    }
    catch (error) {
        res.render('rooms/rooms-list', {error});
    }
});

router.route("/new")
    .get(isLoggedIn, async (req, res) => {
        const users = await User.find()
        res.render("rooms/new-room", { users })
    })
    .post(isLoggedIn, async (req, res) => {
        const { name, description, owner } = req.body
        console.log("req.body: ", req.body)
        try {
            if (!name || !description || !owner) throw new Error("All fileds required")  // res.render("rooms/new-room", { error: { type: "CRROOM_ERR", msg: "All fileds required" } })
            const newRoom = await Room.create({ name, description, owner })
            res.redirect("/rooms")
        } catch (e) {
            res.render("rooms/new-room", { error })
        }
    })

module.exports = router;

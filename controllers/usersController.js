const User = require('../models/user');

const createUser = async (req, res) => {
    
    if(!req.body.name || !req.body.bio) res.status(404).send("Not found");

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        bio: req.body.bio
    })

    res.status(200).json(user)

}

//-----------------------------------------------

const getUser = async(req, res) => {

    const user = await User.find();

    if(!user) res.status(404).send("not found")

    res.status(200).json(user)

}

//-----------------------------------------------

const getFilterUser = async(req, res) => {

    if(!(req.body.name || req.body.bio)) res.status(404).send("Not found");

    const user = await User
    .find({ $or: [ { name: req.body.name },
        {email: req.body.email },
        {bio: req.body.bio} ] })

    .catch(err => {console.log('filter broke', err)});

    if(!user) res.status(404).send("not found")
    
    res.status(200).json(user)

}

//-----------------------------------------------

const updateUser = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    if(!(req.body.name || req.body.bio || req.body.email)) res.status(404).send("Not found");

    const user = await User.findById(req.params.id);
    if(!user) return // if it doesn't exist

    //if(course.isPublished) return; // if it's published

    if(req.body.name) user.name = req.body.name;
    if(req.body.bio)  user.bio = req.body.bio;
    if(req.body.email) user.email = req.body.email
    //if(req.body.ispublished) course.isPublished = req.body.ispublished;

    const result = await user.save();

    if(!result) res.status(404).send("Not found");

    res.status(200).json(result)
}

//-----------------------------------------------

const deleteUser = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    const result = await User.deleteOne({ _id: req.params.id });

    res.status(200).json(result)
}

module.exports = {
    createUser,
    getUser,
    getFilterUser,
    updateUser,
    deleteUser
}
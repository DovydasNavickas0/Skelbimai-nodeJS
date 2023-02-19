const Ads = require('../models/ads');

const createAds = async (req, res) => {
    
    if(!(req.body.name || req.body.description || req.body.price || req.body.user)) res.status(404).send("Not found");

    const ads = await Ads.create({
        name: req.body.name,
        description: req.body.description,
        price:  req.body.price,
        user: req.body.user,
    })

    res.status(200).json(ads)
}

//-----------------------------------------------

const getAds = async(req, res) => {

    const ads = await Ads
        .find()
        .populate('user', '-_id')

    if(!ads) res.status(404).send("not found")

    res.status(200).json(ads)

}

//-----------------------------------------------

const getFilterAds = async(req, res) => {

    if(!(req.body.name || req.body.user)) res.status(404).send("Not found");

    const ads = await Ads
        .find({ $or: [ 
            { name: req.body.name }, 
            { user: req.body.user }
        ]})
        .populate('user', '-_id')

        .catch(err => {console.log('filter broke', err)});

    if(!ads) res.status(404).send("not found")
    
    res.status(200).json(ads)

}

//-----------------------------------------------

const updateAds = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    if(!(req.body.name || req.body.description || req.body.price || req.body.user)) res.status(404).send("Not found");

    const ads = await Ads.findById(req.params.id);
    if(!ads) return // if it doesn't exist

    //if(course.isPublished) return; // if it's published

    if(req.body.name) ads.name = req.body.name;
    if(req.body.description)  ads.description = req.body.description;
    if(req.body.price)  ads.price = req.body.price;
    if(req.body.user)  ads.author = req.body.user;
    //if(req.body.ispublished) course.isPublished = req.body.ispublished;

    const result = await ads.save();

    if(!result) res.status(404).send("Not found");

    res.status(200).json(result)
}

//-----------------------------------------------

const deleteAds = async(req, res) => {

    if(!req.params.id) res.status(404).send("Not found");

    const result = await Ads.deleteOne({ _id: req.params.id });

    res.status(200).json(result)
}

module.exports = {
    createAds,
    getAds,
    getFilterAds,
    updateAds,
    deleteAds
}
const Sites = require("./../models/sites");


exports.addSite = async (req, res, next) => {
  const { siteName } = req.body;
  const newSite = new Sites({ 
    siteName: siteName,
    ownerId: req.user.id 
  })
  newSite.save();
  res.status(200).json({
      "message": "success"
  })
}



exports.getSite = async (req, res, next) => {
    const sites = await Sites.find({ownerId: req.user.id});
    res.send(sites);
}
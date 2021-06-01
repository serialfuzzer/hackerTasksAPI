const Sites = require("./../models/sites")

exports.addSite = async (req, res, next) => {
  const { siteName } = req.body;
  const newSite = new Sites({ siteName })
  newSite.save();
  res.status(200).json({
      "message": "success"
  })
}

exports.getSite = async (req, res, next) => {
    const users = await Sites.find({});
    res.send(users);
}
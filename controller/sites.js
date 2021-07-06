const e = require("express");
const Sites = require("./../models/sites");


exports.addSite = async (req, res, next) => {
  const { siteName } = req.body;
  const newSite = new Sites({ 
    siteName: siteName,
    ownerId: req.user.id 
  })
  newSite.save();
  res.status(200).json(newSite)
}



exports.getSite = async (req, res, next) => {
    const sites = await Sites.find({ownerId: req.user.id});
    res.send(sites);
}

exports.removeSiteByID = async (req, res, next) => {
  const { siteId } = req.body; 
  try {
    const site = await Sites.find({_id: siteId});
    if(Object.keys(site).length > 0){ 
      const ownerID = site[0].ownerId;
      console.log(site);
      console.log(`${ownerID} == ${ req.user.id}`);
      if(ownerID == req.user.id){
        const sites = await Sites.deleteOne({_id: siteId});
        res.status(200).send({
            "msg": "Site removed"
        });
      }
      res.send({
        "error": {
          "msg": "Action not allowed"
        }
      });
    } else {
      res.status(403).json({
        "message": "Site not found"
      })
    }
  }catch(err){
    throw new Error(err);
  }
 
}
const router = require("express").Router();



router.put("/test", (req, res) => {
    res.send("you visited");

});

module.exports = router;
const express = require('express');
const Router = express.Router();

const Url = require('../models/url');

// @route   GET /:code
// @desc    Redirect to long url

Router.get('/:code', async (req, res, next) => {
    try {
        const url = await Url.findOne({ urlCode: req.params.code });

        if(url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No url found');
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
})

module.exports = Router;
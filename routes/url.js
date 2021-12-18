const express = require('express');
const Router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/url');

// @route   POST /api/url/shorten
// @desc    Create short URL
Router.post('/shorten', async (req, res, next) => {
    const { longUrl } = req.body;
    const baseURL = config.get('baseURL');

    if(!validUrl.isUri(baseURL)) {
        return res.status(401).json('Invalid base URL');
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check long url
    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({ longUrl });
            if (url) {
                res.json(url);
            }
            else {
                const shortUrl = baseURL + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        }
        catch (err) {
            console.error(err);
            //res.status(500).json('Invalid long url');
        }
    } else {

    }
})

module.exports = Router;
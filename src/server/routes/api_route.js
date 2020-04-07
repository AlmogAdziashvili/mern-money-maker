const { Router } = require('express');
const NewsAPI = require('newsapi');
const { newsapi } = require('../../../.config').apiKeys;
const axios = require('axios');
const {
  statusCodes, generateError,
} = require('../utils/utils');

const newsClient = new NewsAPI(newsapi);

const router = Router();

router.get('/forex/:symbol', (req, res) => res.redirect(`https://financialmodelingprep.com/api/v3/historical-price-full/forex/${req.params.symbol}`));

router.get('/quote/:symbol', (req, res) => res.redirect(`https://financialmodelingprep.com/api/v3/quote/${req.params.symbol}`));

router.get('/news', async (req, res) => {
  try {
    const { articles } = await newsClient.v2.topHeadlines({
      category: 'business',
      language: 'en',
      country: 'us',
      pageSize: 8,
    });
    return res.send(articles);
  } catch (err) {
    return generateError(req, res, statusCodes.internalServerError, 'server error');
  }
});

router.get('/calendar', async (req, res) => {
  try {
    const { data } = await axios.get('https://cdn-nfs.faireconomy.media/ff_calendar_thisweek.json');
    return res.send(data);
  } catch (err) {
    return generateError(req, res, statusCodes.internalServerError, 'server error');
  }
});

module.exports = router;

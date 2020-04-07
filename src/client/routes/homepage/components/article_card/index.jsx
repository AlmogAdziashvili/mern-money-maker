/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Card, CardContent, Typography, CardActionArea, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import './style.css';

function ArticleCard({ article }) {
  function openLinkInNewTab(link) {
    return window.open(link, '_blank');
  }

  return (
    <Card raised className="article-card">
      <CardActionArea className="action-area" onClick={() => openLinkInNewTab(article.url)}>
        <CardMedia
          component="img"
          height="160"
          image={article.urlToImage}
          title={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" className="article-title">
            {article.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" className="article-description">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleCard;

import React from 'react';
import PropTypes from 'prop-types';

// Components
import {
  Typography, Grid,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import ArticleCard from '../article_card';

// CSS
import './style.css';

function NewsFeed({ newsScope }) {
  return (
    <>
      <Typography variant="h4" className="news-title" display="inline">
        News Feed
      </Typography>
      {newsScope.news
        ? (
          <Grid container className="news-container" spacing={3}>
            {newsScope.news
              .filter(article => article.title && article.description && article.urlToImage)
              .slice(0, 4)
              .map(article => (
                <Grid key={article.title} item sm={3}>
                  <ArticleCard article={article} />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Grid container className="news-container" spacing={3}>
            {[0, 1, 2, 3].map(i => (
              <Grid item sm={3} key={i} >
                <Skeleton variant="rect" height={303} />
              </Grid>
            ))}
          </Grid>
        )
      }
    </>
  );
}

NewsFeed.defaultProps = {
  newsScope: {},
};

NewsFeed.propTypes = {
  newsScope: PropTypes.object,
};

export default NewsFeed;

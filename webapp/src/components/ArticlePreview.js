import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import DateRange from './DateRange';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: ARTICLE_FAVORITED,
    payload: agent.Articles.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: agent.Articles.unfavorite(slug)
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (article.favorited) {
      props.unfavorite(article.slug);
    } else {
      props.favorite(article.slug);
    }
  };

  return (
    <div className="article-preview">
      <a href={article.facebookLink} target="_blank" class="preview-link">
        <div style={{margin: '0 10px'}}>
        <h1>{article.title}</h1>
        <DateRange start={article.start} end={article.end} /><p style={{float: 'right'}}>{article.venue}</p>
        </div>
        <img class="img-fluid" src={article.image} style={{'min-height': '50px'}} />
        <span>&nbsp;</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </a>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);

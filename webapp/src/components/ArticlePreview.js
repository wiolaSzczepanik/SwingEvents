import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import DateRange from './DateRange';

const ArticlePreview = props => {
  const article = props.article;

  return (
    <div className="article-preview">
      <a href={article.facebookLink} target="_blank" class="preview-link">
        <div>
            <h1>{article.title}</h1>
            <DateRange start={article.start} end={article.end} /><p style={{float: 'right'}}>{article.venue}</p>
            <img class="img-fluid" src={article.image} style={{'min-height': '50px'}} />
            <span>&nbsp;</span>
                <div style={{float: 'left'}}>
                    <button style={{margin: '10px'}} className="btn btn-primary pull-xs-right btn-sm" onClick={this.displayQuestion}>ADD EVENT</button>
                </div>
                <ul className="tag-list">{
                    article.tagList.map(tag => {
                        return (
                        <li style={{margin: '15px'}} className="tag-default tag-pill tag-outline" key={tag}>
                        {tag}
                        </li>)
                    })
                }
                </ul>
         </div>
      </a>
    </div>
  );
}

export default connect(() => ({}))(ArticlePreview);

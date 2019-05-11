import ArticleList from '../ArticleList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';
import OngoingEvent from '../OngoingEvent'
import ForegoneEvent from '../ForegoneEvent'

import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";

const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
      props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {

  const clickHandler = ev => {
    ev.preventDefault();
    props.history.push("/");
    props.onTabClick('all', agent.Articles.upcoming, agent.Articles.upcoming());
  };

   return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Nadchodzące wydarzenia
      </a>
    </li>
  );
};

const PastFeedTab = props => {

  const clickHandler = ev => {
    ev.preventDefault();
    props.history.push("/past");
    props.onTabClick('past', agent.Articles.past, agent.Articles.past());
  };

   return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'past' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Minione wydarzenia
      </a>
    </li>
  );
};

const UserFeedTab = props => {

  const clickHandler = ev => {
    ev.preventDefault();
    props.history.push("/my");
    props.onTabClick('my', agent.Articles.past, agent.Articles.my());
  };

   return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'past' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Moje wydarzenia
      </a>
    </li>
  );
};


const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            token={props.token}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} history={props.history} />
          <PastFeedTab tab={props.tab} onTabClick={props.onTabClick} history={props.history} />
          <UserFeedTab tab={props.tab} onTabClick={props.onTabClick} history={props.history} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <ArticleList
        pager={props.pager}
        articles={props.articles}
        loading={props.loading}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainView));

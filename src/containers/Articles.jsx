import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// graphQL query
const ARTICLES_QUERY = gql`
  query {
    articles {
      _id,
      title,
      description,
      body,
      createdAt
    }
  }
`;

class Articles extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-5 my-3">Articles</h1>
          </div>
          <div className="col-md-4 my-3">
            <Link to={`/create_article`} className="btn btn-primary pull-right">
              <i className="fa fa-plus" aria-hidden="true"></i>
            </Link>
          </div>
        </div>

        <div>
          <Query query={ARTICLES_QUERY}>
            {
              ({ loading, error, data }) => {
                if (loading) return <h4>Loading...</h4>;
                else if (error) {
                  console.log(error);
                  return <div>Error...</div>;
                } else {
                  return (
                    <Fragment>
                      {
                        data.articles.map((article, index) => (
                          <div className="card card-body mb-3" key={index}>
                            <div className="row">
                              <div className="col-md-9">
                                <h4>{article.title} </h4>
                                <div>{article.description}</div>
                                <p>
                                  {article.body}
                                </p>
                                <p>
                                  Date: <Moment format="YYYY-MM-DD HH:mm">{article.createdAt}</Moment>
                                </p>
                              </div>
                              <div className="col-md-3">
                                <Link to={`/article/${article._id}`} className="btn btn-secondary pull-right">
                                  <i className="fa fa-eye" aria-hidden="true"></i>
                                </Link>
                                <Link to={`/edit_article/${article._id}`} className="btn btn-secondary pull-right" style={{ marginRight: '10px' }}>
                                  <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </Fragment>
                  );
                }
              }
            }
          </Query>
        </div>

      </Fragment>
    )
  }
};

export default Articles;


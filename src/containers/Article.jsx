import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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

const ARTICLE_QUERY = gql`
  query ($articleId: ID!) {
    article(articleInput: {_id: $articleId}) {
      _id,
      title,
      description,
      body,
      createdAt
    }
  }
`;

const ARTICLE_DELETE = gql`
  mutation ($articleId: ID!) {
    deleteArticle(articleInput: {_id: $articleId}) {
      n
    }
  }
`;

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      articleId: '',
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }

  deleteHandler = (articleId) => {
    this.setState({ articleId });
    this.toggle();
  }
  deleteArticle = () => {
    console.log('deleted');
    this.toggle();
  }

  render() {
    let { articleId } = this.props.match.params;
    // console.log('articleId', articleId);
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-8">
            <h1 className="display-5 my-3">Article Details</h1>
          </div>
          <div className="col-md-4 my-3">
            <Link to="/" className="btn btn-primary pull-right">
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
          </div>
        </div>

        <div>
          <Query query={ARTICLE_QUERY} variables={{ articleId }}>
            {
              ({ loading, error, data }) => {
                if (loading) return <h4>Loading...</h4>;
                else if (error) {
                  console.log(error);
                  return <div>Error...</div>;
                } else {
                  return (
                    <Fragment>
                      <div className="card card-body mb-3">
                        <div className="row">
                          <div className="col-md-9">
                            <h4>{data.article.title} </h4>
                            <div>{data.article.description}</div>
                            <p>
                              {data.article.body}
                            </p>
                            <p>
                              Date: <Moment format="YYYY-MM-DD HH:mm">{data.article.createdAt}</Moment>
                            </p>
                          </div>
                          <div className="col-md-3">
                            <Button color="danger" className="pull-right" onClick={this.deleteHandler.bind(this, data.article._id)}>
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                }
              }
            }
          </Query>
        </div>

        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Delete Article</ModalHeader>
            <ModalBody>
              <h4>Do you want to delete?</h4>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle} style={{ marginRight: '20px' }}>No</Button>
              <Mutation
                mutation={ARTICLE_DELETE}
                onCompleted={() => this.toggle && this.props.history.push('/')}
                refetchQueries={[
                  {
                    query: ARTICLES_QUERY,
                  }
                ]}
              >
                {(deleteArticle, { data, loading, error }) => (
                  <div>
                    <Button
                      color="danger"
                      onClick={e => {
                        e.preventDefault();
                        deleteArticle({ variables: { articleId: articleId } });
                      }}
                    >
                      Yes
                    </Button>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: Please try again</p>}
                  </div>
                )}
              </Mutation>
            </ModalFooter>
          </Modal>
        </div>

      </Fragment>
    )
  }
};

export default Article;


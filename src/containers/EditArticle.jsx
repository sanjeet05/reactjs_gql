import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Link } from 'react-router-dom';


// graphQL query
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

const EDIT_ARTICLE = gql`
  mutation ($articleId: ID!, $title: String!, $description: String, $body: String!) {
    editArticle(articleInput: {_id: $articleId, title: $title, description: $description, body: $body}) {
      _id,
      title,
      description,
      body,
      createdAt
    }
  }
`;

class EditArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  redirectToHome = () => {
    this.props.history.push('/');
  }

  render() {
    let { articleId } = this.props.match.params;
    return (
      <Fragment>
        <h3 className="display-5 my-3">Edit Article</h3>
        <div>
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-9">
                <Query query={ARTICLE_QUERY} variables={{ articleId }}>
                  {
                    ({ loading, error, data }) => {
                      if (loading) return <h4>Loading...</h4>;
                      else if (error) {
                        console.log(error);
                        return <div>Error...</div>;
                      } else {
                        return <EditForm data={data.article} redirectToHome={this.redirectToHome} />
                      }
                    }
                  }
                </Query>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
};

export default EditArticle;

// edit form
class EditForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: '',
      title: '',
      description: '',
      body: '',
    }
  }

  componentDidMount() {
    this.updateState(this.props.data);
  }

  updateState = (article) => {
    // console.log('article', article)
    this.setState({
      _id: article._id,
      title: article.title,
      description: article.description,
      body: article.body,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data._id !== this.state._id) {
      this.updateState(this.props.data);
    }
  }

  titleChange = (e) => { this.setState({ title: e.target.value }) }
  descriptionChange = (e) => { this.setState({ description: e.target.value }) }
  bodyChange = (e) => { this.setState({ body: e.target.value }) }

  render() {
    const { _id, title, description, body } = this.state;
    return (
      <Fragment>
        <Mutation
          mutation={EDIT_ARTICLE}
          onCompleted={this.props.redirectToHome}
        >
          {(updateArticle, { data, loading, error }) => (
            <div>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Enter Title"
                    defaultValue={title}
                    onChange={this.titleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter Description"
                    defaultValue={description}
                    onChange={this.descriptionChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Text</label>
                  <textarea
                    className="form-control"
                    rows="15"
                    id="body"
                    placeholder="Enter Text"
                    value={body}
                    onChange={this.bodyChange}
                  >
                  </textarea>
                </div>

                <div className="text-center">
                  <Link to="/" className="btn btn-secondary">
                    Cancel
                </Link>

                  <button
                    style={{ marginLeft: '20px' }}
                    type="button"
                    className="btn btn-primary"
                    onClick={e => {
                      e.preventDefault();
                      updateArticle({ variables: { articleId: _id, title, description, body } });
                    }}
                  >
                    Update
                </button>
                </div>
              </form>
              {loading && <p>Loading...</p>}
              {error && <p>Error: Please try again</p>}
            </div>
          )}
        </Mutation>
      </Fragment>
    )
  }
};


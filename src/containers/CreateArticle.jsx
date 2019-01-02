import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
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

const ADD_ARTICLE = gql`
  mutation ($title: String!, $description: String, $body: String!) {
    createArticle(articleInput: {title: $title, description: $description, body: $body}) {
      _id,
      title,
      description,
      body,
      createdAt
    }
  }
`;

class CreateArticle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      body: '',
    }
  }

  titleChange = (e) => { this.setState({ title: e.target.value }) }
  descriptionChange = (e) => { this.setState({ description: e.target.value }) }
  bodyChange = (e) => { this.setState({ body: e.target.value }) }

  render() {
    const {title, description, body} = this.state;
    console.log('description', description);
    return (
      <Fragment>
        <h3 className="display-5 my-3">Create Article</h3>
        <div>
          <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-9">

                <Mutation
                  mutation={ADD_ARTICLE}
                  onCompleted={() => this.props.history.push('/')}
                  refetchQueries={[
                    {
                      query: ARTICLES_QUERY,
                    }
                  ]}
                >
                  {(addArticle, { data, loading, error }) => (
                    <div>
                    <form>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          placeholder="Enter Title"
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
                          onChange={this.bodyChange}
                        >
                        </textarea>
                      </div>

                      <div className="text-center">
                        <Link to="/" className="btn btn-secondary">
                          Cancel
                        </Link>

                        <button
                          style={{marginLeft: '20px'}}
                          type="button"
                          className="btn btn-primary"
                          onClick={e => {
                            e.preventDefault();
                            addArticle({ variables: { title, description, body } });
                          }}
                        >
                          Create
                        </button>
                      </div>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: Please try again</p>}
                    </div>
                  )}
                </Mutation>

              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
};

export default CreateArticle;


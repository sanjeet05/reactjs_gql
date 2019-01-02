import React, { Component, Fragment } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import components
import NavBar from './containers/NavBar';
import Articles from './containers/Articles';
import Article from './containers/Article';
import CreateArticle from './containers/CreateArticle';
import EditArticle from './containers/EditArticle';

// import css
import './App.scss';

// graphQL config
const client = new ApolloClient({
  uri: 'http://localhost:3100/api/graphql'
});

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
    }
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Fragment>
        <ApolloProvider client={client}>
          <Router>
            <div>
              <NavBar toggleNavbar={this.toggleNavbar} collapsed={collapsed} />
              <div className="container">
                <Route exact path="/" component={Articles} />
                <Route exact path="/create_article" component={CreateArticle} />
                <Route exact path="/article/:articleId" component={Article} />
                <Route exact path="/edit_article/:articleId" component={EditArticle} />
              </div>
            </div>
          </Router>
        </ApolloProvider>
      </Fragment>
    )
  }
};

export default App;

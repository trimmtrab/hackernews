import React, { Component } from 'react';
import axios from 'axios';

import Button from './components/Button';
import Search from './components/Search';
import Table from './components/Table';

import './App.css';

const DEFAULT_QUERY = 'Redux';
const DEFAULT_HPP = 100;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      // updates only when search form is submitted
      searchKey: '',
      // updates according to current input value
      searchTerm: DEFAULT_QUERY,
      // indicates error during fetch
      error: null,
      fetchingStories: false,
    };
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    this.setState({ fetchingStories: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this.setSearchTopStories(result))
      .catch(error => this.setState({ error }))
      .then(() => { this.setState({ fetchingStories: false }); });
  }

  // client makes a request to the API only once
  needsToSearchTopStories = searchTerm => !this.state.results[searchTerm]; // eslint-disable-line

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result.data;
    const { searchKey, results } = this.state;

    const oldHits = results && result[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits,
    ];

    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      },
    });
  }

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      fetchingStories,
    } = this.state;

    const page = (
      results
      && results[searchKey]
      && results[searchKey].page
    ) || 0;

    const list = (
      results
      && results[searchKey]
      && results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            showSpinner={fetchingStories}
          >
            More
          </Button>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <div className="content">
          {error
            ? <p>Something went wrong ¯\_(ツ)_/¯</p>
            : <Table list={list} onDismiss={this.onDismiss} />
          }
        </div>
      </div>
    );
  }
}

export default App;

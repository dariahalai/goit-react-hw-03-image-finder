import  React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

import { AppContainer } from 'App.styled';

export class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} />
        <ToastContainer autoClose={3000} theme="colored"/>
      </AppContainer>
    );
  }
}

//
// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

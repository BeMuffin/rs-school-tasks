import React, { Component } from 'react';

type Props = {
  onSearch: (value: string) => void;
};

type State = {
  searchTerm: string;
};

class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: this.getLocalStorageValue(),
    };
  }

  getLocalStorageValue = () => localStorage.getItem('pokemon') || '';

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleButtonClick = () => {
    this.props.onSearch(this.state.searchTerm.toLowerCase());
    localStorage.setItem('pokemon', this.state.searchTerm);
  };

  render() {
    return (
      <div>
        <input
          type="search"
          onChange={this.handleChange}
          value={this.state.searchTerm}
        ></input>
        <button onClick={this.handleButtonClick}>Search</button>
      </div>
    );
  }
}

export default SearchBar;

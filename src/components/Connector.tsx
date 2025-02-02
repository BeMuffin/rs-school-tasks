import { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import ErrorBoundary from './ErrorBoundary';
import axios from 'axios';

type State = {
  searchTerm: string;
  pokemons: { name: string; description: string }[];
  error: string | null;
  loading: boolean;
  throwError: boolean;
};

class Connector extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      searchTerm: '',
      pokemons: [],
      error: null,
      loading: false,
      throwError: false,
    };
  }

  componentDidMount() {
    this.fetchAllPokemons();
  }

  fetchAllPokemons = async () => {
    try {
      const response = await axios.get(
        'https://pokeapi.co/api/v2/pokemon-species?limit=20'
      );
      const pokemonList = response.data.results;

      const detailedPokemons = await Promise.all(
        pokemonList.map(async (pokemon: { name: string; url: string }) => {
          const details = await axios.get(pokemon.url);
          const flavorTextEntry = details.data.flavor_text_entries.find(
            (entry: any) => entry.language.name === 'en'
          );

          return {
            name: details.data.name,
            description: flavorTextEntry
              ? flavorTextEntry.flavor_text
              : 'No description available',
          };
        })
      );

      this.setState({ pokemons: detailedPokemons, error: null });
    } catch (error) {
      this.setState({
        error: 'Failed to load Pokémon list.',
        pokemons: [],
        loading: false,
      });
    }
  };

  handleSearch = async (value: string) => {
    if (!value) {
      this.fetchAllPokemons();
      return;
    }

    this.setState({ loading: true, error: null });

    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${value}`
      );
      const flavorTextEntry = response.data.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      );

      this.setState({
        pokemons: [
          {
            name: response.data.name,
            description: flavorTextEntry
              ? flavorTextEntry.flavor_text
              : 'No description available',
          },
        ],
        error: null,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Pokémon not found. Please try again.',
        pokemons: [],
        loading: false,
      });
    }
  };

  handleThrowError = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Error! Please try again');
    }

    return (
      <ErrorBoundary>
        <SearchBar onSearch={this.handleSearch} />
        {this.state.loading ? (
          <div className="loader"></div>
        ) : (
          <SearchResult
            pokemons={this.state.pokemons}
            error={this.state.error}
          />
        )}
        <button className="error-button" onClick={this.handleThrowError}>
          Throw Error
        </button>
      </ErrorBoundary>
    );
  }
}

export default Connector;

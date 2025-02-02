import { Component } from 'react';

type Props = {
  pokemons: { name: string; description: string }[];
  error: string | null;
};

class SearchResult extends Component<Props> {
  render() {
    const { pokemons, error } = this.props;

    if (error) {
      return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
      <div>
        <h2>Pokemon List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon, index) => (
              <tr key={index}>
                <td>{pokemon.name}</td>
                <td>{pokemon.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SearchResult;

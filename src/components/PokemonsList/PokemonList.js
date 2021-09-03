import React, { Component } from 'react';
import axios from 'axios';
import PokemonCard from '../PokemonsCard/PokemonCard'
import Pagination from '../../atoms/pagination';
import Loading from "../../layout/Loading"

class PokeListContainer extends Component {
  state = {
    pokeData: [],
    currentOffset: 0,
    pageCounter: 1,
  }
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps, prevState) {
    const { currentOffset } = this.state;
    if (currentOffset !== prevState.currentOffset) {
      if (currentOffset < 0) {
        this.setState({
          currentOffset: 0,
          pageCounter: 1,
        });
        this.fetchData(prevState.currentOffset);
      }
      this.fetchData(currentOffset);
    }
  }
  fetchData = (offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon`;
    let params = {
      offset: offset,
      limit: 5,
      languages: 9,
    }

 
    axios.get(url, { params })
      .then(res => {
        const { results } = res.data;
        this.setState({
          pokeData: results,
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  increment = () => {
    const { currentOffset, pageCounter } = this.state;
    this.setState({
      currentOffset: currentOffset + 5,
      pageCounter: pageCounter + 1,
    });
  }
  decrement = () => {
    const { currentOffset, pageCounter } = this.state;
    this.setState({
      currentOffset: currentOffset - 5,
      pageCounter: pageCounter - 1,
    });
  }
  render() {
    const { pageCounter } = this.state;
    return (
      <>
        <div>
   
          {this.state.pokeData ? (
            <div className="row">
              {this.state.pokeData.map(pokeData => (
                <PokemonCard
                  key={pokeData.name}
                  name={pokeData.name}
                  url={pokeData.url}
                />
              ))}
              
              <Pagination
                increment={this.increment}
                decrement={this.decrement}
                page={pageCounter}
              />
          
            </div>
          ) : <Loading />
          }
        </div>
      </>
    );
  }
}
export default PokeListContainer;
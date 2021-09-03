/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import Axios from 'axios';
import counterpart from 'counterpart';
import Translate from 'react-translate-component';
import { TYPE_COLORS } from '../utils/colors';
import es from '../Translates/es'
import en from '../Translates/en'


counterpart.registerTranslations('es', es);
counterpart.registerTranslations('en', en);
counterpart.setLocale('es');

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    statTitleWidth: 3,
    statBarWidth: 9,
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: ''
    },
    height: '',
    weight: '',
    eggGroups: '',
    catchRate: '',
    abilities: '',
    genderRatioMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
    themeColor: '#EF5350'
  };

  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}?limit=5`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}?limit=5`;
    const pokemonRes = await Axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    // eslint-disable-next-line array-callback-return
    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });
    const height = "20px"

    const weight = "20px"
    

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const abilities = pokemonRes.data.abilities
      .map(ability => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', ');

    const evs = pokemonRes.data.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');

    await Axios.get(pokemonSpeciesUrl).then(res => {
      let description = '';
      // eslint-disable-next-line array-callback-return
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          // eslint-disable-next-line array-callback-return
          return;
        }
      });
      const femaleRate = res.data['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups']
        .map(group => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      themeColor,
      height,
      weight,
      abilities,
      evs
    });
  }

  render() {


    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <button className="ExitButton" onClick={() => this.props.history.goBack()}> X </button>
            <div className="row">
              <div className="col-5">
                <h5>    {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map(type => (
                    <span
                      key={type}
                      className="badge badge-pill mr-1"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: 'white'
                      }}
                    >
                      {type
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className=" col-md-3 ">
               
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                </h4>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                  <Translate content="Hp" />
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.hp}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                  <Translate content="Attack" />
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.attack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                  <Translate content="Defense" />
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.defense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                  <Translate content="Speed" />
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.speed}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                  <Translate content="SpAtk" />
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialAttack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialAttack}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                  <Translate content="SpDef" />
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialDefense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialDefense}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col">
                <p className="">{this.state.description}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">  <Translate content="Profile" /></h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right">  <Translate content="Height" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.height} ft.</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">  <Translate content="Weight" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.weight} lbs</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right">  <Translate content="CatchRate" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.catchRate}%</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right"><Translate content="GenderRatio" />:</h6>
                  </div>
                  <div className="col-6">
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioFemale}%`,
                          backgroundColor: '#c2185b'
                        }}
                        aria-valuenow="15"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioFemale}</small>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.genderRatioMale}%`,
                          backgroundColor: '#1976d2'
                        }}
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.genderRatioMale}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row">
                  <div className="col-6">
                    <h6 className="float-right"><Translate content="EggGroups" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.eggGroups} </h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right"><Translate content="HatchSteps" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.hatchSteps}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right"><Translate content="Abilities" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.abilities}</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-right"><Translate content="EVs" />:</h6>
                  </div>
                  <div className="col-6">
                    <h6 className="float-left">{this.state.evs}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

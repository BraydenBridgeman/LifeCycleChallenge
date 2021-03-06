import React, { Component } from 'react'
import './PokeFetch.css';

class PokeFetch extends Component {
  constructor() {
    super()
    this.tick = this.tick.bind(this)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timerCountDown: 10,
      shadowOn: 0,
      answer: false
    }
  }

  // fetch api call for pokemon image and name

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .catch((err) => console.log(err))
      this.setState({ timerCountDown: 10 });
      this.setState({ shadowOn: 0 });
      this.setState({ answer: true });
      this.timer = setInterval(this.tick, 1000);
  }

  // timer function that will clear interval (clear the DOM) once timer hits 0. This will clear image, reset timer, and reset api fetch call.

  tick () {
    if (this.state.timerCountDown > 0) {
      this.setState({timerCountDown : this.state.timerCountDown - 1})
    } else {
      clearInterval (this.timer);
      this.setState({ shadowOn: 100 });
      this.setState({ answer: false });
    }
  }

  // return the sprite, use contrast (contrast is used to darken image, thanks W3 schools!) and display name. Added text to incorporate more usability

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.timerCountDown} Seconds Left!</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={{filter: `contrast(${this.state.shadowOn}%)`}} src={this.state.pokeSprite} alt="Pokemon Sprite" />
          <h1 className={'pokeName'}>{(this.state.answer) ? "Who's that Pokemon?" : (this.state.pokeName) }</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;
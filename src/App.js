import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Favmeme from './favmeme';
import Update from './title'

class App extends Component {
  constructor(){
    super();
    this.state = {
        memes: [],
        favorites: [],
        time: [],
        quote: []

    }
    this.buttonClicked = this.buttonClicked.bind(this)
    this.deleteFav = this.deleteFav.bind(this)
    this.datetimeApi = this.datetimeApi.bind(this)
    this.quoteApi = this.quoteApi.bind(this)
  }
  
  componentDidMount(){
    axios.get('https://api.imgflip.com/get_memes').then(response => {
      this.setState({
        memes: response.data.data.memes
      })
    })
  }
  buttonClicked(meme){
    console.log('clicked')
    axios.post("/api/favorites", meme).then(response => {
        this.setState({
        favorites: response.data
          
        })
        
      })
  }
  
  deleteFav(id) {
    axios.delete(`/api/favorites/${id}`).then(results => {
        this.setState({
          favorites: results.data
        })
    })
  }
  datetimeApi(){
    axios.get('http://worldclockapi.com/api/json/est/now').then(results => {
      this.setState({
        time: results.data.currentDateTime
      })
    })
  }
  quoteApi(){
    axios.get('https://talaikis.com/api/quotes/random/').then(results => {
      this.setState({
        quote: results.data.quote
      })
    })
  }
  

  render() {
    let faveMemesToDisplay = this.state.favorites.map((meme, i) => {
      return(
        <Favmeme
          meme={meme}
          id = {meme.id}
          deleteFavFn = {this.deleteFav}
          />
       
      )
    })
    return (
      <div className="App">
        <h1 className="meme-h1">Memes</h1>
        <div className="time">
          {this.state.time}
          <button className="button-chea" onClick={this.datetimeApi}>Date and Time</button>
        </div>
        <div className="quote">
          {this.state.quote}
        </div>
        <button className="button-chea" onClick={this.quoteApi}>Quotes</button>
        
        <div>
          {this.state.memes.map(meme => {
            
            return(
              <div className="meme-div">
                <img className="img-size"src={`${meme.url}`} alt=""/>
                
                <button className="button-reg" onClick={(e) => this.buttonClicked(meme)}>Add to Favorites</button>
                
              </div>
              
            )
          })}
        </div> 
        <div>
            <h1 className="fav-title">
                Favorite Memes
            </h1>
            <Update/>
            {/* <h2 className="fav-name">Austin's <button className="update-button">Update</button></h2> */}
              <div className="fav-memes">
                {faveMemesToDisplay}
              </div>
        </div>
        
        
      </div>
      
    )
    
          
  }
}

export default App

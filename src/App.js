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
        favorites: []
    }
    this.buttonClicked = this.buttonClicked.bind(this)
   
    this.deleteFav = this.deleteFav.bind(this)
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
                My Favorite Memes
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

import React, { Component } from 'react'
import MovieAPI from '../api/MovieAPI.js'

import MovieList from '../Components/Movie_List.js';


class ProfilePage extends Component {
  state = {
    Movies: []
  }
  
  componentDidMount() {
	  console.log("ComponentMounted");


	
    MovieAPI.fetchUserRecommendationHistory()
      .then((Movies) => this.setState({
        Movies: Movies['recs']
	}));

	console.log(this.state.Movies);
  
  }



  
  render() {

    return (
      <div>
        <h1> Your Movies ! </h1>
        <MovieList Movies={this.state.Movies} />

      </div>
    )
  }
}

export default ProfilePage
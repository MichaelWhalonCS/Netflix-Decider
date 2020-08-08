import React, { Component } from 'react'
import MovieAPI from '../api/MovieAPI.js'

import MovieList from '../Components/Movie_List.js';
import SingleMovie from '../Components/SingleMovie.js'


class MovieDetailsPage extends Component {
  state = {
	Movie: [],
	Ratings: [],
  }

  



  componentDidMount() {
	  console.log("ComponentMounted");
	  console.log(this.state.Movie.title)
	//   MovieAPI.fetchYoutubeTrailerID(this.state.Movie.title).then(VideoID => {
	// 	  console.log(VideoID)
	// 	  if (VideoID.length >0){
	// 	  const VideoId = VideoID["items"][0]["id"]["videoId"]
	// 	  alert(VideoId)
	// 	  this.setState({
	// 		  videoID: VideoId
	// 	  });
	// 	}
	//   });


	// change the arg below to the id in the url
    MovieAPI.fetchSingleRecommendation(this.props.match.params.recID)
      .then((movie) => this.setState({
        Movie: movie.recs[0]
	}));

	MovieAPI.fetchRatings(this.props.match.params.recID)
	.then((ratings) => this.setState({
        Ratings: ratings.ratings
	}));


  
  }



  
  render() {
	  
    return (
      <div>

        <SingleMovie Movie={this.state.Movie} Ratings ={this.state.Ratings} />

      </div>
    )
  }
}

export default MovieDetailsPage
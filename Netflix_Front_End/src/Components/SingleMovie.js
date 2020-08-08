import React, { Component } from 'react';
import YouTube from 'react-youtube';
import MovieAPI from '../api/MovieAPI.js';
import RatingForm from '../Components/AddRatingForm'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';




class SingleMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			videoID: null
			
		  }
		  this.HandleClick = this.HandleClick.bind(this);
		  this.HandleSubmitRating = this.HandleSubmitRating.bind(this);
		
	}

	//Youtube Functionality eliminated for Scope
	// componentDidMount() {
	// 	console.log("ComponentMounted");
	// 	console.log(this.props.Movie.title)
	//     MovieAPI.fetchYoutubeTrailerID(this.props.Movie.title).then(VideoID => {
	//   	  console.log(VideoID)
	  	 
	//   	  const VideoId = VideoID["items"][0]["id"]["videoId"]
	  	  
	//   	  this.setState({
	// 		videoID: VideoId
	//   	  });
		
	//     });

	// 	};

	

	
	HandleClick(evt) {
	  evt.preventDefault();
	  MovieAPI.fetchDeleteRecommendation(this.props.Movie.id).then(this.setState({redirect: true}));
  }

   HandleSubmitRating(evt) {
	evt.preventDefault();
	console.log('Submitted');
	const NumberOfStars = (evt.target[0].value).toString();
	
	const Description = (evt.target[1].value);
	//fetch the current user info as the last piece of information we need to create a rating object
	MovieAPI.fetchCurrentUser().then(userObject => {
	const ratingObject = {
			stars: NumberOfStars,
			User: userObject,
			description: Description,
			recommendation: this.props.Movie
		
		}
		console.table(ratingObject);
		MovieAPI.addRating(ratingObject, this.props.Movie.id).then(result => {
			this.setState({redirect: true});

		})

	})
	

	
	// .then(this.setState({redirect: true}))
	// fetch the create new rating view	using the parameters from *this.rating.value[0] or something like that

   }


	  render(){
		
		// cleanStr = str.replace("&#39;", "");
		
		if (this.state.redirect) {
			return <Redirect push to="/Profile" />;
		  }
		// let listRatings = []
		// //MovieAPI.fetchYoutubeTrailerID('Joyner Lucas')
		// if (this.props.Ratings) {
		let listRatings = this.props.Ratings.map((rating, index) =>
        <li key={index}>
			User:{rating.User}<br></br>
			Stars:{rating.stars}<br></br>
			Description:{rating.description}
		</li> 
	);

		return (
<div>
	<br></br>

		<h1>{this.props.Movie.title}</h1>
		<img 
	  	src={this.props.Movie.image_url}
		/>
	<br></br>
		<div>{this.props.Movie.synopsis}</div>
	<br></br>
	<br></br>
	<br></br>
	<br></br>
	<br></br>
	<br></br>
	<br></br>


{/* When a Movie is passed down from the state of SurveyPage, create the ability to remove the recommendation and leave a rating  */}
{this.props.Movie.id ?
	  <div>

<Button onClick = {this.HandleClick}>Remove From Recommendations</Button>

		
		{this.props.Ratings.length >0 &&
		<div>
		<h3>Ratings here</h3>	
		<ul>
		{listRatings}
		</ul>
		</div>
	  	}
		 
   
	<div>
<div>Seen it? Leave a Rating below</div>
< RatingForm HandleSubmitRating={this.HandleSubmitRating} />
</div>
</div>
: " "
	}

		
	 





	</div>
		 
		 )
	  }
}

export default SingleMovie
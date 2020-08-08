

//Hey this page is going to be cool
// on the left, person one will input their interests, on the right person two will put their interests. When both are input fully, the center will populate a Movie Cover, Youtube video, and IMDB rating. If either side wants to change their requirements, they just click the submit button again
//Movie length on a slider
//

import React, { Component } from "react";
import MovieAPI from '../api/MovieAPI.js'
import SingleMovie from '../Components/SingleMovie.js'
import SurveyForm from '../Components/SurveyForm.js'


// import SurveyForm from '../Components/SurveyForm.js';


// https://github.com/rjsf-team/react-jsonschema-form for a good form library

class SurveyPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ReturnedMovie: [],
			Ratings: []
		  }
		  this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	
	genreID = {
		'Action': 10673,
		'Anime': 2653,
		'Children': 561
	}



	componentDidMount() {
		

	  };

	  
	  handleSubmit(evt) {
		evt.preventDefault();
		MovieAPI.fetchNewRecommendationByGenre(this.genreID[evt.target.first.value])
		.then((newmovie) => this.setState({
			ReturnedMovie: newmovie['recs'][0]
		}))
	}




	render() {

	  return (
	<div>
		{this.state.FirstGenre}
		<SurveyForm handleSubmit={this.handleSubmit}/>
		Submit to see your random Movie Choice!



			<SingleMovie Movie={this.state.ReturnedMovie} Ratings={this.state.Ratings} />
			

	</div>
	)
	}
	};

export default SurveyPage;



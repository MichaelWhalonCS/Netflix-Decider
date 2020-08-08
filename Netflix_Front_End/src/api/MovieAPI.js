

const fetchUserRecommendationHistory = () => {
   return fetch('http://127.0.0.1:8000/movies/current_user/all_recommendations',{
	headers: {
	
	  Authorization: `JWT ${localStorage.getItem('token')}`,
	  'Content-Type': 'application/json',
	}})
	.then(res => res.json())
	.then(console.log('response received'))
}




const fetchSingleRecommendation = (recID) => {
	return fetch(`http://127.0.0.1:8000/movies/current_user/${recID}`, {headers: {
	
		Authorization: `JWT ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json',
	}
	})
	  .then((response) => response.json())
  };

  const fetchRatings = (recID) => {
	return fetch (`http://127.0.0.1:8000/movies/current_user/ratings/${recID}`, {headers: {
	
		Authorization: `JWT ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json',
	}
	})
	  .then((response) => response.json())
  };
 




const fetchNewRecommendationByGenre = (genre) => {
	return fetch(`http://127.0.0.1:8000/movies/new/${genre}`, {headers: {
	
		Authorization: `JWT ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json',
	  }
	})
	  .then((response) => response.json())
  };



// const fetchYoutubeTrailerID = (movieTitle) => {
// 	return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=2&q=${movieTitle}+trailer&key=AIzaSyAc7nIcdUCO09x3EIWBzFnIhzD6dfhxLzE`)
// 	.then((response) => response.json())
	

//   }


const fetchDeleteRecommendation = (recID) => {
	return fetch(`http://127.0.0.1:8000/movies/current_user/${recID}/delete`, {headers: {
	
		Authorization: `JWT ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json',
	}
	})
	  .then((response) => response.json())
  };

  const fetchCurrentUser = () => {
	return fetch(`http://127.0.0.1:8000/movies/current_user`, {headers: {
	
		Authorization: `JWT ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json',
	}
	})
	  .then((response) => response.json())
  };

  const addRating = (RatingObject, recID) => {
	return fetch(`http://127.0.0.1:8000/movies/current_user/ratings/${recID}/new`, {
	  headers: {
		Authorization: `JWT ${localStorage.getItem('token')}`,
		'Content-Type': 'application/json'
	  },
	  method: 'POST',
	  body: JSON.stringify(RatingObject)
	})
  }


//The addition of Youtube Functionality was eliminated as a scope vs time issue.

//   const fetchYoutubeVideo = (title) => {
// 	return fetch(`https://www.googleapis.com/youtube/v3/search?q=Sniper%2Btrailer&key=AIzaSyAc7nIcdUCO09x3EIWBzFnIhzD6dfhxLzE`,{
// 		headers: {
			
// 			Accept: application/json
// 		}
// 	}
  

  
  



export default {
	fetchUserRecommendationHistory,
	fetchSingleRecommendation,
	fetchNewRecommendationByGenre,
	// fetchYoutubeTrailerID,
	fetchRatings,
	fetchDeleteRecommendation,
	fetchCurrentUser,
	addRating,
	
}
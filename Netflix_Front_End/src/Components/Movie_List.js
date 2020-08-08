import React, { Component } from 'react'


class MovieList extends Component {
	renderMovies = () => {
		if(this.props.Movies){
		  const movie= this.props.Movies.map(M => {
			return(
				<div className="card" key={M.image_url} style={{width: 25 + 'rem' }}>
				  <img className="card-img-top" src={M.image_url} />
					<div className="card-body">
					  <h1 className="card-title">


						  <a href= {'http://localhost:3000/Profile/' + M.id }>   
						  
						  
						  {M.title}  
						  
						  </a> </h1>
						  <h4 className="card-text">Runtime:{M.runtime} </h4>
						  <br></br>
						  <br></br>

				  </div> 
			 </div>
			)
		  })
		  return(
			<div className = "row">
			  {movie}
			</div>
		  )
		}
	  }


	  render(){
		return (
		  <React.Fragment>
			<div>
			  {this.renderMovies()}
			</div>
		  </React.Fragment>
		 )
	  }
}

export default MovieList
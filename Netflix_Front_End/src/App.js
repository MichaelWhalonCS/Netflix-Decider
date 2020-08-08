import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import './App.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import theme from './theme';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Nav from './Components/Nav';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import './App.css';
// import UserAPI from './api/UserAPI'
// import Login from 'Pages/Login'
import HomePage from './Pages/Homepage'
import SurveyPage from './Pages/SurveyPage'
import ProfilePage from './Pages/ProfilePage'
import MovieDetailsPage from './Pages/MovieDetailsPage'
import MovieAPI from './api/MovieAPI';



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  displayed_form: '',
		  logged_in: localStorage.getItem('token') ? true : false,
		  username: ''
		};
	  }
	  componentDidMount() {
		console.log('ComponentDidMount')
		if (this.state.logged_in) {
		  fetch('https://netflix-compromiser.herokuapp.com/movies/current_user/', {
			headers: {
			  Authorization: `JWT ${localStorage.getItem('token')}`
			}
		  })
			.then(res => res.json())
			.then(json => {
			  this.setState({ username: json.username });
			});
		
		}
	  }


	
	  handle_login = (e, data) => {
		e.preventDefault();
		fetch('https://netflix-compromiser.herokuapp.com/token-auth/', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(data)
		})
		  .then(res => res.json())

		  .then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
			  logged_in: true,
			  displayed_form: '',
			  
			
			});	
		
		})
		.then(MovieAPI.fetchCurrentUser)
			.then(json => {
			  this.setState({
				username: json.username
			  });
			});

	  };
	
	  handle_signup = (e, data) => {
		e.preventDefault();
		fetch('https://netflix-compromiser.herokuapp.com/movies/users/', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		  },
		  body: JSON.stringify(data)
		})
		  .then(res => res.json())
		  .then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
			  logged_in: true,
			  displayed_form: '',
			  username: json.username
			});
		  });
	  };
	
	  handle_logout = () => {
		localStorage.removeItem('token');
		this.setState({ logged_in: false, username: '' });
	  };
	
	  display_form = form => {
		this.setState({
		  displayed_form: form
		});
	  };
	
	  render() {
		let form;
		switch (this.state.displayed_form) {
		  case 'login':
			form = <LoginForm handle_login={this.handle_login} />;
			break;
		  case 'signup':
			form = <SignupForm handle_signup={this.handle_signup} />;
			break;
		  default:
			form = null;
		}
		
	
		return (
		    <ThemeProvider theme={theme}>
    		<CssBaseline />
		  <div className="App" 		style={{
			color: 'white',
			backgroundColor: 'black',
			left: 0,
			width: '100%',
			margin: 0,
			padding: 0,
			top: 0,		
      	}} >



	  <Nav classname="nav" style = {{
		  backgroundColor: 'E50914',
	  }}
 
		
			  logged_in={this.state.logged_in}
			  display_form={this.display_form}
			  handle_logout={this.handle_logout}
			/>
			{form}
			<h3>
			  {this.state.logged_in
				? `Hello, ${this.state.username}`
				: 'Please Log In!'}
			</h3>
		<div 
>
			
		 <Router > <h1>NETFLIX DECIDER</h1>

            <Link to="/"><Button variant="contained" color="primary">
      			Home
    		</Button></Link>
            
              <Link to="/Profile"><Button variant="contained" color="primary">
      			Profile
    		</Button></Link>
            
            
              <Link to="/Survey"><Button variant="contained" color="primary">
      			Get A New Movie Recommendation!
    		</Button></Link>
            
          
         <Switch>
          <Route exact path='/' component={HomePage} />


          <Route exact path='/Profile' component={ProfilePage}>{this.state.logged_in ? <Route exact path='/Profile' component={ProfilePage} /> : <Redirect to="/" /> }
		  </Route>


          <Route exact path='/Profile/:recID' component={MovieDetailsPage}>{this.state.logged_in ? <Route exact path='/Profile/:recID' component={MovieDetailsPage} /> : <Redirect to="/" /> }
		  </Route>



          <Route exact path='/Survey' component={SurveyPage}>
			  
			  {this.state.logged_in ? <Route exact path='/Survey' component={SurveyPage} /> : <Redirect to="/" /> }

		  </Route>

        </Switch> 
		</Router>
        </div>
        </div>
		</ThemeProvider>
		);
		

    
	  
		
	  }
	}
	
	export default App;
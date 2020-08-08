

let handle_login = (e, data) => {
	e.preventDefault();
	fetch('http://127.0.0.1:8000/token-auth/', {
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
		  username: json.user.username
		});
	  });
  };

let handle_signup = (e, data) => {
	e.preventDefault();
	fetch('http://127.0.0.1:8000/movies/users/', {
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
		  username: json.username
		});
	  });
  };

let handle_logout = () => {
	localStorage.removeItem('token');
	this.setState({ logged_in: false, username: '' });
  };

  export default {
	  handle_login,
	  handle_signup,
	  handle_logout
  }
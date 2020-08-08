import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function Nav(props) {
  const logged_out_nav = (
	<div>
      <span onClick={() => props.display_form('login')}><Button style={{
				float:'right'
			}}variant="contained" color="primary">login</Button></span>

      <span onClick={() => props.display_form('signup')}><Button style={{
				float:'right'
			}}variant="contained" color="primary">Sign Up</Button></span>


	</div>
  );

  const logged_in_nav = (
    <span
       onClick={props.handle_logout}><Button style={{
		float:'right'
	}} variant="contained" color="primary"
      			>
    		Logout</Button></span>
   
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};
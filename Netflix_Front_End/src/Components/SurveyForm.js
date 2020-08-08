import React from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';



class SurveyForm extends React.Component {
	constructor(props) {
		super(props);

	}





render() {
	return (
<div>
{this.props.FirstGenre}
<Form onSubmit= {this.props.handleSubmit} >	
	<h1>Pick A Genre!</h1>
	<Form.Group>
  <Form.Control as="select" size="lg" name="first">
    <option>Action</option>
    <option>Anime</option>
    <option>Children</option>


   </Form.Control>
  <br />

</Form.Group> 
<Button variant="primary" type="submit" value="Submit">Submit</Button>
</Form>

</div>
	)
  }
}

export default SurveyForm;
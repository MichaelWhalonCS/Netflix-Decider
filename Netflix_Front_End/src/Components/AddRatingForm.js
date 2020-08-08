import React from 'react';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


// This form helps to provide enough information from the user to create and store a Review Object
class RatingForm extends React.Component {
	constructor(props) {
		super(props);

	}





render() {


	return (
<div>

<Form onSubmit= {this.props.HandleSubmitRating} >	
<Form.Group controlId="Stars">
    <Form.Label>Number Of Stars</Form.Label>
    <Form.Control as="select">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Form.Control>
	</Form.Group>
	<Form.Group controlId="description">
    <Form.Label>What did you think?</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>

<Button variant="primary" type="submit" value="Submit">
	Submit
</Button>
</Form>

</div>
	)
  }
}

export default RatingForm;
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container d-flex justify-content-center bg-secondary rounded mt-4">
		<Form className="py-4 ">
			<Form.Group className="mb-3 " controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" style={{ maxWidth: '100%' }} />
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" style={{ maxWidth: '100%' }} />
			</Form.Group>
			<div className="buttons d-flex justify-content-center gap-4 mt-4">
				<Form.Group className="mt-1" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit" className="btn btn-success btn-sm rounded">
					Submit
				</Button>
			</div>
		</Form>
		</div>
	)
};

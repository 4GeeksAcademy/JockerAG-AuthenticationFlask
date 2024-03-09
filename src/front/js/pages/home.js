import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom"

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	const [formData, setFormData] = useState({
		email:'',
		password:''
	})

	const handleSubmit = async (event) => {
		event.preventDefault();
		actions.login(formData)
	}

	const hanldeInputChange = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value})
	};



	return (
		store.isLogin ? <Navigate to='/perfil'/> : 
		<div className="container d-flex justify-content-center bg-secondary rounded mt-4">
		<Form className="py-4" onSubmit={handleSubmit}>
			<Form.Group className="mb-3 " controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" style={{ maxWidth: '100%' }}  name='email' value={formData.email} onChange={(e) => hanldeInputChange(e)} required/>
				<Form.Text className="text-muted">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" style={{ maxWidth: '100%' }}  name='password' value={formData.password} onChange={(e) => hanldeInputChange(e)} required/>
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

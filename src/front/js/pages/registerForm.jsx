import React, { useContext, useState } from "react";
import {Context} from '../store/appContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
	const {store, actions} = useContext(Context) 
	const [confirmPassword, setConfirmPassword] = useState('')
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email:"",
		name:"",
		username:"",
		password:"",
		is_active: "",


	})


	const handleInputChange = (event) => {
		setFormData({...formData, [event.target.name]: event.target.value})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await actions.signup(formData)
			alert('Bienvenido ya estás registrado')
			navigate ('/')
		} catch (error) {
			console.error('Error en el registro:', error);
		}
	};

	const handleCancel = () => {
		navigate('/')
	}

    return (
        <div className="container d-flex justify-content-center bg-secondary rounded mt-4">
		<Form className="py-4" onSubmit={handleSubmit}>
			<Form.Group className="mb-2 " controlId="formBasicEmail">

				<Form.Label className="text-light">Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" name='email' value={formData.email} style={{ maxWidth: '100%' }} onChange={(e) => handleInputChange(e)} required />
				<Form.Text className="text-light-subtle">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label className="text-light">Password</Form.Label>
				<Form.Control type="password" placeholder="Password" name="password" value={formData.password} style={{ maxWidth: '100%' }} onChange={(e) => handleInputChange(e)} required />
			</Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicText">
				<Form.Label className="text-light">Nombre</Form.Label>
				<Form.Control type="text" placeholder="Introduce tu nombre" name="name" value={formData.name} style={{ maxWidth: '100%' }}  onChange={(e) => handleInputChange(e)} required  />
			</Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicText">
				<Form.Label className="text-light">Nombre de Usuario</Form.Label>
				<Form.Control type="text" placeholder="Introduce tu usuario" name="username" value={formData.username} style={{ maxWidth: '100%' }} onChange={(e) => handleInputChange(e)} required />
			</Form.Group>


			<div className="buttons d-flex justify-content-center gap-4 mt-4">
				<Form.Group className="mt-1" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" />
				</Form.Group>
				<Button variant="primary" type="submit" className="btn btn-success btn-sm rounded">
					Submit
				</Button>
				<Button variant="primary" type="cancel" className="btn btn-danger btn-sm rounded" onClick={handleCancel}>
					Cancel
				</Button>
			</div>
		</Form>
		</div>
    )
}
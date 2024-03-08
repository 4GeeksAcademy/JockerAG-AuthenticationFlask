import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const RegisterForm = () => {
	/* const {store, actions} = useContext(Context) */
	const [confirmPassword, setConfirmPassword] = useState('')
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

	const handleSubmit = (event) => {
		event.preventDefault();
		if (confirmPassword === formData.password){
			actions.signup(formData)
			alert('Bienvenido ya estás registrado')
		} else {
			alert("Password no encontrado")
		}
	}

    return (
        <div className="container d-flex justify-content-center bg-secondary rounded mt-4">
		<Form className="py-4 ">
			<Form.Group className="mb-2 " controlId="formBasicEmail">
				<Form.Label className="text-light">Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" style={{ maxWidth: '100%' }} />
				<Form.Text className="text-light-subtle">
					We'll never share your email with anyone else.
				</Form.Text>
			</Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label className="text-light">Password</Form.Label>
				<Form.Control type="password" placeholder="Password" name="Password" style={{ maxWidth: '100%' }} />
			</Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicText">
				<Form.Label className="text-light">Nombre</Form.Label>
				<Form.Control type="text" placeholder="Introduce tu nombre" name="name" style={{ maxWidth: '100%' }} />
			</Form.Group>

            <Form.Group className="mb-3 " controlId="formBasicText">
				<Form.Label className="text-light">Nombre de Usuario</Form.Label>
				<Form.Control type="text" placeholder="Introduce tu usuario" name="username" style={{ maxWidth: '100%' }} />
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
}
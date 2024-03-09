import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	const handleReturn = () => {
		navigate('/')
	}

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/register">
						<button className="btn btn-primary btn-sm me-2">Register</button>
					</Link>
					<Link to={'/'}>
						<button className="btn btn-success btn-sm" onClick={actions.logout}>{store.isLogin ? 'Logout' : 'Login'}</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};

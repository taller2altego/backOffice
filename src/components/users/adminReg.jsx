import * as React from 'react';
import { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';

import { postCreateUser } from '../../utils/requerimentVars';

import { Box } from '@mui/system';
import InstantMessage from '../Error';

export default function AdminRegComponent({ id, navigate, ...props }) {
	const [name, setName] = useState("");
	const [lastname, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [hasChanged, setHasChanged] = useState(false);
	const [error, setError] = useState(false);


	const setActualQuote = () => {
		const body = {
			name,
			lastname,
			phoneNumber: Number(phoneNumber),
			email,
			password,
		};
		if (hasChanged) {
			postCreateUser(body).then(() => {
				navigate("/")
			})
		} else {
			setError(true);
		}
	}

const handleNameChange = (event) => {
	setHasChanged(true);
	setName(event.target.value)
};

const handleLastNameChange = (event) => {
	setHasChanged(true);
	setLastName(event.target.value)
};

const handlePhoneNumberChange = (event) => {
	setHasChanged(true);
	setPhoneNumber(event.target.value)
};

const handleEmailChange = (event) => {
	setHasChanged(true);
	setEmail(event.target.value)
};

const handlePasswordChange = (event) => {
	setHasChanged(true);
	setPassword(event.target.value)
};



return (
	<div style={{ height: "2vh", width: "100%" }}>
		<Grid container >
			{error ? <InstantMessage message="Debe cambiar el estado de por lo menos un campo" setState={setError} /> : ``}
			<Grid item xs={6}>
				<Typography variant="h3" component="div">
					Nuevo Admin
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Box
					display="flex"
					justifyContent="center"
					height={70}
					style={{ top: "50%	" }}
				>
					<Button
						variant="contained"
						color="success"
						size="large"
						onClick={setActualQuote}
					>
						Crear
					</Button>
				</Box>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Nombre
				</Typography>
				<TextField
					id="outlined-name"
					value={name}
					onChange={handleNameChange}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Apellido
				</Typography>
				<TextField
					id="outlined-name"
					value={lastname}
					onChange={handleLastNameChange}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Numero Telefono
				</Typography>
				<TextField
					id="outlined-name"
					value={phoneNumber}
					onChange={handlePhoneNumberChange}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Email
				</Typography>
				<TextField
					id="outlined-name"
					value={email}
					onChange={handleEmailChange}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Password
				</Typography>
				<TextField
					id="outlined-name"
					value={password}
					onChange={handlePasswordChange}
				/>
			</Grid>
		</Grid>
	</div>
);
}

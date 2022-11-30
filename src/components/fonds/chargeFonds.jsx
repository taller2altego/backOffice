import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';

import { postChargeFonds } from '../../utils/requerimentVars';

import { Box } from '@mui/system';
import InstantMessage from '../Error';
import InstantMessageSuccess from '../Success'

export default function ChargeFonds({ id, navigate, ...props }) {
	const [amount, setAmount] = useState(0);
	const [email, setEmail] = useState("");
	const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

	useEffect(() => {
	}, []);

	const asignAmount = () => {
		const body = {
			amount: amount,
		};
		if (email !== '' && amount>0) {
			postChargeFonds(email, body);
            setSuccess(true)
            setError(false)
		} else {
			setError(true);
            setSuccess(false)
		}
	}

	const handleAmountChange = (event) => {
		setAmount(event.target.value)
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value)
	};

	

	return (
		<div style={{ height: "2vh", width: "100%" }}>
			<Grid container >
				{error ? <InstantMessage message="Debe colocar valores validos" setState={setError} /> : ``}
                {success ? <InstantMessageSuccess message="Saldo cargado" setState={setError} /> : ``}
				<Grid item xs={6}>
					<Typography variant="h3" component="div">
						Cargar saldo
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
							onClick={asignAmount}
						>
							Cargar fondos a un usuario
						</Button>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
						Monto
					</Typography>

					<TextField
						id="outlined-name"
						value={amount}
						onChange={handleAmountChange}
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

			</Grid>
		</div>
	);
}

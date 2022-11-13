import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';

import { getQuotesById } from '../../utils/requerimentVars';
import { postQuotes } from '../../utils/requerimentVars';

import Variable from './Variable';
import { Box } from '@mui/system';
import InstantMessage from '../Error';

export default function DetailQuote({ id, navigate, ...props }) {
	const [price, setPrice] = useState(0);
	const [travelDistance, setTravelDistance] = useState(0);
	const [timeWindow, setTimeWindow] = useState([]);
	const [seniority, setSeniority] = useState([]);
	const [methodOfPayment, setMethodOfPayment] = useState([]);
	const [travelDuration, setTravelDuration] = useState([]);
	const [travelDate, setTravelDate] = useState([]);
	const [travelHour, setTravelHour] = useState([]);
	const [hasChanged, setHasChanged] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		getQuotesById(id)
			.then(({ data: { data } }) => {
				const mappedData = Object.keys(data)
					.filter(key => !['id', 'applied'].includes(key))
					.map(key => ({ key: key, value: data[key] }));

				mappedData.forEach(variable => {
					const setters = {
						price: setPrice,
						travelDistance: setTravelDistance,
						timeWindow: setTimeWindow,
						seniority: setSeniority,
						methodOfPayment: setMethodOfPayment,
						travelDuration: setTravelDuration,
						travelDate: setTravelDate,
						travelHour: setTravelHour
					}
					setters[variable.key](variable.value);
				});
			})
			.catch(err => {
				if (err.response && err.response.data.message === 'jwt expired') {
					sessionStorage.clear()
					navigate("/login")
				} else {
					throw err;
				}
			});
	}, []);

	const setActualQuote = () => {
		const body = {
			price: price,
			timeWindow:
				timeWindow
			,
			seniority:
				seniority
			,
			methodOfPayment:
				methodOfPayment
			,
			travelDuration:
				travelDuration
			,
			travelDistance: travelDistance,
			travelDate:
				travelDate
			,
			travelHour:
				travelHour

		};
		if (hasChanged) {
			postQuotes(body);
			return navigate("/quotes");
		} else {
			setError(true);
		}
	}

	const handleTravelDistanceChange = (event) => {
		setHasChanged(true);
		setTravelDistance(event.target.value)
	};

	const handlePriceChange = (event) => {
		setHasChanged(true);
		setPrice(event.target.value)
	};

	const timeWindowCallback = data => {
		setHasChanged(true);
		setTimeWindow(data);
	}

	const seniorityCallback = data => {
		setHasChanged(true);
		setSeniority(data);
	}

	const methodOfPaymentCallback = data => {
		setHasChanged(true);
		setMethodOfPayment(data);
	}

	const travelDurationCallback = data => {
		setHasChanged(true);
		setTravelDuration(data);
	}

	const travelDateCallback = data => {
		setHasChanged(true);
		setTravelDate(data);
	}

	const travelHourCallback = data => {
		setHasChanged(true);
		setTravelHour(data);
	}

	return (
		<Grid container >
			{error ? <InstantMessage message="Debe cambiar el estado de por lo menos un campo" setState={setError} /> : ``}
			<Grid item xs={6}>
			<Typography variant="h3" component="div">
				Cotizacion
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
						Añadir nueva cotizacion
					</Button>
				</Box>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Travel Distance
				</Typography>

				<TextField
					id="outlined-name"
					value={travelDistance}
					onChange={handleTravelDistanceChange}
				/>
			</Grid>
			<Grid item xs={6}>
				<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
					Price
				</Typography>

				<TextField
					id="outlined-name"
					value={price}
					onChange={handlePriceChange}
				/>
			</Grid>

			<Grid item xs={6}>
				<Variable
					title="Time Window"
					variables={timeWindow}
					callback={timeWindowCallback}
					customLabels={["Cantidad minima para modificarse", "Tasa de cambio"]}
					customMessage="Cantidad y tasa de cambio no deben ser 0"
					fields={['quantity', 'percentageToChange']}
				/>
			</Grid>

			<Grid item xs={6}>
				<Variable
					title="Seniority"
					variables={seniority}
					callback={seniorityCallback}
					customLabels={["Cantidad minima para modificarse", "Tasa de cambio"]}
					customMessage="Cantidad y tasa de cambio no deben ser 0"
					fields={['quantity', 'percentageToChange']}
				/>
			</Grid>

			<Grid item xs={6}>
				<Variable
					title="Duracion del viaje"
					variables={travelDuration}
					callback={travelDurationCallback}
					customLabels={["Cantidad minima para modificarse", "Tasa de cambio"]}
					customMessage="Cantidad y tasa de cambio no deben ser 0"
					fields={['quantity', 'percentageToChange']}
				/>
			</Grid>

			<Grid item xs={6}>
				<Variable
					title="Fecha de viaje"
					variables={travelDate}
					callback={travelDateCallback}
					customLabels={["Nombre del día", "Tasa extra de cobro"]}
					customMessage="Debe completar un nombre de día y una tasa"
					fields={['day', 'extraFee']}
				/>
			</Grid>

			<Grid item xs={6}>
				<Variable
					title="Método de pago"
					variables={methodOfPayment}
					callback={methodOfPaymentCallback}
					customLabels={["Nombre de la moneda", "Tasa extra de cobro"]}
					customMessage="Debe completar una moneda y una tasa"
					fields={['paymentType', 'percentageToChange']}
				/>
			</Grid>

			<Grid item xs={6}>
				<Variable
					title="Horario de Viaje"
					variables={travelHour}
					callback={travelHourCallback}
					customLabels={["Horario", "Tasa extra de cobro"]}
					customMessage="Debe completar una hora y una tasa"
					fields={['hour', 'extraFee']}
				/>
			</Grid>
		</Grid>
	);
}

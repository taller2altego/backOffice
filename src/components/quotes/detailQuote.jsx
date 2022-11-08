import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';

import { getQuotesById } from '../../utils/requerimentVars';
import Variable from './Variable';

export default function DetailQuote({ id, navigate, ...props }) {
	const [travelDistance, setTravelDistance] = useState(0);
	const [timeWindow, setTimeWindow] = useState([]);
	const [seniority, setSeniority] = useState([]);
	const [methodOfPayment, setMethodOfPayment] = useState([]);
	const [travelDuration, setTravelDuration] = useState([]);
	const [travelDate, setTravelDate] = useState([]);
	const [travelHour, setTravelHour] = useState([]);

	useEffect(() => {
		getQuotesById(id)
			.then(({ data: { data } }) => {
				const mappedData = Object.keys(data)
					.filter(key => !['id', 'price', 'applied'].includes(key))
					.map(key => ({ key: key, value: data[key] }));

				mappedData.forEach(variable => {
					const setters = {
						travelDistance: setTravelDistance,
						timeWindow: setTimeWindow,
						seniority: setSeniority,
						methodOfPayment: setMethodOfPayment,
						travelDuration: setTravelDuration,
						travelDate: setTravelDate,
						travelHour: setTravelHour
					}
					setters[variable.key](variable.value);
					console.log(variable);
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

	const handleTravelDistanceChange = (event) => {
		setTravelDistance(event.target.value);
	};

	const onChangeTravelDistance = () => {
		// update state
	};

	const timeWindowCallback = data => {
		setTimeWindow(data);
	}

	const seniorityCallback = data => {
		setSeniority(data);
	}

	const methodOfPaymentCallback = data => {
		setMethodOfPayment(data);
	}

	const travelDurationCallback = data => {
		setTravelDuration(data);
	}

	const travelDateCallback = data => {
		setTravelDate(data);
	}

	const travelHourCallback = data => {
		setTravelHour(data);
	}

	return (
		<>
			<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
				Travel Distance
			</Typography>

			<TextField
				id="outlined-name"
				value={travelDistance}
				onChange={handleTravelDistanceChange}
			/>

			<Button onClick={onChangeTravelDistance}>Añadir</Button>

			<Variable
				title="Time Window"
				variables={timeWindow}
				callback={timeWindowCallback}
				customLabels={["Cantidad minima para modificarse", "Tasa de cambio"]}
				customMessage="Cantidad y tasa de cambio no deben ser 0"
				fields={['quantity', 'percentageToChange']}
			/>

			<Variable
				title="Seniority"
				variables={seniority}
				callback={seniorityCallback}
				customLabels={["Cantidad minima para modificarse", "Tasa de cambio"]}
				customMessage="Cantidad y tasa de cambio no deben ser 0"
				fields={['quantity', 'percentageToChange']}
			/>

			<Variable
				title="Duracion del viaje"
				variables={travelDuration}
				callback={travelDurationCallback}
				customLabels={["Cantidad minima para modificarse", "Tasa de cambio"]}
				customMessage="Cantidad y tasa de cambio no deben ser 0"
				fields={['quantity', 'percentageToChange']}
			/>

			<Variable
				title="Fecha de viaje"
				variables={travelDate}
				callback={travelDateCallback}
				customLabels={["Nombre del día", "Tasa extra de cobro"]}
				customMessage="Debe completar un nombre de día y una tasa"
				fields={['day', 'extraFee']}
			/>

			<Variable
				title="Método de pago"
				variables={methodOfPayment}
				callback={methodOfPaymentCallback}
				customLabels={["Nombre de la moneda", "Tasa extra de cobro"]}
				customMessage="Debe completar una moneda y una tasa"
				fields={['paymentType', 'percentageToChange']}
			/>

			<Variable
				title="Horario de Viaje"
				variables={travelHour}
				callback={travelHourCallback}
				customLabels={["Horario", "Tasa extra de cobro"]}
				customMessage="Debe completar una hora y una tasa"
				fields={['hour', 'extraFee']}
			/>
		</>
	);
}

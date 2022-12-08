import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText, Autocomplete, Grid } from '@mui/material';
import InstantMessage from '../Error';

export default function VariableCombo({ title, subtitle, variables, callback, customLabels, customMessage, fields }) {

	const [labels, setLabels] = useState(customLabels);
	const [message, setMessage] = useState(customMessage);
	const [firstField, setFirstField] = useState("");
	const [secondField, setSecondField] = useState(0);
	const [error, setError] = useState(false);
	const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

	useEffect(() => { }, []);

	const onChangeSecondField = event => {
		setSecondField(event.target.value);
	};

	const onClickDelete = (id) => () => {
		variables.splice(id)
		callback([...variables])
	}


	const onChangeFirstField = (event, newValue) => {
		setFirstField(newValue);
	};

	const saveState = () => {
		if (firstField === "" || secondField === 0) {
			setError(true);
			return;
		}

		callback([...variables, { [fields[0]]: firstField, [fields[1]]: secondField }]);
		setFirstField("");
		setSecondField(0);
	};

	return (
		<>
			<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div"> {title} </Typography>
			<Typography variant="h8" component="div"> {subtitle} </Typography>
			<div style={{ display: "flex" }}>
				<Autocomplete
					disablePortal
					id="outlined-name test2"
					options={days}
					onChange={onChangeFirstField}
					sx={{ width: 250 }}
					renderInput={(params) => <TextField {...params} label="Dia de la semana" />}
				/>
				<TextField id="outlined-name test1" placeholder="Ejemplo: 123" value={secondField} onChange={onChangeSecondField} />

				{error && message ? <InstantMessage message={message} setState={setError} /> : ``}

				<Button onClick={saveState}> Añadir </Button>
			</div>
			<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div"> Valores Actuales </Typography>

			<List sx={{ width: '100%', maxWidth: '50%', bgcolor: 'background.paper' }}>
				{labels && labels.length > 0 && <ListItem>
					<ListItemText primary={labels[0]} sx={4} />
					<ListItemText primary={labels[1]} sx={4} />
					<ListItemText sx={4}>Accion </ListItemText>
				</ListItem>}
				{
					variables.length > 0 && variables
						.map((variable, id) => {
							const keys = Object.keys(variable);
							return (
								<Grid container>
									<Grid xs={10}>
										<ListItem>
											<ListItemText secondary={variable[keys[0]]} sx={6} />
											<ListItemText secondary={variable[keys[1]]} sx={4} />
										</ListItem>
									</Grid>
									<Grid xs={2}>
										<Button onClick={onClickDelete(id)}>
											Borrar
										</Button>
									</Grid>
								</Grid>
							);
						})
				}
			</List>
		</>
	);
}

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import InstantMessage from '../Error';

export default function Variable({ title, variables, callback, customLabels, customMessage, fields }) {

	const [labels, setLabels] = useState(customLabels);
	const [message, setMessage] = useState(customMessage);
	const [firstField, setFirstField] = useState(0);
	const [secondField, setSecondField] = useState(0);
	const [error, setError] = useState(false);

	useEffect(() => { }, []);

	const onChangeSecondField = event => {
		setSecondField(event.target.value);
	};

	const onChangeFirstField = event => {
		setFirstField(event.target.value);
	};

	const saveState = () => {
		if (firstField === 0 || secondField === 0) {
			setError(true);
			return;
		}

		callback([...variables, { [fields[0]]: firstField, [fields[1]]: secondField }]);
		setFirstField(0);
		setSecondField(0);
	};

	return (
		<>
			<Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div"> {title} </Typography>

			<TextField id="outlined-name test2" placeholder="Ejemplo: 123" value={firstField} onChange={onChangeFirstField} />
			<TextField id="outlined-name test1" placeholder="Ejemplo: 123" value={secondField} onChange={onChangeSecondField} />

			{error && message ? <InstantMessage message={message} setState={setError} /> : ``}

			<Button onClick={saveState}> Añadir </Button>

			<Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div"> Valores Actuales </Typography>

			<List sx={{ width: '100%', maxWidth: '50%', bgcolor: 'background.paper' }}>
				{labels && labels.length > 0 && <ListItem>
					<ListItemText primary={labels[0]} />
					<ListItemText primary={labels[1]} />
				</ListItem>}
				{
					variables.length > 0 && variables
						.map(variable => {
							const keys = Object.keys(variable);
							return (
								<ListItem>
									<ListItemText secondary={variable[keys[0]]} />
									<ListItemText secondary={variable[keys[1]]} />
								</ListItem>
							);
						})
				}
			</List>
		</>
	);
}

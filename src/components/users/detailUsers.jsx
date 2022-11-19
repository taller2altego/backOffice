import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, TextField } from '@mui/material';

import { getUserById } from '../../utils/requerimentVars';

import Variable from '../microcomponents/varUser';
import VariableBool from '../microcomponents/varUserBool';


export default function DetailUser({ id, navigate, ...props }) {
	console.log(id)
	const [name, setName] = useState("");
	const [lastname, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [numberOfScores, setNumberOfScores] = useState(0);
	const [totalScore, setTotalScore] = useState(0);
	const [isBlocked, setIsBloqued] = useState(false);
	const [createdAt, setCreatedAt] = useState("");
	const [isDriver, setIsDriver] = useState(false);
	const [role, setRole] = useState("");

	useEffect(() => {
		getUserById(id)
			.then(({  data  }) => {
				console.log(data)
				const mappedData = Object.keys(data)
					.filter(key => !['id'].includes(key))
					.map(key => ({ key: key, value: data[key] }));

				mappedData.forEach(variable => {
					const setters = {
						name: setName,
                        lastname: setLastName,
						phoneNumber: setPhoneNumber,
						email: setEmail,
						numberOfScores: setNumberOfScores,
						totalScore: setTotalScore,
						isBlocked: setIsBloqued,
						createdAt: setCreatedAt,
						isDriver: setIsDriver,
                        role: setRole
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
	


	return (
		<Grid container spacing={2} >
			<Grid item xs={4}>
				<Variable
					title="Nombre"
					variables={name}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="Apellido"
					variables={lastname}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="Telefono"
					variables={phoneNumber}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="Email"
					variables={email}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="#Scores"
					variables={numberOfScores}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="ScoresTotal"
					variables={totalScore}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="Puntaje total"
					variables={totalScore}
				/>
			</Grid>
			<Grid item xs={4}>
				<VariableBool
					title="Bloqueado"
					neg="Bloquedo"
					pos="No bloqueado"
					variables={!isBlocked}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="Creacion en:"
					variables={createdAt}
				/>
			</Grid>
			<Grid item xs={4}>
				<VariableBool
					title="Es conductor"
					neg="No es conductor"
					pos="Es conductor"
					variables={isDriver}
				/>
			</Grid>
			<Grid item xs={4}>
				<Variable
					title="Rol"
					variables={role}
				/>
			</Grid>
		

			
		</Grid>
	);
}

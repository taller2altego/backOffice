import * as React from 'react';
import { useState, useEffect } from 'react';
import { Grid, TextField, Typography } from '@mui/material';

import { getUserById } from '../../utils/requerimentVars';

import Variable from '../microcomponents/varUser';
import VariableBool from '../microcomponents/varUserBool';
import { TextFields } from '@mui/icons-material';


export default function DetailUser({ id, navigate, ...props }) {

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
				const mappedData = Object.keys(data)
					.filter(key => !['id'].includes(key))
					.map(key => ({ key: key, value: data[key] }));

				mappedData.forEach(variable => {
					console.log(variable);
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
					if (!setters[variable.key]) {
						return null;
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
			<Grid item xs={3}>
				<Typography fontSize={20}>Nombre</Typography>
				<Typography fontSize={30} fontWeight={700}>{name}</Typography>
				<Typography fontSize={20} marginTop={3}>Apellido</Typography>
				<Typography fontWeight={700} fontSize={30}>{lastname}</Typography>
				<Typography fontSize={20} marginTop={3}>Telefono</Typography>
				<Typography fontWeight={700} fontSize={30}>{phoneNumber}</Typography>
				<Typography fontSize={20} marginTop={3}>Email</Typography>
				<Typography fontWeight={700} fontSize={30}>{email}</Typography>
				<Typography fontSize={20} marginTop={3}>Creado en: </Typography>
				<Typography fontWeight={700} fontSize={30}>{createdAt}</Typography>
			</Grid>
			<Grid item xs={3}>
				<Typography fontSize={20} marginTop={3}>Veces puntuado</Typography>
				<Typography fontWeight={700} fontSize={30}>{numberOfScores}</Typography>
				<Typography fontSize={20} marginTop={3}>Promedio de puntuaciones</Typography>
				<Typography fontWeight={700} fontSize={30}>{totalScore}</Typography>
				<Typography fontSize={20} marginTop={3}>Rol</Typography>
				<Typography fontWeight={700} fontSize={30}>{role}</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography fontWeight={700} fontSize={30} color={isBlocked ? "red" : "green"}>{isBlocked ? "El usuario esta bloqueado" : "El usuario no esta bloqueado"}</Typography>
				<Typography fontWeight={700} fontSize={30} >{isDriver ? "Es conductor" : "No es conductor"}</Typography>
			</Grid>
		</Grid>
	);
}

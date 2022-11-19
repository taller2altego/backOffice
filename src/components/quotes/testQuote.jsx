import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { get } from '../../utils/requests'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import InstantMessage from '../Error';


export default function TestQuote({ id, navigate, ...props }) {
    const [price, setPrice] = useState("A calcular");
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [method, setMethod] = useState("Ether");
    const [date, setDate] = useState(dayjs('2022-11-02T05:04:33.430Z'));

    const [error, setError] = useState(false);

    const handleDurationChange = (event) => {
        setDuration(event.target.value)
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value)
    };

    const handleMethodChange = (event) => {
        setMethod(event.target.value)
    };

    const simulate = () => {
        const paramsPass = {
			date:
				date
			,
			distance:
                distance
			,
            duration:
                duration
			,
			paymentMethod:
                method
			,
		};
        const token = sessionStorage.getItem('token');
        get("http://localhost:5000/price/3",token ,null ,paramsPass).then(({  data  }) => {
            setPrice(data.data.price)
        }
        )
    }   


    return (
        <div style={{ height: "2vh", width: "100%" }}>
            <Grid container spacing="40px">
                {error ? <InstantMessage message="Debe cambiar el estado de por lo menos un campo" setState={setError} /> : ``}
                <Grid item xs={6}>
                    <Box component="span" sx={{ display: 'inline' }}>
                        <Typography variant="h3" component="div" >
                            Distancia
                        </Typography>
                        <TextField
                            id="outlined-name"
                            value={distance}
                            onChange={handleDistanceChange}
                        >
                            {}
                        </TextField>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component="span" sx={{ display: 'inline' }}>
                        <Typography variant="h3" component="div" >
                            Duracion
                        </Typography>
                        <TextField
                            id="outlined-name"
                            value={duration}
                            onChange={handleDurationChange}
                        >
                            {duration}
                        </TextField>
                    </Box>
                </Grid> 
                <Grid item xs={6}>
                    <Box component="span" sx={{ display: 'inline' }}>
                        <Typography variant="h3" component="div" >
                            Fecha
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="DateTimePicker"
                                value={date}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component="span" sx={{ display: 'inline' }}>
                        <Typography variant="h3" component="div" >
                            Metodo de pago
                        </Typography>
                        <TextField 
                        id="outlined-name"
                        value={method}
                        onChange={handleMethodChange}
                        >
                            {method}
                        </TextField>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box component="span" sx={{ display: 'inline' }}>
                        <Typography variant="h3" component="div" >
                            Precio final
                        </Typography>
                        <Typography variant="h4" component="div">
                            { price }
                        </Typography>
                    </Box>

                </Grid>
                <Grid item xs={6}>
                    <Box
                        display="flex"
                        justifyContent="left"
                        height={70}
                        style={{ top: "50%	" }}
                    >
                        <Button
                            variant="contained"
                            color="success"
                            size="large"
                            onClick={simulate}
                        >
                            Simular precio
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

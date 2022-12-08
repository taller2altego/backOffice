import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';

import { getQuotesById } from '../../utils/requerimentVars';
import { postQuotes } from '../../utils/requerimentVars';

import Variable from './Variable';
import VariableCombo from './VariableCombo'
import { Box } from '@mui/system';
import InstantMessage from '../Error';

export default function DetailQuote({ id, navigate, ...props }) {
  const [price, setPrice] = useState(0);
  const [travelDistance, setTravelDistance] = useState(0);

  const [travelDuration, setTravelDuration] = useState(0);
  const [feeTravelDuration, setFeeTravelDuration] = useState(0);

  const [timeWindow, setTimeWindow] = useState([]);
  const [seniority, setSeniority] = useState([]);
  const [methodOfPayment, setMethodOfPayment] = useState([]);
  const [travelDate, setTravelDate] = useState([]);
  const [travelHour, setTravelHour] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  const [error, setError] = useState(false);
  const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
  useEffect(() => {
    getQuotesById(id)
      .then(({ data: { data } }) => {
        const mappedData = Object.keys(data)
          .filter(key => !['id', 'applied'].includes(key))
          .map(key => ({ key: key, value: data[key] }))
          .map(item => {
            if (item.key === "travelDate") {
              return {
                key: item.key, value: data[item.key]
                  .map(tupla => {
                    return { day: days[tupla.day], extraFee: tupla.extraFee }
                  })
              }
            } else {
              return { key: item.key, value: item.value }
            }
          })

        mappedData.forEach(variable => {
          const setters = {
            price: setPrice,
            travelDistance: setTravelDistance,
            travelDuration: variable => {
              setTravelDuration(variable.quantity);
              setFeeTravelDuration(variable.percentageToChange);
            },
            timeWindow: setTimeWindow,
            seniority: setSeniority,
            methodOfPayment: setMethodOfPayment,
            travelDate: setTravelDate,
            travelHour: setTravelHour
          }
          setters[variable.key](variable.value);
        });
      })
      .catch(err => {
        if (err.response && err.response.data.message === 'jwt expired') {
          sessionStorage.clear();
          navigate("/login");
        } else {
          throw err;
        }
      });

  }, []);

  const setActualQuote = () => {
    for (var i = 0; i < travelDate.length; i++) {
      if (isNaN(travelDate[i].day)) {
        travelDate[i].day = days.indexOf(travelDate[i].day)
      }
    }

    const body = {
      price,
      timeWindow,
      seniority,
      methodOfPayment,
      travelDuration: {
        quantity: travelDuration,
        percentageToChange: feeTravelDuration
      },
      travelDistance,
      travelDate,
      travelHour
    };

    if (hasChanged) {
      return postQuotes(body)
        .then(() => {
          return navigate("/quotes");
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    } else {
      setError(true);
    }
  }

  const handleTravelDistanceChange = (event) => {
    setHasChanged(true);
    setTravelDistance(event.target.value)
  };

  const handleTravelDurationQuantityChange = (event) => {
    setHasChanged(true);
    setTravelDuration(event.target.value);
  };

  const handleTravelDurationPercentageChange = (event) => {
    setHasChanged(true);
    setFeeTravelDuration(event.target.value);
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

  const travelDateCallback = data => {
    setHasChanged(true);
    setTravelDate(data);
  }

  const travelHourCallback = data => {
    setHasChanged(true);
    setTravelHour(data);
  }

  return (
    <div style={{ height: "2vh", width: "100%" }}>
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

        <Grid item xs={12}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div"> Precio Base </Typography>
          <TextField id="outlined-name" value={price} onChange={handlePriceChange} />
        </Grid>

        <Grid item xs={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div"> Distancia del viaje </Typography>
          <Typography variant="h8" component="div"> Precio por unidad de KM </Typography>
          <TextField id="outlined-name" value={travelDistance} onChange={handleTravelDistanceChange} />
        </Grid>

        <Grid item xs={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div"> Duracion del viaje (minutos por KM - porcentaje de incremento) </Typography>
          <Typography variant="h8" component="div"> Incrementa porcentualmente cuando la distancia x tasa es mayor a la duracion </Typography>
          <TextField id="outlined-name" value={travelDuration} onChange={handleTravelDurationQuantityChange} />
          <TextField id="outlined-name" value={feeTravelDuration} onChange={handleTravelDurationPercentageChange} />
        </Grid>

        <Grid item xs={6}>
          <Variable
            title="Ventana temporal"
            subtitle="Modifica el precio base según la ventana temporal"
            variables={timeWindow}
            callback={timeWindowCallback}
            customLabels={["Cota modificacion", "Tasa de cambio"]}
            customMessage="Cantidad y tasa de cambio no deben ser 0"
            fields={['quantity', 'percentageToChange']}
          />
        </Grid>

        <Grid item xs={6}>
          <Variable
            title="Seniority"
            subtitle="Modifica el precio porcentualmente según el match del seniority"
            variables={seniority}
            callback={seniorityCallback}
            customLabels={["Cota modificacion", "Tasa de cambio"]}
            customMessage="Cantidad y tasa de cambio no deben ser 0"
            fields={['quantity', 'percentageToChange']}
          />
        </Grid>

        <Grid item xs={6} >
          <VariableCombo
            title="Dia de viaje"
            subtitle="Modifica el precio porcentualmente según el match del día"
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
            subtitle="Modifica el precio porcentualmente según el match del método de pago"
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
            subtitle="Modifica el precio porcentualmente según el match del horario"
            variables={travelHour}
            callback={travelHourCallback}
            customLabels={["Horario", "Tasa extra de cobro"]}
            customMessage="Debe completar una hora y una tasa"
            fields={['hour', 'extraFee']}
          />
        </Grid>
      </Grid>
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import { get, patch } from "../../utils/requests";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ListItem, ListItemButton, Button, Grid, ListItemText, List, IconButton} from '@mui/material';
import { config } from "../../Constants";
import { RollerSkatingOutlined } from '@mui/icons-material';

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={``} />
            </ListItemButton>
        </ListItem>
    );
}


export default function Denounces({state, mav}) {
    console.log(state)
    const navigate = useNavigate();
    const [denounces, setDenounces] = useState([])

    useEffect(() => {
        const fetchAll = async (token) => {
          const result = await get(
            `${config.API_URL}/drivers/${state.driverId}/reports`,
            token
          )
          setDenounces(result.data.data);
          console.log(result.data.data)
        };
        if (sessionStorage.getItem("token")) {
          const token = sessionStorage.getItem("token");
          fetchAll(token);
        } 
      }, [ ]);

    const block =  (id, isBlocked, email) => async () => {
        const token = sessionStorage.getItem('token');
        return await patch(`${config.API_URL}/users/${id}`, token, { isBlocked: !isBlocked, email })
            .then(() => navigate('/')
            )
    };

    return (
        <div >
            <Button
                variant="contained"
                color="success"
                size="large"
                onClick={block(state.id, state.isBlocked, state.email)}
            >
                Bloquear/Desbloquear
            </Button>
            <Grid >
                <Grid item xs={12}>
                    <Box
                        sx={{ width: '100%', height: '100%', maxWidth: 1400, bgcolor: 'background.paper' }}
                    >

                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            { denounces.map((value) => 
                            (   
                                <ListItem
                                    key={value.description}
                                    disableGutters
                                    secondaryAction={
                                        <IconButton aria-label="comment">
                                           
                                        </IconButton>
                                    }
                                >
                                    <ListItemText primary={`${value.description}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

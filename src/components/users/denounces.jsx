import * as React from 'react';
import Box from '@mui/material/Box';
import { get, patch } from "../../utils/requests";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Button, Grid } from '@mui/material';
import { config } from "../../Constants";
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Denuncia XXXXXXXXXXXXXXX ${index + 1}`} />
            </ListItemButton>
        </ListItem>
    );
}


export default function Denounces(id, navigate) {
    const block = (id, isBlocked, email) => () => {
        const token = sessionStorage.getItem('token');
        return patch(`${config.API_URL}/users/${id}`, token, { isBlocked: !isBlocked, email })
        .then(
            navigate('/')
            )
      };
    return (
        <div >
            <Button
                variant="contained"
                color="success"
                size="large"
            >
                Bloquear
            </Button>
            <Grid >
                <Grid item xs={12}>
                    <Box
                        sx={{ width: '100%', height: '100%', maxWidth: 1400, bgcolor: 'background.paper' }}
                    >

                        <FixedSizeList
                            height={600}
                            width={1400}
                            itemSize={46}
                            itemCount={200}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

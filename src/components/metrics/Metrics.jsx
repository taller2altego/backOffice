import * as React from 'react';
import { useEffect } from 'react';
import { Typography } from "@mui/material";


export default function Metrics({ navigate, ...props }) {

    useEffect(() => { }, []);

    return (
        <>
            <Typography
                variant="h2"
                gutterBottom
                component="div"
                align="center"
            >
                Metricas
            </Typography>
        </>
    );
}

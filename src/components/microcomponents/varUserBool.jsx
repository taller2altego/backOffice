import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";


export default function VarUser(props) {
    const [color, setColor ] = useState("#4fb622")

    useEffect(() => {
        if (props.variables){
            setColor("#4fb622")
        }else{
            setColor("#cc0000")
        }
    },[])

    const settingText = ()=>{
        if (props.variables){
            return (props.pos).toUpperCase()
        }else{
            return (props.neg).toUpperCase()
        }
    }


    return (
        <Box sx={{ border: 1 , padding: 2}}  style={{ backgroundColor: color, borderRadius: '30px'}}>
            <Grid item xs={10} >
                <Box component="span" sx={{ display: 'inline' }}>
                    <Typography variant="h3" component="div" align="center " style={{ backgroundColor: '#FFFFFF', borderRadius: "30px"}}>
                        {props.title}
                    </Typography>
                </Box>
                <Box component="span" sx={{ display: 'inline' }}>
                    <Typography variant="h4" component="div">
                        {  settingText() }
                    </Typography>
                </Box>
            </Grid>
        </Box>
    )
}


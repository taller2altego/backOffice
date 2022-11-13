import { Box, Grid, Typography } from "@mui/material";







export default function VarUser(props) {
    console.log(props)

    return (
        <Box sx={{ border: 1 , padding: 2}}  style={{ backgroundColor: '#ae97e9', borderRadius: '30px'}}>
            <Grid item xs={10} >
                <Box component="span" sx={{ display: 'inline' }}>
                    <Typography variant="h3" component="div" align="center " style={{ backgroundColor: '#FFFFFF', borderRadius: "30px"}}>
                        {props.title}
                    </Typography>
                </Box>
                <Box component="span" sx={{ display: 'inline' }}>
                    <Typography variant="h4" component="div">
                        {props.variables}
                    </Typography>
                </Box>
            </Grid>
        </Box>
    )
}


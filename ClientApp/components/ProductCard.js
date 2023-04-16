import { Grid, Box, Card, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductCard( data ){
    console.log(data)
    // Typography themes
    const titleStyle = {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontWeight: 700,
        letterSpacing: '.1rem',
        color: 'inherit',
        textDecoration: 'none',
      }
    const greyedOut = {
        color: 'grey',
        textDecoration: 'none',
        fontSize: '15px'
    }
    const description = {
        color: 'black',
        textDecoration: 'none',
        fontSize: '15px'
    }

    return(
        <Card>
            <Grid container spacing={0}>
                <Grid item sm={11}>
                    <Typography variant="h4" sx={titleStyle}>
                        {data.data.title}
                    </Typography>
                    <Typography sx={greyedOut}>
                        {data.data.categories}
                    </Typography>
                    <Typography sx={greyedOut}>
                        Price: ${data.data.price} | Rent: ${data.data.rent} {data.data.interval}
                    </Typography>
                    <Typography sx={description}>
                        {data.data.description}
                    </Typography>
                </Grid>
                <Grid item sm={1}>
                    <DeleteIcon/>
                </Grid>

                <Grid item sm={11}>
                    <p>
                        Date posted: {data.data.date}
                    </p>
                </Grid>
                <Grid item sm={1}>
                    <p>
                        {data.data.views} views
                    </p>
                </Grid>
            </Grid>
        </Card>
    )
}
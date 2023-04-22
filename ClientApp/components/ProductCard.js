import { Grid, Box, Card, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProductCard(data) {


    const cardData = {
        title: data.data.title,
        description: data.data.description,
        categories: data.data.categories,
        price: data.data.price,
        rent: data.data.rent,
        rentInterval: data.data.rentInterval,
    }
    console.log(cardData)
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

    return (
        <Card sx={{ width: '70%', marginBottom: 3, padding: 2 }}>
            <Grid container spacing={0}>
                <Grid item sm={11}>
                    <Typography variant="h4" sx={titleStyle}>
                        {cardData.title}
                    </Typography>
                    <Typography sx={greyedOut}>
                        {(cardData.categories == null) ? (
                            <></>
                        ) : (
                            <>
                                {
                                    cardData.categories.map((data) => (
                                        <>{data.id}</>
                                    ))
                                }
                            </>
                        )}

                    </Typography>
                    <Typography sx={greyedOut}>
                        Price: ${cardData.price} | Rent: ${cardData.rent} {cardData.interval}
                    </Typography>
                    <Typography sx={description}>
                        {cardData.description}
                    </Typography>
                </Grid>
                <Grid item sm={1}>
                    <DeleteIcon />
                </Grid>

                <Grid item sm={11}>
                    <p>
                        {/* Date posted: {data.data.date} */}
                    </p>
                </Grid>
                <Grid item sm={1}>
                    <p>
                        {/* {data.data.views} views */}
                    </p>
                </Grid>
            </Grid>
        </Card>
    )
}
import { Grid, Box, Card, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { gql, useQuery } from '@apollo/client'
import { Chip } from "@mui/material";

const GET_CATEGORIES = gql`
    query categories {
        categories {
            id
            name
        }
    }
`

export default function ProductCard(data) {

    const [categoryList, setCategoryList] = useState([])
    const [productData, setProductData] = useState([])
    const [categoriesName, setCategoriesName] = useState([]);


    const cardData = {
        title: data.data.title,
        description: data.data.description,
        categories: data.data.categories,
        price: data.data.price,
        rent: data.data.rent,
        rentInterval: data.data.rentInterval,
    }
    // console.log(cardData)
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

    const { categories } = useQuery(GET_CATEGORIES, {
        onCompleted: (data) => {
            console.log(data.categories)
            let array = []
            let name = []
            for (let i = 0; i < data.categories.length; i++) {
                array[i] = data.categories[i]
                name[i] = data.categories[i].name
            }
            setCategoryList(array)
            // setCategoryNameList(name)

            console.log(array)
        }
    })
    useEffect(() => {
        if (categoryList != null && data.data.categories != null) {
            // console.log(productData)
            let tempCategoryArray = []
            for (let i = 0; i < categoryList.length; i++) {
                // console.log(categoryList[i].id)
                for (let j = 0; j < data.data.categories.length; j++) {
                    // console.log(productData.categories[j].id)
                    if (categoryList[i].id == data.data.categories[j].id) {
                        console.log(categoryList[i].name)
                        tempCategoryArray.push(categoryList[i].name)
                    }
                }
            }
            setCategoriesName(tempCategoryArray)
        }
    }, [categoryList, productData])

    return (
        <Card sx={{ width: '100%', marginBottom: 3, padding: 2 }}>
            <Grid container spacing={0}>
                <Grid item sm={12}>
                    <Typography variant="h4" sx={titleStyle}>
                        {cardData.title}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

                        {categoriesName.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                    <Typography sx={greyedOut}>
                        Price: ${cardData.price} | Rent: ${cardData.rent} {cardData.interval}
                    </Typography>
                    <Typography sx={description}>
                        {cardData.description}
                    </Typography>
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
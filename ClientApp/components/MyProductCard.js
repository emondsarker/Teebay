import { Grid, Box, Card, Typography, Chip, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { useState, useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';

const DELETE_PRODUCT = gql`
   mutation deleteProduct(
    $productId: String!
    $userId: String!
    ) {
    deleteProduct( 
        productId: $productId
        userId: $userId
    ) {
        id
      title
      description
      categories{
        id
      }
      price
      rent 
      rentInterval
      isDeleted
      ownerId
    }
  }
`
const GET_CATEGORIES = gql`
    query categories {
        categories {
            id
            name
        }
    }
`

export default function MyProductCard(data) {

    // GQL
    const [deleteProduct, { data2 }] = useMutation(DELETE_PRODUCT)
    const handleDeleteForReal = async () => {
        let formData = {
            productId: data.data.id,
            userId: localStorage.getItem("userId")
        }
        console.log(formData)
        // pass it to server
        try {
            let message = await deleteProduct({ variables: { ...formData, activation: true } })
            location.reload()
            alert('Deleted product successfully')
            console.log(message)
        } catch (error) {
            console.error(error)
            alert('Error Deleting Product')
        }
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

    const [openDelete, setOpenDelete] = useState(false)
    const handleDelete = () => {
        setOpenDelete(true);
    };
    const handleClose = () => {
        setOpenDelete(false)
    };

    const [categoryList, setCategoryList] = useState([])
    const [categoriesName, setCategoriesName] = useState([]);

    const cardData = {
        id: data.data.id,
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
        color: 'black',
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

    useEffect(() => {
        if (categoryList != null && data.data.categories != null) {

            let tempCategoryArray = []

            for (let i = 0; i < categoryList.length; i++) {
                // console.log(categoryList[i].id)
                for (let j = 0; j < data.data.categories.length; j++) {

                    if (categoryList[i].id == data.data.categories[j].id) {
                        console.log(categoryList[i].name)
                        tempCategoryArray.push(categoryList[i].name)
                    }
                }
            }
            setCategoriesName(tempCategoryArray)
        }
    }, [categoryList])

    return (
        <>
            <Card sx={{ width: '100%', marginBottom: 3, padding: 2 }}>
                <Grid container spacing={0}>
                    <Grid item sm={11}>
                        <Link href={"/my-product/" + cardData.id}>
                            <Typography variant="h4" sx={titleStyle}>
                                {cardData.title}
                            </Typography>

                            {(categoriesName == null) ? (<></>) : (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

                                    {categoriesName.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>

                            )}

                            <Typography sx={greyedOut}>
                                Price: ${cardData.price} | Rent: ${cardData.rent} {cardData.interval}
                            </Typography>
                            <Typography sx={description}>
                                {cardData.description}
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item sm={1}>
                        <Button onClick={() => { handleDelete() }} sx={{ color: "black", '&:hover': { color: "red" } }}>
                            <DeleteIcon />
                        </Button>
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
            <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Delete Product
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to DELETE this product?
                        <br />
                        Make your next choice carefully.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'red' }, color: 'white' }}>
                        No
                    </Button>
                    <Button onClick={handleDeleteForReal} autoFocus sx={{ background: 'grey', '&:hover': { backgroundColor: 'limegreen' }, color: 'white' }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
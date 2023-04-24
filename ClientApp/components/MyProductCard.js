import { Grid, Box, Card, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { useState } from 'react'
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

    const [openDelete, setOpenDelete] = useState(false)
    const handleDelete = () => {
        setOpenDelete(true);
    };
    const handleClose = () => {
        setOpenDelete(false)
    };

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
        <>
            <Card sx={{ width: '100%', marginBottom: 3, padding: 2 }}>
                <Grid container spacing={0}>
                    <Grid item sm={11}>
                        <Link href={"/my-product/" + cardData.id}>
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
                        </Link>
                    </Grid>
                    <Grid item sm={1}>
                        <Button onClick={() => { handleDelete() }}>
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
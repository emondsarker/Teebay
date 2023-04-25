import { useRouter } from "next/router";
import { use, useEffect, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import styles from '../../styles/teebay.module.css'
import { Typography, Box, Chip, Button } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers";



export default function Product() {
    const [productData, setProductData] = useState([])
    // Categories
    const [categoryNameList, setCategoryNameList] = useState([""])
    const [categoryList, setCategoryList] = useState([])
    const [categoriesName, setCategoriesName] = useState([]);

    // Rent Config
    const [openRent, setOpenRent] = useState(false);
    const [rentStartDate, setRentStartDate] = useState();
    const [rentEndDate, setRentEndDate] = useState();
    const handleRent = () => {
        setOpenRent(true);
    };
    const handleClose = () => {
        setOpenRent(false);
        setOpenBuy(false)
    };
    const startDate = (event) => {
        console.log(event.$d)
        setRentStartDate(event.$d)
    }
    const endDate = (event) => {
        console.log(event.$d)
        setRentEndDate(event.$d)
    }

    // Buy Config
    const [openBuy, setOpenBuy] = useState(false)
    const handleBuy = () => {
        setOpenBuy(true);
    };

    const router = useRouter()
    const { id } = router.query

    const PRODUCT = gql`
        query product($productId: String!) {
            product(productId: $productId) {
                id
            title
            description
            categories {
                id
            }
            price
            rent
            rentInterval
            createdAt
            updatedAt
            ownerId
            }
        }
    `;
    const GET_CATEGORIES = gql`
    query categories {
        categories {
            id
            name
        }
    }
`
    const BUY_PRODUCT = gql`
        mutation buyProduct(
            $productId: String!
            $userId: String!
            ) {
                buyProduct( 
                productId: $productId
                userId: $userId
            ) {
                id
            user {
            id
            firstName
            lastName
            }
            product {
            id
            title
            rent
            rentInterval
            }
            }
        }
        `
    const RENT_PRODUCT = gql`
        mutation rentProduct(
            $productId: String!
            $userId: String!
            $startDate: String!
            $endDate: String!
            ) {
                rentProduct( 
                productId: $productId
                userId: $userId
                startDate: $startDate
                endDate: $endDate
            ) {
                id
                user {
                id
                firstName
                lastName
                }
                product {
                id
                title
                rent
                rentInterval
                }
            }
        }
        `
    const { loading, error, data, refetch } = useQuery(PRODUCT, {
        variables: { productId: (id) },
        // skip: true,
        onCompleted: (data) => {
            // console.log(data)
            // let array = []
            // for (let i = 0; i < data.myProducts.length; i++) {
            //     array[i] = data.myProducts[i]
            // }
            setProductData(data.product[0])
        },
        errorPolicy: (error) => {
            console.log(error)
        }
    })
    // refetch({ productId: String(id) })
    console.log(productData)

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

    const [buyProduct, { data2 }] = useMutation(BUY_PRODUCT)
    const handleBuyForReal = async () => {
        let formData = {
            productId: id,
            userId: localStorage.getItem("userId")
        }
        console.log(formData)
        // pass it to server
        try {
            let message = await buyProduct({ variables: { ...formData, activation: true } })
            // location.reload()
            alert('Bought product successfully')
            console.log(message)
        } catch (error) {
            console.error(error)
            alert('Error Buying Product')
        }
    }

    const [rentProduct, { data3 }] = useMutation(RENT_PRODUCT)
    const handleRentForReal = async () => {
        let formData = {
            productId: id,
            userId: localStorage.getItem("userId"),
            startDate: rentStartDate,
            endDate: rentEndDate
        }
        console.log(formData)

        // pass it to server
        try {
            let message = await rentProduct({ variables: { ...formData, activation: true } })
            // location.reload()
            alert('Rented product successfully')
            console.log(message)
        } catch (error) {
            console.error(error)
            alert('Error Renting Product')
        }
    }


    useEffect(() => {
        let userId = window.localStorage.getItem("userId")
        if (userId == null) {
            router.push('/sign-in')
        }
    }, [])

    useEffect(() => {
        if (categoryList != null && productData.categories != null) {
            // console.log(productData)
            let tempCategoryArray = []
            for (let i = 0; i < categoryList.length; i++) {
                // console.log(categoryList[i].id)
                for (let j = 0; j < productData.categories.length; j++) {
                    // console.log(productData.categories[j].id)
                    if (categoryList[i].id == productData.categories[j].id) {
                        console.log(categoryList[i].name)
                        tempCategoryArray.push(categoryList[i].name)
                    }
                }
            }
            setCategoriesName(tempCategoryArray)
        }
    }, [categoryList, productData])
    console.log(categoriesName)

    return (
        <>
            <ResponsiveAppBar />
            <div className={styles.body}>
                <Typography variant="h2" >{productData.title}</Typography>
                <br />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>

                    {categoriesName.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                </Box>
                <br />
                <Typography variant="h5">Price: ${productData.price} </Typography>
                <br />
                <Typography>Product description:</Typography>
                <br />
                <Typography>{productData.description}</Typography>
                <br />
                <div className={styles.buttonContainer}>
                    <button className={styles.rightButton} onClick={() => { handleRent() }}>
                        Rent
                    </button>
                    <button className={styles.rightButton} onClick={() => { handleBuy() }}>
                        Buy
                    </button>
                </div>
            </div>

            <Dialog
                open={openRent}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Rental Period
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        To rent this product, please pick a start and end date for rental.
                    </DialogContentText>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Start" onChange={startDate} />
                        {" "}
                        <DatePicker label="End" onChange={endDate} />
                        {/* <DateField value={dayjs(rentStartDate)} /> */}
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'red' }, color: 'white' }}>
                        Go Back
                    </Button>
                    <Button onClick={handleRentForReal} autoFocus sx={{ background: 'grey', '&:hover': { backgroundColor: 'limegreen' }, color: 'white' }}>
                        Confirm Rent
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openBuy}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {productData.title} ${productData.price}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to buy this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'red' }, color: 'white' }}>
                        No
                    </Button>
                    <Button onClick={handleBuyForReal} autoFocus sx={{ background: 'limegreen', '&:hover': { backgroundColor: 'limegreen' }, color: 'white' }}>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
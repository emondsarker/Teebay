import { useRouter } from "next/router";
import { use, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import styles from '../../styles/teebay.module.css'
import { Typography, Box, Chip } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";

export default function Product() {
    const [productData, setProductData] = useState([])
    // Categories
    const [categoryNameList, setCategoryNameList] = useState([""])
    const [categoryList, setCategoryList] = useState([])
    const [categoriesName, setCategoriesName] = useState([]);

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
                    <button className={styles.rightButton} onClick={() => { handleAddProduct() }}>
                        Rent
                    </button>
                    <button className={styles.rightButton} onClick={() => { handleAddProduct() }}>
                        Buy
                    </button>
                </div>
            </div>
        </>
    )
}
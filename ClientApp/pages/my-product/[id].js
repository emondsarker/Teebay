import { useRouter } from "next/router";
import { use, useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import styles from '../../styles/teebay.module.css'
import { InputLabel, Typography, useTheme, OutlinedInput, Box, Chip, Button, TextField, FormControl, Select, MenuItem } from "@mui/material";
import ResponsiveAppBar from "../../components/navbar";


export default function Product() {
    const [productData, setProductData] = useState({})
    // Categories
    const [categories, setCategories] = useState([])
    const [categoriesName, setCategoriesName] = useState([])
    const [categoryNameList, setCategoryNameList] = useState([""])
    const [categoryList2, setCategoryList2] = useState([])
    const [categoriesName2, setCategoriesName2] = useState([]);

    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([]);

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

    const { categories3 } = useQuery(GET_CATEGORIES, {
        onCompleted: (data) => {
            console.log(data.categories)
            let array = []
            let name = []
            for (let i = 0; i < data.categories.length; i++) {
                array[i] = data.categories[i]
                name[i] = data.categories[i].name
            }
            setCategoryList2(array)
            setCategoryList(array)
            setCategoryNameList(name)

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
        if (categoryList2 != null && productData.categories != null) {
            // console.log(productData)
            let tempCategoryArray = []
            for (let i = 0; i < categoryList2.length; i++) {
                // console.log(categoryList[i].id)
                for (let j = 0; j < productData.categories.length; j++) {
                    // console.log(productData.categories[j].id)
                    if (categoryList2[i].id == productData.categories[j].id) {
                        console.log(categoryList2[i].name)
                        tempCategoryArray.push(categoryList2[i].name)
                    }
                }
            }
            setCategoriesName2(tempCategoryArray)
            setSelectedCategory(tempCategoryArray)
        }
    }, [categoryList2, productData])
    console.log(categoriesName2)

    const handleTitleChange = (event) => {
        setProductData({ ...productData, title: event.target.value })
    }
    const handleDescriptionChange = (event) => {
        setProductData({ ...productData, description: event.target.value })
    }
    const handlePriceChange = (event) => {
        setProductData({ ...productData, price: event.target.value })
    }
    const handleIntervalChange = (event) => {
        setProductData({ ...productData, rentInterval: event.target.value })
    }
    const handleRentChange = (event) => {
        setProductData({ ...productData, rent: event.target.value })
    }

    // MUI themes, must be cleaned and refactored, too messy
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    function getStyles(name, selectedCategory, theme) {
        return {
            fontWeight:
                selectedCategory.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const theme = useTheme();
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        // this is to match the category ID user selected to that from the database
        let arr = []
        let name = []
        for (let i = 0; i < value.length; i++) {
            for (let j = 0; j < categoryList.length; j++) {
                if (value[i] == categoryList[j].name) {
                    // console.log(categoryList[j].id, value[i])
                    arr[i] = categoryList[j].id
                    name[i] = categoryList[j].name
                }
            }
        }
        setCategories(arr)
        setCategoriesName(name)
        console.log(arr)
    };

    return (
        <>
            <ResponsiveAppBar />
            <div className={styles.body}>
                <InputLabel>Title</InputLabel>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label=""
                    name="title"
                    autoFocus
                    value={productData.title}
                    onChange={handleTitleChange}
                />
                <br /><br />

                <FormControl sx={{ m: 1, width: '100%' }}>
                    <InputLabel>Categories</InputLabel>
                    <Select

                        id="demo-multiple-chip"
                        multiple
                        value={selectedCategory}
                        autoWidth
                        label=""
                        sx={{ width: '100%' }}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {categoryNameList.map((name) => (
                            <MenuItem
                                key={name}
                                value={name}
                                style={getStyles(name, selectedCategory, theme)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <InputLabel>Description</InputLabel>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label=""
                    name="title"
                    autoFocus
                    value={productData.description}
                    onChange={handleDescriptionChange}
                    multiline='true'
                    rows={4}
                />

                <br />

                <TextField
                    margin="normal"
                    required
                    sx={{ width: '200px' }}
                    id="price"
                    label="Purchase price"
                    name="price"
                    autoFocus
                    value={productData.price}
                    InputLabelProps={{ shrink: true }}
                    onChange={handlePriceChange}
                />

                <TextField
                    margin="normal"
                    required
                    sx={{ width: '200px', marginLeft: '50px' }}
                    InputLabelProps={{ shrink: true }}
                    id="rent"
                    label="Rent"
                    name="rent"
                    autoFocus
                    value={productData.rent}
                    onChange={handleRentChange}
                />

                {(productData.rentInterval == null) ? (
                    <></>
                ) : (
                    <FormControl sx={{ width: '100px', paddingTop: '14px', paddingLeft: '10px' }}>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={productData.rentInterval}
                            sx={{ width: '200px' }}
                            defaultValue={productData.rentInterval}

                            onChange={handleIntervalChange}
                        >
                            {console.log(String(productData.rentInterval))}
                            <MenuItem value={"daily"}>Daily</MenuItem>
                            <MenuItem value={"weekly"}>Weekly</MenuItem>
                            <MenuItem value={"monthly"}>Monthly</MenuItem>
                        </Select>
                    </FormControl>
                )}


                <br />
                <div className={styles.buttonContainer}>
                    <button className={styles.rightButton} onClick={() => { handleBuy() }}>
                        Edit Product
                    </button>
                </div>
            </div>


        </>
    )
}
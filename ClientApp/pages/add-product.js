import ResponsiveAppBar from "../components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '../styles/teebay.module.css'
import { TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';

const CREATE_PRODUCT = gql`
   mutation addProduct(
    $title: String!
    $description: String!
    $categories: [CategoryInput!]!
    $price: Float!
    $rent: Float!
    $rentInterval: String!
    $isDeleted: Boolean!
    $ownerId: String!
  ) {
    addProduct(
      title: $title
      description: $description
      categories: $categories
      price: $price
      rent: $rent
      rentInterval: $rentInterval
      isDeleted: $isDeleted
      ownerId: $ownerId
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

export default function AddProduct() {

    // GQL hook
    const [addProduct, { data }] = useMutation(CREATE_PRODUCT)

    // Product Details
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [interval, setInterval] = useState("")
    const [rent, setRent] = useState("")
    const [categories, setCategories] = useState([])

    const router = useRouter()
    useEffect(() => {
        router.push('/add-product/?step=1', undefined, { shallow: true })
        // dirty fix: initialized to bought page
        router.query.step = "1"
        // better fix: query url better, maybe use middleware?
    }, [])

    useEffect(() => {
        // quick and dirty solution
        // clean this into a loop-based solution
        let currentStep = parseInt(router.query.step)
        if (currentStep <= 1) {
            document.getElementById('1').style.cssText = "background-color: purple"
            document.getElementById('2').style.cssText = "background-color: lightgrey"
            document.getElementById('3').style.cssText = "background-color: lightgrey"
            document.getElementById('4').style.cssText = "background-color: lightgrey"
            document.getElementById('5').style.cssText = "background-color: lightgrey"
        }
        else if (currentStep <= 2) {
            document.getElementById('1').style.cssText = "background-color: purple"
            document.getElementById('2').style.cssText = "background-color: purple"
            document.getElementById('3').style.cssText = "background-color: lightgrey"
            document.getElementById('4').style.cssText = "background-color: lightgrey"
            document.getElementById('5').style.cssText = "background-color: lightgrey"
        }
        else if (currentStep <= 3) {
            document.getElementById('1').style.cssText = "background-color: purple"
            document.getElementById('2').style.cssText = "background-color: purple"
            document.getElementById('3').style.cssText = "background-color: purple"
            document.getElementById('4').style.cssText = "background-color: lightgrey"
            document.getElementById('5').style.cssText = "background-color: lightgrey"
        }
        else if (currentStep <= 4) {
            document.getElementById('1').style.cssText = "background-color: purple"
            document.getElementById('2').style.cssText = "background-color: purple"
            document.getElementById('3').style.cssText = "background-color: purple"
            document.getElementById('4').style.cssText = "background-color: purple"
            document.getElementById('5').style.cssText = "background-color: lightgrey"
        }
        else if (currentStep <= 5) {
            document.getElementById('1').style.cssText = "background-color: purple"
            document.getElementById('2').style.cssText = "background-color: purple"
            document.getElementById('3').style.cssText = "background-color: purple"
            document.getElementById('4').style.cssText = "background-color: purple"
            document.getElementById('5').style.cssText = "background-color: purple"
        }

    }, [router.query.step])

    // Handle change of steps
    function nextStep() {
        let currentStep = parseInt(router.query.step)
        console.log(currentStep)
        if (currentStep >= 1 && currentStep <= 5) {
            let counter = currentStep + 1
            router.push('/add-product/?step=' + counter, undefined, { shallow: true })
        }
    }
    function prevStep() {
        let currentStep = parseInt(router.query.step)
        console.log(currentStep)
        if (currentStep >= 1 && currentStep <= 5) {
            let counter = currentStep - 1
            router.push('/add-product/?step=' + counter, undefined, { shallow: true })
        }
    }

    // dummy values for testing FE
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
    ];
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
    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const theme = useTheme();
    const [personName, setPersonName] = useState([]);


    // Handle input events
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        setCategories(value)
        console.log(categories)
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    }
    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    }
    const handleRentChange = (event) => {
        setRent(event.target.value);
    }
    const handleSubmit = async () => {

        // GQL schema
        //     title: $title
        //   description: $description
        //   categories: $categories
        //   price: $price
        //   rent: $rent
        //   rentInterval: $rentInterval
        //   isDeleted: $isDeleted
        //   ownerId: $ownerId

        let formData = {
            title: "test",
            description: "test description",
            categories: [{ id: 1 }, { id: 2 }],
            price: 10,
            rent: 20,
            rentInterval: 'daily',
            isDeleted: false,
            ownerId: "a119942a-a419-4c34-80e9-0194a6636a1c"
        }

        console.log(formData)

        try {
            await addProduct({ variables: { ...formData, activation: true } })
            alert('Added product successfully')
            console.log(data)
        } catch (error) {
            console.error(error)
            alert('Error creating user')
        }

    }

    //
    const handleKeyDown = (event) => {
        if (event.key == "Enter") {
            nextStep()
        }
    }


    return (
        <>
            <ResponsiveAppBar />
            <div className={styles.body}>

                <div className={styles.steps}>
                    <p id="1" >
                        1
                    </p>
                    <p id="2" >
                        2
                    </p>
                    <p id="3">
                        3
                    </p>
                    <p id="4" >
                        4
                    </p>
                    <p id="5" >
                        5
                    </p>
                </div>

                {
                    ((router.query.step == "1")) ?
                        (
                            <div className={styles.AddProductContainer}>
                                <h1>Select a title for your product</h1>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label=""
                                    name="title"
                                    autoFocus
                                    value={title}
                                    onChange={handleTitleChange}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>

                        ) : (
                            <></>
                        )
                }

                {
                    ((router.query.step == "2")) ?
                        (
                            <div className={styles.AddProductContainer}>
                                <h1>Select Categories</h1>
                                <FormControl sx={{ m: 1, width: '100%' }}>
                                    <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={personName}
                                        autoWidth
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
                                        {names.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}
                                                style={getStyles(name, personName, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        ) : (
                            <></>
                        )
                }

                {
                    ((router.query.step == "3")) ?
                        (
                            <div className={styles.AddProductContainer}>
                                <h1>Enter a description</h1>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="title"
                                    label=""
                                    name="title"
                                    autoFocus
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    multiline='true'
                                    rows={4}
                                />
                            </div>
                        ) : (
                            <></>
                        )
                }

                {
                    ((router.query.step == "4")) ?
                        (
                            <div className={styles.AddProductContainer}>
                                <h1>Select Price</h1>
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{ marginLeft: '40%', width: '200px' }}
                                    id="price"
                                    label="Purchase price"
                                    name="price"
                                    autoFocus
                                    value={price}
                                    onChange={handlePriceChange}
                                />
                                <br />
                                <TextField
                                    margin="normal"
                                    required
                                    sx={{ width: '200px', marginLeft: '30%' }}
                                    id="rent"
                                    label="Rent price"
                                    name="rent"
                                    autoFocus
                                    value={rent}
                                    onChange={handleRentChange}
                                />
                                <FormControl sx={{ width: '100px', paddingTop: '14px', paddingLeft: '10px' }}>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={interval}
                                        sx={{ width: '200px' }}
                                        defaultValue="10"
                                        label="Interval"
                                        onChange={handleIntervalChange}
                                    >
                                        <MenuItem value={'daily'}>Daily</MenuItem>
                                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        ) : (
                            <></>
                        )
                }

                {
                    ((router.query.step == "5")) ?
                        (
                            <div className={styles.AddProductContainer}>
                                <h1>Summary</h1>
                                <div className={styles.summary}>
                                    <p>Title: {title}</p>
                                    <p>Categories: {categories.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}</p>
                                    <p>Description: {description}</p>
                                    <p>Price: {price}, To rent: {rent} per {interval}</p>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                }


            </div>
            <div className={styles.body}>
                <div className={styles.buttonContainer}>
                    {(router.query.step > 1) ? (
                        <button className={styles.leftButton} onClick={() => { prevStep() }}>
                            Back
                        </button>
                    ) : (
                        <></>
                    )}
                    {(router.query.step > 4) ? (
                        <></>
                    ) : (
                        <button className={styles.rightButton} onClick={() => { nextStep() }}>
                            Next
                        </button>
                    )}
                    {(router.query.step == 5) ? (
                        <button className={styles.rightButton} onClick={() => { handleSubmit() }}>
                            Submit
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    )
}
import ResponsiveAppBar from "../components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from '../styles/teebay.module.css'
import { gql, useQuery } from '@apollo/client'
import { Typography } from "@mui/material";
import { Card } from "@mui/material";


const PURCHASED = gql`
  query productsPurchasedByUser($userId: String!) {
    productsPurchasedByUser(userId: $userId) {

        product {
            id
            title
            price
        }
    }
  }
`;
const SOLD = gql`
  query productsSoldByUser($userId: String!) {
    productsSoldByUser(userId: $userId) {
        id 
        title
        price
    }
  }
`;
const BORROWED = gql`
  query productsRentedByUser($userId: String!) {
    productsRentedByUser(userId: $userId) {
        product{
            id 
            title
            price
            rent
            rentInterval
        }
    }
  }
`;
const LENT = gql`
  query productsLentByUser($userId: String!) {
    productsLentByUser(userId: $userId) {
        id 
        title
        price
        rent
        rentInterval
    }
  }
`;

export default function Transcation() {

    const [purchasedData, setPurchasedData] = useState([])
    const PURCHASED_DATA = useQuery(PURCHASED, {
        variables: { userId: "" },
        skip: true,
        onCompleted: (data) => {
            let array = []
            for (let i = 0; i < data.productsPurchasedByUser.length; i++) {
                array[i] = data.productsPurchasedByUser[i]
            }
            setPurchasedData(array)
        },
        errorPolicy: (error) => {
            console.log(error)
        }
    })

    const [soldData, setSoldData] = useState([])
    const SOLD_DATA = useQuery(SOLD, {
        variables: { userId: "" },
        skip: true,
        onCompleted: (data) => {
            console.log(data)
            let array = []
            for (let i = 0; i < data.productsSoldByUser.length; i++) {
                array[i] = data.productsSoldByUser[i]
            }
            setSoldData(array)
        },
        errorPolicy: (error) => {
            console.log(error)
        }
    })

    const [borrowedData, setBorrowedData] = useState([])
    const BORROWED_DATA = useQuery(BORROWED, {
        variables: { userId: "" },
        skip: true,
        onCompleted: (data) => {
            console.log(data)
            let array = []
            for (let i = 0; i < data.productsRentedByUser.length; i++) {
                array[i] = data.productsRentedByUser[i]
            }
            setBorrowedData(array)
        },
        errorPolicy: (error) => {
            console.log(error)
        }
    })

    const [lentData, setLentData] = useState([])
    const LENT_DATA = useQuery(LENT, {
        variables: { userId: "" },
        skip: true,
        onCompleted: (data) => {
            console.log(data)
            let array = []
            for (let i = 0; i < data.productsLentByUser.length; i++) {
                array[i] = data.productsLentByUser[i]
            }
            setLentData(array)
        },
        errorPolicy: (error) => {
            console.log(error)
        }
    })
    console.log(lentData)


    useEffect(() => {
        // redirect()
        let userId = window.localStorage.getItem("userId")
        if (userId == null) {
            router.push('/sign-in')
        }
        PURCHASED_DATA.refetch({ userId: userId })
        SOLD_DATA.refetch({ userId: userId })
        BORROWED_DATA.refetch({ userId: userId })
        LENT_DATA.refetch({ userId: userId })
    }, [])

    const router = useRouter()
    useEffect(() => {
        let userId = window.localStorage.getItem("userId")
        if (userId == null) {
            router.push('/sign-in')
        }
        router.push('/transaction/?category=bought', undefined, { shallow: true })
        // dirty fix: initialized to bought page
        router.query.category = "bought"
        // better fix: query url better, maybe use middleware?
    }, [])

    useEffect(() => {
        // change other class to default
        document.getElementById('bought').style.cssText = "color: grey; border-bottom-color: white"
        document.getElementById('sold').style.cssText = "color: grey; border-bottom-color: white"
        document.getElementById('borrowed').style.cssText = "color: grey; border-bottom-color: white"
        document.getElementById('lent').style.cssText = "color: grey; border-bottom-color: white"
        // set active class 
        document.getElementById(router.query.category).style.cssText = "color: purple; border-bottom-color: purple"

    }, [router.query.category])

    function shallowRouting(value) {
        console.log(value)
        console.log(router.query.category)
        router.push('/transaction/?category=' + value, undefined, { shallow: true })
    }
    return (
        <>
            <ResponsiveAppBar />
            <div className={styles.transactionTabs}>
                <button id="bought" onClick={() => shallowRouting("bought")}>
                    Bought
                </button>
                <button id="sold" onClick={() => shallowRouting("sold")}>
                    Sold
                </button>
                <button id="borrowed" onClick={() => shallowRouting("borrowed")}>
                    Borrowed
                </button>
                <button id="lent" onClick={() => shallowRouting("lent")}>
                    Lent
                </button>
            </div>

            {
                ((router.query.category == "bought" && purchasedData != null)) ?
                    (
                        <>
                            {purchasedData.map((data) => (
                                <div className={styles.body}>
                                    <Card sx={{ padding: '20px' }}>
                                        <Typography key={data.product.id}>
                                            ID: {data.product.id}
                                        </Typography>
                                        <Typography variant="h5">
                                            {data.product.title}
                                        </Typography>
                                        <Typography>
                                            Price: {data.product.price}
                                        </Typography>
                                    </Card>

                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )
            }

            {
                ((router.query.category == "sold")) ?
                    (
                        <>
                            {soldData.map((data) => (
                                <div className={styles.body}>
                                    <Card sx={{ padding: '20px' }}>
                                        <Typography key={data.id}>
                                            ID: {data.id}
                                        </Typography>
                                        <Typography variant="h5">
                                            {data.title}
                                        </Typography>
                                        <Typography>
                                            Price: {data.price}
                                        </Typography>
                                    </Card>

                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )
            }

            {
                ((router.query.category == "borrowed")) ?
                    (
                        <>
                            {borrowedData.map((data) => (
                                <div className={styles.body}>
                                    <Card sx={{ padding: '20px' }}>
                                        <Typography key={data.product.id}>
                                            ID: {data.product.id}
                                        </Typography>
                                        <Typography variant="h5">
                                            {data.product.title}
                                        </Typography>
                                        <Typography>
                                            Rent: ${data.product.rent} {data.product.rentInterval}
                                        </Typography>
                                    </Card>

                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )
            }

            {
                ((router.query.category == "lent")) ?
                    (
                        <>
                            {lentData.map((data) => (
                                <div className={styles.body}>
                                    <Card sx={{ padding: '20px' }}>
                                        <Typography key={data.id}>
                                            ID: {data.id}
                                        </Typography>
                                        <Typography variant="h5">
                                            {data.title}
                                        </Typography>
                                        <Typography>
                                            Price: ${data.rent} {data.rentInterval}
                                        </Typography>
                                    </Card>

                                </div>
                            ))}
                        </>
                    ) : (
                        <></>
                    )
            }
        </>
    )
}
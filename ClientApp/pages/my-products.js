import React from 'react'
import ResponsiveAppBar from '../components/navbar'
import { InferGetServerSidePropsType } from 'next'
import MyProductCard from '../components/MyProductCard'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import styles from '../styles/teebay.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { gql, useQuery, useApolloClient } from '@apollo/client'
import ProductCard from '../components/ProductCard'
// import cache from '../components/cache'

export default function MyProducts() {

  const [productData, setProductData] = useState([{}])
  const [userId, setUserId] = useState("")
  // test data 
  const test = {
    title: "Cricket kit",
    categories: "Sporting Goods, Outdoor",
    price: "500",
    rent: "100",
    interval: "daily",
    description: "2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.",
    date: "21st August 2020",
    views: "156"
  }
  const router = useRouter()
  const handleAddProduct = () => {

    router.push('/add-product')
    console.log("pressed")
  }

  const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;
  const MY_PRODUCTS = gql`
  query myProducts($userId: String!) {
    myProducts(userId: $userId) {
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

  const { loading, error, data, refetch } = useQuery(MY_PRODUCTS, {
    variables: { userId: "a119942a-a419-4c34-80e9-0194a6636a1c" },
    skip: true,
    onCompleted: (data) => {
      console.log(data)
      let array = []
      for (let i = 0; i < data.myProducts.length; i++) {
        array[i] = data.myProducts[i]
      }
      setProductData(array)
    },
    errorPolicy: (error) => {
      console.log(error)
    }
  })
  console.log(productData)

  const client = useApolloClient();
  async function redirect() {
    let data = await client.query({ query: IS_LOGGED_IN, fetchPolicy: 'cache-only' })
    console.log(data)

    // if (!isLoggedIn) {
    //   // router.push('/sign-in')
    //   console.log("uhoh")
    // }
  }

  useEffect(() => {
    // redirect()
    let userId = window.localStorage.getItem("userId")
    if (userId == null) {
      router.push('/sign-in')
    }
    setUserId(userId)
    refetch({ userId: userId })
    console.log(userId)
  }, [])

  return (

    <div>
      <ResponsiveAppBar />
      <div className={styles.body}>

        {(productData == null) ? (
          <></>
        ) : (
          <>
            {productData.map((data) => (
              // 
              <>
                <ProductCard sx={{ minWidth: '500px' }} data={data} />
                {console.log(data)}
              </>

            ))}
          </>

        )}

        <div className={styles.buttonContainer}>

          <button className={styles.rightButton} onClick={() => { handleAddProduct() }}>
            Add Product
          </button>
        </div>


      </div>

    </div>

  )
}




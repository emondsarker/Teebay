import React from 'react'
import ResponsiveAppBar from '../components/navbar'
import { InferGetServerSidePropsType } from 'next'
import ProductCard from '../components/ProductCard'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

export default function MyProducts() {
  const [productData, setProductData] = useState([{}])
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

  const ALL_PRODUCTS = gql`
  query products {
    products {
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

  const { loading, error, data, refetch } = useQuery(ALL_PRODUCTS, {
    onCompleted: (data) => {
      // console.log(data.products[0])
      let array = []
      for (let i = 0; i < data.products.length; i++) {
        array[i] = data.products[i]
      }
      setProductData(array)
    }
  })
  console.log(productData)
  useEffect(() => {

  }, [])

  return (

    <div>
      <ResponsiveAppBar />
      <Box
        sx={{
          marginTop: '5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

        }}>

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

      </Box>

    </div>

  )
}



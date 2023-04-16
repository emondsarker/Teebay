import React from 'react'
import ResponsiveAppBar from '../components/navbar'
import { InferGetServerSidePropsType } from 'next'
import ProductCard from '../components/ProductCard'
import { Box } from '@mui/system'

export default function MyProducts() {
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
  return (

    <div>
      <ResponsiveAppBar/>
      <Box  
      sx={{
            marginTop: '5%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        <ProductCard data={test}/>
          </Box>
     
    </div>
   
  )
}



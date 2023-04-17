import React from 'react'
import ResponsiveAppBar from '../components/navbar'
import { InferGetServerSidePropsType } from 'next'
import MyProductCard from '../components/MyProductCard'
import { Box } from '@mui/system'
import { Button } from '@mui/material'
import styles from '../styles/teebay.module.css'
import { useRouter } from 'next/router'

export default function MyProducts() {
  
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
  const handleAddProduct=()=>{
    
    router.push('/add-product')
    console.log("pressed")
  }

  return (

    <div>
      <ResponsiveAppBar/>
      <div className={styles.body}>
        
        <MyProductCard data={test}/>

        <div className={styles.buttonContainer}>
          
          <button className={styles.rightButton} onClick={()=>{handleAddProduct()}}>
            Add Product
          </button>
        </div>  
        

      </div>
     
    </div>
   
  )
}



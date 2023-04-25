import React from 'react'
import ResponsiveAppBar from '../components/navbar'
import styles from '../styles/teebay.module.css'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'


export default function MyProducts() {
  const [productData, setProductData] = useState([{}])
  const [categoryList, setCategoryList] = useState([])

  const ALL_PRODUCTS = gql`
  query products {
    products {
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
      <div className={styles.body}>

        {(productData == null && categoryList == null) ? (
          <></>
        ) : (
          <>
            {productData.map((data) => (
              // 
              <>
                <Link href={"/product/" + data.id}>

                  <ProductCard sx={{ minWidth: '500px' }} data={data} categories={categoryList} />

                </Link>
              </>

            ))}
          </>

        )}

      </div>

    </div>

  )
}



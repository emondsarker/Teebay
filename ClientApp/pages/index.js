import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();
  useEffect(() => {
    router.push('/my-products')
    // dirty fix: initialized to bought page
    router.query.category = "bought"
    // better fix: query url better, maybe use middleware?
  }, [])

  return (<></>)
}

import ResponsiveAppBar from "../components/navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Transcation(){
    const router = useRouter()
    
    useEffect(()=>{
        router.push('/transaction/?category=bought', undefined, {shallow: true})
    }, [])

    useEffect(()=>{
        console.log('counter changed')
    },[router.query.bought])

    function shallowRouting(value){
        console.log(value)
        console.log(router.query.category)
        router.push('/transaction/?category='+value, undefined, {shallow: true})
    }
    return(
        <>
            <ResponsiveAppBar/>
            <div className="transactionTabs">
                <button onClick={()=>shallowRouting("bought")}>
                    Bought
                </button>
                <button onClick={()=>shallowRouting("sold")}>
                    Sold
                </button>
                <button onClick={()=>shallowRouting("borrowed")}>
                    Borrowed
                </button>
                <button onClick={()=>shallowRouting("lent")}>
                    Lent
                </button>
            </div>

            {
                ((router.query.category == "bought")) ?
                (
                    <h1>Bought</h1>
                ) : (
                    <></>
                )
            }

            {
                ((router.query.category == "sold")) ?
                (
                    <h1>Sold</h1>
                ) : (
                    <></>
                )
            }

            {
                ((router.query.category == "borrowed")) ?
                (
                    <h1>Borrowed</h1>
                ) : (
                    <></>
                )
            }

            {
                ((router.query.category == "lent")) ?
                (
                    <h1>Lent</h1>
                ) : (
                    <></>
                )
            }
        </>
    )
}
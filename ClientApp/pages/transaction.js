import ResponsiveAppBar from "../components/navbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from '../styles/teebay.module.css'

export default function Transcation() {
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
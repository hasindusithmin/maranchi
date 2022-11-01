import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Update() {
    const router = useRouter();
    const [Id,setId] = useState(false)
    const [row,setRow] = useState(null)

    useEffect(()=>{
        const {id} = router.query;
        if (id !== undefined && !Id) {
            setId(Id)
            
        }
    },[])

    

    return (
        <></>
    )
}
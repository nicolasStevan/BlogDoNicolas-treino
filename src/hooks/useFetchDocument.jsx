import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";

export const useFetchDocument = (docCollection,search = null, uid = null) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //não ter memória vazada
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        
        async function loadData(){
            if(cancelled) return

            setLoading(true)

            const colectionRef = await collection(db, docCollection)

            try {
                let q;

                q = query(colectionRef, orderBy('createdAt', 'desc'))

                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(
                        querySnapshot.docs.map((doc) => ({
                            ...doc.data(),
                            id: doc.id
                        }))
                    )
                })
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.message)
                setLoading(false)

            }
        }
        loadData()
    },[docCollection,search,uid,cancelled])

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return {documents, error, loading}
}
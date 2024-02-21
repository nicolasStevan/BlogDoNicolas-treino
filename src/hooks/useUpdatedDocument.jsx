import {useState, useEffect, useReducer} from 'react'
import { db } from '../firebase/config'
import { updateDoc, doc} from 'firebase/firestore'

const initialState = {
    loading: false,
    error: null
}

const updatedReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null};
        case "UPDATED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

export const useUpdateDocuments = (collectionName) => {
    
    const [response, dispatch] = useReducer(updatedReducer, initialState)
    
    
    //não ter memória vazada
    const [cancelled, setCancelled] = useState(false)

    const checkIfIsCanceledBeforeDispatch = (action) => {
        console.log('Checking if canceled before dispatch:', action)
        if (!cancelled) {
            console.log('Dispatching action:', action);
            dispatch(action);
        }
    };

    

    const updateDocument = async (id, data) => {
        console.log('Insert document started');
        checkIfIsCanceledBeforeDispatch({type: 'LOADING'})

        try {
            const docRef = await doc(db, collectionName, id)

            const updatedDocument = await updateDoc(docRef, data)

            checkIfIsCanceledBeforeDispatch({type: 'UPTADED_DOC', payload: updatedDocument})

        } catch (error) {
            checkIfIsCanceledBeforeDispatch({type: 'ERROR', payload: error.message})
        }

    };

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return {updateDocument, response}

}
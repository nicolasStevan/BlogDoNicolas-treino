import {useState, useEffect, useReducer} from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: false,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null};
        case "INSERTED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

export const useInsertDocuments = (collectionName) => {
    
    const [response, dispatch] = useReducer(insertReducer, initialState)
    
    
    //não ter memória vazada
    const [cancelled, setCancelled] = useState(false)

    const checkIfIsCanceledBeforeDispatch = (action) => {
        console.log('Checking if canceled before dispatch:', action)
        if (!cancelled) {
            console.log('Dispatching action:', action);
            dispatch(action);
        }
    };

    

    const insertDocument = async (document) => {
        console.log('Insert document started');
        checkIfIsCanceledBeforeDispatch({type: 'LOADING'})

        try {
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(collection(db, collectionName), newDocument)

            checkIfIsCanceledBeforeDispatch({type: 'INSERTED_DOC', payload: insertedDocument})

        } catch (error) {
            checkIfIsCanceledBeforeDispatch({type: 'ERROR', payload: error.message})
        }

    };

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return {insertDocument, response}

}
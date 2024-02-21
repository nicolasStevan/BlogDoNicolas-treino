import {useState, useEffect, useReducer} from 'react'
import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

const initialState = {
    loading: false,
    error: null
}

const deleteReducer = (state, action) => {
    switch(action.type){
        case "LOADING":
            return {loading: true, error: null};
        case "DELETED_DOC":
            return {loading: false, error: null};
        case "ERROR":
            return {loading: false, error: action.payload};
        default:
            return state
    }
}

export const useDeleteDocument = (docCollection) => {
    
    const [response, dispatch] = useReducer(deleteReducer, initialState)
    
    
    //não ter memória vazada
    const [cancelled, setCancelled] = useState(false)

    const checkIfIsCanceledBeforeDispatch = (action) => {
        console.log('Checking if canceled before dispatch:', action)
        if (!cancelled) {
            console.log('Dispatching action:', action);
            dispatch(action);
        }
    };

    

    const deleteDocument = async (id) => {
        console.log('Insert document started');
        checkIfIsCanceledBeforeDispatch({type: 'LOADING'})

        try {
           const deletedDocument = await deleteDoc(doc(db,docCollection, id))

            checkIfIsCanceledBeforeDispatch({type: 'DELETED_DOC', payload: deletedDocument})

        } catch (error) {
            checkIfIsCanceledBeforeDispatch({type: 'ERROR', payload: error.message})
        }

    };

    useEffect(() => {
        return () => {
            setCancelled(true)
        }
    }, [])

    return {deleteDocument, response}

}
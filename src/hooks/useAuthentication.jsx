import {db} from "../firebase/config";

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup fuunction (limpar o que foi feito, evitando vazar memoria)
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCanceled(){ // checar se foi cancelado
        if(cancelled){
            return;
        }
    }
    // register
    const createUser = async (data) => { // criar usuario
         checkIfIsCanceled();

         setLoading(true);
         setError(null)

         try { // tentar criar usuario
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
            await updateProfile(user, { // atualizar perfil
                displayName: data.name
            })

            setLoading(false);
         
            return user;
            } catch (error) { // se der erro
            console.log(error.message)
            console.log(typeof error.message)         
            
            let SystemErrorMessage;

            if(error.message.includes("Password")){
                SystemErrorMessage = "A senha deve ter pelo menos 6 caracteres"
            }else if(error.message.includes("email-already")){
                SystemErrorMessage = "O email já está em uso"
            }else{
                SystemErrorMessage = "Ocorreu um erro ao criar o usuário tente mais tarde"
            }
            setLoading(false);
            setError(SystemErrorMessage)
        }
        
    }

    // Logout - sign out
    const logout = () => {
        checkIfIsCanceled();

        signOut(auth)

    }

    // Login

    const login = async (data) => {
        checkIfIsCanceled();
        setLoading(true);
        setError(false);

        try {
            
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);

        } catch (error) {
            let SystemErrorMessage;
            
            if(error.message.includes("user-not-found")){
                SystemErrorMessage = "Usuário não encontrado"
            }else if(error.message.includes("wrong-password")){
                SystemErrorMessage = "Senha incorreta"
            }else{
                SystemErrorMessage = "Ocorreu um erro ao fazer o login tente mais tarde"
            } 
            setError(SystemErrorMessage)
            setLoading(false);
        }

    }

    useEffect(() =>{ // limpar o que foi feito
        return () => {
            setCancelled(true);
        }
    }, [])
    
    return{ // retornar
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}
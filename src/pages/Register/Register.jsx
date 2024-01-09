import React from 'react'
import style from './Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Register = () => {
  
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error , setError] = useState('')

  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      displayName,
      email,
      password
    }
    if(password !== confirmPassword){
      setError("As senhas não são iguais")
      return
    }

    const res = await createUser(user);

    console.log(res)

  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])

  return (
    <div className={style.register}>
      <h1>Cadastre-se Para postar Algo</h1>
      <p>Crie o seu Perfil de Úsuario e comece já a postar novas Ideias no Blog !</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" name='displayName' required placeholder='Nome do Usuario' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label>
          <span>Email:</span>
          <input type="text" name='email' required placeholder='Insira seu Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Insira sua Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='confirmPassword' required placeholder='Insira sua Senha novamente' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        {!loading && <button className='btn'>Cadastrar</button> }
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register

import React from 'react'
import style from './Login.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error , setError] = useState('')

  const {login, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      email,
      password
    }

    const res = await login(user);

    console.log(res)

  }

  useEffect(() => {
    if(authError){
      setError(authError)
    }
  }, [authError])
 
 
 
  return (
    <div className={style.login}>
        <h1>Realizar Login</h1>
      <p>Faça o seu login para acessar o blog</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input type="text" name='email' required placeholder='Insira seu Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span>Senha:</span>
          <input type="password" name='password' required placeholder='Insira sua Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {!loading && <button className='btn'>Login</button> }
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login

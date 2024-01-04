import React from 'react'
import style from './Register.module.css'

import { useState, useEffect } from 'react'

const Register = () => {
  
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error , setError] = useState('')

  const handleSubmit = (e) => {
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
    console.log(user)

  }

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
        <button className='btn'>Cadastrar</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register

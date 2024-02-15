import style from './dashboard.module.css'

import { Link } from 'react-router-dom'

//hooks
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  //posts do usuario
  const posts = []
  return (
    <div>
        <h2>Dashboard</h2>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (
          <div className={style.noposts}>
            <p>Não foram encontrados nenhum post</p>
            <Link to='/posts/create' className='btn'>Criar um post </Link>
          </div>
        ) : (
          <div>
            <p>Tem Posts!</p>
          </div>
        )}
    </div>
  )
}

export default Dashboard

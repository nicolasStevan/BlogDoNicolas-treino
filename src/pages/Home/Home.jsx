// CSS
import styles from './Home.module.css'

// hooks
import { useNavigate,Link} from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

// states
import { useState } from 'react';

//components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('')
  const {documents: posts,loading,error} = useFetchDocument('posts',query)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(query){
      return navigate(`/search?q=${query}`)
    }
  }
  console.log(posts)
  return (
    <div className={styles.home}>
      <h1>Veja os posts Mais Recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input type="text" placeholder='Ou Busque por tags..' onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post} />
        ))}

        {posts && posts.length === 0 && (<div className={styles.noposts}>
          <p>Nenhum post encontrado</p>
          <Link to='/posts/create' className='btn'>Crie um post</Link>
        </div>)}
      </div>
    </div>
  )
}

export default Home

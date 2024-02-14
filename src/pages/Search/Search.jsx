import styles from './Search.module.css'

//hooks

import { useFetchDocument } from '../../hooks/useFetchDocument'
import { useQuery } from '../../hooks/useQuery'

//components
import PostDetail from '../../components/PostDetail'

import { Link } from 'react-router-dom'

const Search = () => {
    const query = useQuery()
    const search = query.get('q')

    const {documents: posts} = useFetchDocument('posts', search)

  return (
    <div className={styles.search_container}>
      <h1>Search</h1>
      <div>
        {posts && posts.length === 0 && 
            <>
                <p>Nenhum post encontrado</p>
                <Link to='/' className="btn btn-dark">Voltar Para a Home</Link>   
            </> }
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post}/>
        ))}
      </div>
    </div>
  )
}

export default Search

import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Post = () => {
    const {id} = useParams()
    const {document: post,loading} = useFetchDocuments('posts',id)

  return (
    <div>
        {loading && <p>Carregando...</p>}
      {post && (
        <>
        <h1>{post.title}</h1>
        </>
      )}
    </div>
  )
}

export default Post

import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

const Post = () => {
    const {id} = useParams()
    const {document: post,loading} = useFetchDocuments('posts',id)

  return (
    <div className={styles.post_container}>
        {loading && <p>Carregando...</p>}
      {post && (
        <>
        <h1>{post.title}</h1>
        <img src={post.image} alt={post.title} />
        <p>{post.body}</p>
        <h3>Este Post trata sobre:</h3>
        <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
          <span>#</span>
          {tag}
          </p>
        ))}
        </div>
        </>
      )}
    </div>
  )
}

export default Post

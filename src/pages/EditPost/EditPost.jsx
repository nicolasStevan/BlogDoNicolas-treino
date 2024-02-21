import style from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useUpdateDocuments } from '../../hooks/useUpdatedDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'



const EditPost = () => {
  const {id} = useParams()
  const {document: post} = useFetchDocuments('posts', id)
  

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const [butonName, setButonName] = useState("Editar")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log("caiu no useeffect")
    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const tags = post.tagsArray.join(", ");
      setTags(tags)
    }
}, [post])


  const {user} = useAuthValue()
  const navigate = useNavigate()

  const {updateDocument, response} = useUpdateDocuments("posts")

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    setLoading(true)

    // Sua lógica de validação aqui
    try {
      new URL(image);
    } catch (error) {
      setLoading(false)
    return setFormError('Insira uma URL válida para a imagem');
    }

    // criar array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos os campos
    if (!title || !body || !image || !tags) {
      setFormError('Preencha todos os campos');
    }

    if(formError) return;

     
      const data = {
        title,
        body,
        image,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      }

      updateDocument(id, data)
      

      // Redirecionar para a homepage
      navigate('/dashboard');
  };

  useEffect(() => {
      console.log(response.loading)
    if(loading){
      setButonName("Aguarde...")}
    else{
      setButonName("Editar")
    }
  }, [loading]);


  return (
    <div className={style.edit_post}>
        {post && (
          <>
             <h2>Editar o Post: {post.title}</h2>
      <p>Altere o que você quiser no seu Post</p>
      <form onSubmit={HandleSubmit}>
        <label>
          <span>Titulo:</span>
          <input type="text" name='title' required placeholder='Escreva um titulo Massa' onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>Imagem:</span>
          <input type="text" name='image' required placeholder='Insira uma imagem que refere-se ao seu post' onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <p className={style.preview_title}>
        Preview da imagem que você colocou
        <img className={style.image_preview} src={post.image} alt={post.title} />
        </p>
        <label>
          <span>Conteúdo:</span>
          <textarea name='body' required placeholder='Escreva o conteúdo do seu post' onChange={(e) => setBody(e.target.value)} value={body} />
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" name='tags' required placeholder='Insira tags para o seu post' onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>

          <button disabled={loading} className="btn">{butonName}</button>
        {(response?.error || formError) && (
          <p className="error">{response?.error || formError}</p>
        )}
      </form>
    
          </>
        )}
    </div>
  )
}

export default EditPost

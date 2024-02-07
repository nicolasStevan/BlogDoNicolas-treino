import style from './createpost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [image, setImage] = useState(null)
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const [butonName, setButonName] = useState("Criar Post")
  const [loading, setLoading] = useState(false)

  const {user} = useAuthValue()
  const navigate = useNavigate()

  const {insertDocument, response} = useInsertDocuments("posts")

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

    try {
      await insertDocument({
        title,
        body,
        image,
        tagsArray,
        userId: user.uid,
        createdBy: user.displayName,
      });


      // Redirecionar para a homepage
      navigate('/');
    } catch (error) {
      setFormError(error.message);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
      console.log(response.loading)
    if(loading){
      setButonName("Aguarde...")}
    else{
      setButonName("Criar Post")
    }
  }, [loading]);


  return (
    <div className={style.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento</p>
      <form onSubmit={HandleSubmit}>
        <label>
          <span>Titulo:</span>
          <input type="text" name='title' required placeholder='Escreva um titulo Massa' onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>Imagem:</span>
          <input type="text" name='image' required placeholder='Insira uma imagem que refere-se ao seu post' onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
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
    
    </div>
  )
}

export default CreatePost

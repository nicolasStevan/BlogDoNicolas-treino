// CSS
import style from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={style.about}>
      <h2>Sobre o Mini Blog <span>Do Nicolas</span></h2> 
      <p>Fiz esse projeto com React para fazer a estilização visual do site "front-end" e no "back-end" utilizei o firebase </p>
      <Link to="/posts/create" className='btn'>
        Criar Post
      </Link>
    </div>
  )
}

export default About

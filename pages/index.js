import Link from 'next/link'
import Navbar from '../components/navbar/index'
import 'bootstrap/scss/bootstrap.scss'

export default function Home({ posts }) {
  return (
    <React.Fragment>
      <Navbar 
        changeColorOnScroll={100}
      />
      <h1>Liste des posts</h1>
      <ul>
        {posts.map((post, id) => (
          <li key={id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  return {
    props: {
      posts
    }
  }
}

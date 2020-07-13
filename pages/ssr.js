import Link from 'next/link'
import Navbar from '../components/navbar/index'

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
            <Link href={`/ssr/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:3333/posts')
  const posts = await res.json()

  return {
    props: {
      posts
    }
  }
}
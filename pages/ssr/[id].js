import Navbar from '../../components/navbar/index'

export default function Post({ post }) {
    return(
       console.log(post),
        <React.Fragment>
            <Navbar />
            <h1>Post {post.title}</h1>
            <p>{post.body}</p>
        </React.Fragment>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3333/posts/${id}`)
    const post = await res.json()
  
    return {
      props: {
        post
      }
    }
  }
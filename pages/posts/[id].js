import Navbar from '../../components/navbar/index'
import Loader from '../../components/loader/index'
import fetcher from '../../tools/fetcher'
import useSWR, { mutate } from 'swr'


export default function Post({ post }) {


  const usePosts = () => {
    const { data, error } = useSWR(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`, fetcher)
    return {
      data: data,
      isLoading: !error && !data,
      isError: error
    }
  }

  const { data, isLoading, isError } = usePosts()

  const onHandleClick = async () => {
    mutate(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`, async () => {
      const post = await fetcher('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify({
          body: "New comment ...",
          email: "fake@email.fr",
          id: 9999,
          name: "New comment",
          postId: 1
        })
      })
    })
  }


  return (
    isLoading ? (
      <Loader />
    ) : (
        <React.Fragment>
          <Navbar />
          <h1>Post {post.title}</h1>
          <p>{post.body}</p>
          <hr />
          <div className="container">
            <div className="row">
              <div className="col-8 m-auto">
                {isError && <p>Une erreur s'est produite</p>}
                <button className="w-100" onClick={onHandleClick}> Ajouter un commentaire</button>
                {data && data.map((i, id) => (
                  <p key={id}>{i.email} : {i.body}</p>
                ))}
              </div>
            </div>
          </div>
        </React.Fragment>
      )
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
  const post = await res.json()

  return {
    props: {
      post,
    },
  }
}
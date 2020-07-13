import Navbar from '../../components/navbar/index'

export default function Post({ post }) {
    return(
        <React.Fragment>
        <Navbar />
        <h1>Post {post.title}</h1>
        <p>{post.body}</p>
        </React.Fragment>
    )
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:3333/posts')
    const posts = await res.json()

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3333/posts/${params.id}`)
    const post = await res.json()

    return {
        props: {
            post,
        },
    }
}
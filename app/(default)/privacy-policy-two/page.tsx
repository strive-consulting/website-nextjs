const getPosts = async (): Promise<any[]> => {
  const data = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await data.json()

  return posts
}

export default async function Privacy() {
  const res = await fetch('https://dummyjson.com/products/1')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  let product = await res.json()

  console.log(product)

  const posts = await getPosts()
  // console.log(posts);

  return (
    <>
      <div>{posts[0].title}</div>
      <div>{product.title}</div>
    </>
  )
}

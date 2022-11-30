// @ts-check

// JSDoc: 주석형태로 함수의 파라미터, 의미, 아웃풋 등을 주석으로 남기는 것
// => 자동으로 TS가 parsing해서 타입정보를 만들어 준다

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

// Refatoring : .json파일의 데이터를 이용하는 걸로 변경
// /** @type {Post[]} */
// const posts = [
//   {
//     id: 'overflowbin',
//     title: 'My first post',
//     content: 'Hello!',
//   },
//   {
//     id: 'bin11788',
//     title: '나의 두번째 포스트',
//     content: 'second Hello!',
//   },
// ]

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 *
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(mathces: string[], body: Object.<string, *> | undefined) => Promise<APIResponse>} callback
 */

// .json 파일로 되어있는 임시 데이터를 가져오기
const fs = require('fs')

const DB_JSON_FILENAME = 'database.json'

/** @returns {Promise<Post[]>} */
async function getPosts() {
  const json = await fs.promises.readFile(DB_JSON_FILENAME, 'utf-8')
  return JSON.parse(json).posts
}

/**
 * @param {Post[]} posts
 */
async function savePosts(posts) {
  const content = {
    posts,
  }

  return fs.promises.writeFile(
    DB_JSON_FILENAME,
    JSON.stringify(content),
    'utf-8'
  )
}

/** @type {Route[]} */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      statusCode: 200,
      body: await getPosts(),
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/,
    method: 'GET',
    callback: async (mathces) => {
      const postId = mathces[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found.',
        }
      }

      const posts = await getPosts()
      const post = posts.find((_post) => _post.id === postId)

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found.',
        }
      }

      return {
        statusCode: 200,
        body: post,
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
      if (!body) {
        return {
          statusCode: 400,
          body: 'Ill-fomrem request',
        }
      }

      /** @type {string} */
      /* eslint-disable-next-line prefer-destructuring */
      const title = body.title
      const newPost = {
        id: title.replace(/\s/g, '_'),
        title,
        content: body.content,
      }

      const posts = await getPosts()
      posts.push(newPost)
      savePosts(posts)

      return {
        statusCode: 200,
        body: newPost,
      }
    },
  },
]

module.exports = {
  routes,
}

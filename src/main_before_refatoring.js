// @ts-check

// 프레임워크 없이 간단한 Node API 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API를 사용한다.
 */

const http = require('http')

// JSDoc: 주석형태로 함수의 파라미터, 의미, 아웃풋 등을 주석으로 남기는 것
// => 자동으로 TS가 parsing해서 타입정보를 만들어 준다

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */

/** @type {Post[]} */
const posts = [
  {
    id: 'overflowbin',
    title: 'My first post',
    content: 'Hello!',
  },
  {
    id: 'bin11788',
    title: '나의 두번째 포스트',
    content: 'second Hello!',
  },
]

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 *
 */
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/
  const postIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined

  // GET total posts
  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      totalCount: posts.length,
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json charset=utf-8')
    // respoonse data의 타입을 정확히 알려주기 위한 세팅
    res.end(JSON.stringify(result))

    // GET some ID posts( /posts/:id )
  } else if (postIdRegexResult && req.method === 'GET') {
    const postId = postIdRegexResult[1]
    const post = posts.find((_post) => _post.id === postId)

    if (post) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post not found.')
    }

    // POST new post (/posts)
    // HTTPie : http POST localhost:4000/posts title="long long long long long foo" content=bar --print=HB
    // --print=(h,b : 응답 header, body  / H,B : 요청 header, body)
  } else if (req.url === '/posts' && req.method === 'POST') {
    req.setEncoding('utf-8')
    req.on('data', (data) => {
      /**
       * @typedef CreatePostBody
       * @property {string} title
       * @property {string} content
       */
      const body = JSON.parse(data)

      posts.push({
        id: body.title.toLowerCase().replace(/\s/g, '_'),
        title: body.title,
        content: body.content,
      })
    })

    res.statusCode = 200
    res.end('Creating post')

    // Error
  } else {
    res.statusCode = 404
    res.end('Not found.')
  }
})

const PORT = 4000

// HTTPie라는 라이브러리를 이용하여 postman처럼 test를 할 수 있다.
server.listen(PORT, () => {
  console.log(`The server is lestening at port : ${PORT}`)
})

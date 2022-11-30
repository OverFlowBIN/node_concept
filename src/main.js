// @ts-check

// 프레임워크 없이 간단한 Node API 만들기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API를 사용한다.
 */

/**
 * Refactoring //
 * - 중복된 로직 줄여주기
 *  - 로직을 묶는다는것은 추상화 해주는것
 *  - 추상화한다는 것은 공통된 패턴을 빼내서 일정한 규격에 맞게 행동하도록 코드를 고치는 것
 * - 미리 어떤 콜로 묶어두거나, type check를 하도록 미리 막아 두면 굳이 runtime에 가지 않아도 미리 테스를 할 수 있다.
 *  - api.js 새로만들기
 */

const http = require('http')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!req.url || !route) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }

    const regexResult = route.url.exec(req.url)

    if (!regexResult) {
      res.statusCode = 404
      res.end('Not found.')
      return
    }

    /** @type {Object.<string, *> | undefined} */
    const reqBody =
      (req.headers['content-type'] === 'application/json' &&
        (await new Promise((resolve, reject) => {
          req.setEncoding('utf-8')
          req.on('data', (data) => {
            try {
              resolve(JSON.parse(data))
            } catch {
              reject(new Error('Ill-formed json'))
            }
          })
        }))) ||
      undefined

    const result = await route.callback(regexResult, reqBody)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body)
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify(result.body))
    }
  }

  main()
})

const PORT = 4000

// HTTPie라는 라이브러리를 이용하여 postman처럼 test를 할 수 있다.
server.listen(PORT, () => {
  console.log(`The server is lestening at port : ${PORT}`)
})

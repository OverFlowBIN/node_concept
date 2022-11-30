//
//
//
// require : module을 가져오는 함수
// module : node의 module system에서는 파일 하나하나가 module이다.

// console.log(require('./animals'))
// console.log(module.require('./animals')) // 동일하다

// const { path, paths, filename } = module

// console.log({
//   path,
//   paths,
//   filename,
// })

// CommonJS: require
// ESCMScript: export, import
// .mjs : ECMAScript 표준 방식을 취함
// ECMASciprt 방식에서는 import, require 둘다 가능 하다.
// => commonJS 방식으로 사용하면 보통 다 가능하다.

// require 여러번 호출
const animalsA = require('./animals')
const animalsB = require('./animals')
const animalsC = require('./animals')

console.log(animalsA, animalsB, animalsC) // 가져온 파일은 1번만 실행된다.
console.log(animalsA === animalsB) // true
console.log(animalsB === animalsC) // true
// 전부다 같은 객체다.
// 하지만 한번만 require한 파일은 한번만 실행된다.
// 이 프로젝트 내의 다른 파일은(모듈) 상대결로로 가져와야 한다.
// 만약 같은 폴더(src)내에 node_module을 만들게 되면 절대결로로도 가능하다.
// console.log(module.paths) 안에 있으면 가능하다. -> 환경변수설정과 같은 개념
// -> 절대경로를 지정하면 module.paths에 있는 경로 중 순서대로 검사하여 해당 모듈이 있으면 가장 첫번째 것을 가져온다.
// 하지만 http같은건(node standard library) 상대경로를 지정하지 않아도 된다.
// -> node standard library에 있는 모듈은 절대경로를 지정해 가져온다
// 결론 : main.js 파일과 동일한 위치의 node_module의 파일을 먼저 탐색한다. => 먼저 탐색된 것을 가져온다.

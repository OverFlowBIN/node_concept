// .mjs : ECMAScript 표준 방식을 취함
// ECMASciprt 방식에서는 import, require 둘다 가능 하다.
// => commonJS 방식으로 사용하면 보통 다 가능하다.

/* eslint-disable import/extensions */
import animals from './animals.mjs'
import birds from './birds.js'
// 확장자만 잘 써주면 import에 문제가 없다.

console.log(animals)
console.log(birds)

// npm

// package.json : 대략적인 모듈의 버전을 나타냄
// package-lock.json : 정확한 모듈의 저번이 적혀 있음. 협업시 필히 공유해야한다.

// npm install --save-dev (= npm install -D) 개발에 필요한 모듈 설치
// npm install --production : package.json에서 devdependency를 제외한 모듈만 설치하는 플래그(--production)

// npm version: "decamelize": "^5.0.0" => version을 표현할때 점 두개를 이용해 숫자를 3칸으로 나누는데
// 이를 Semantic Versioning 이라한다(여러 툴에서 사용된다.) => MAJOR.MINOR.PATCH로 나뉜다. (https://semver.org)

// npm install decamelize@3.0.0 : version down-grade
// npm update decamelize : 제한자를 만족하는 최신버전으로 업데이트 해달라
// => ^3.0.0 update : 3.2.0
// => ~3.0.0 update : 3.0.1

// const decamelize = require('decamelize')

// console.log(decamelize('unicornRainbow'))

//
//
//
// CI
// 예를 들어 ESLint를 가장 잘 활용하는 방법은 CI(continuous integration)에서 돌리는게 가장 최적의 방법
// 협업할때 사람마다 에디터 설정이 다 다르다.
// => 지정된 특수한 머신에서만 정해진 스크립트를 계속 돌리도록 하는 방식
// => 개발 자동화의 기초적인 부분

// npm script를 통해 확인하기
// eslint script 만들기
//  ./node_modules/.bin/eslint src/**/* : src 폴더 안에 있는 모든 파일을 검사하라는 명령어

//
//
//
//
// yarn
// npm install yarn -g 하게되면 설치한 node버전의 bin파일에 yarn이 설치가 된다
// => 설치 위치 확인: which yarn
// install : yarn add [module_name]
// uninstall : yarn remove [module_name]
// install --save-dev : yarn add -D (or --dev)

// yarn과 npm의 차이
// sciprt를 사용할 때 npm은 결로를 다 찾아줘야 하는데  (./node_modules/.bin/eslint src/**/* : src)
// yarn으로 설치된 모듈은 yarn [module_name]만 기입해도 실행가능하다

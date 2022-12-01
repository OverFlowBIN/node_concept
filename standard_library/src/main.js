// @ts-check

// Standard Library

const os = require('os')

console.log(
  ['arch', os.arch()],
  ['platform', os.platform()],
  ['cpus', os.cpus()]
)

// path & fs
const path = require('path')
const fs = require('fs')

const filePath = path.resolve(__dirname, './test.txt')
// 원하는 파일의 위치를 현재 파일의 위치(__dirname)를 기준으로 결로를 확인한다
// filePath를 절대 경로로 사용할 수 있다.
console.log('filePath', filePath)
const fileContent = fs.readFileSync(filePath, 'utf-8')
console.log(fileContent)
// node를 터미널에서 실행한 위치의 상대경로를 fs.readFileSync에 넣어 줘야한다.
// 이럴때 path를 사용할 수 있다.

// buffer가 나올경우 encoding을 설정해줘야 한다 => utf-8

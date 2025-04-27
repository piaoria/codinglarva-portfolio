# JavaScript 변수 선언

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [선언 키워드](#선언-키워드)
- [스코프](#스코프)
- [호이스팅](#호이스팅)
- [사용 권장](#사용-권장)
- [정리](#정리)

## 개요

JavaScript의 변수 선언은 데이터 저장과 관리를 위한 기본적인 메커니즘입니다. 적절한 선언 방식 선택이 코드의 안정성과 가독성에 영향을 미칩니다.

## 시간 복잡도

| 메서드                    | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                       |
| ------------------------- | ---------------- | ---------------- | -------------------------- |
| var                       | O(1)             | O(1)             | 변수 선언은 상수 시간      |
| let                       | O(1)             | O(1)             | 변수 선언은 상수 시간      |
| const                     | O(1)             | O(1)             | 변수 선언은 상수 시간      |
| Object.freeze()           | O(n)             | O(n)             | 객체 속성 수에 비례        |
| Object.seal()             | O(n)             | O(n)             | 객체 속성 수에 비례        |
| Object.defineProperty()   | O(1)             | O(1)             | 단일 속성 정의는 상수 시간 |
| Object.defineProperties() | O(n)             | O(n)             | 속성 수에 비례             |

## 선언 키워드

### var

```javascript
// var 선언
var x = 10;
var y = "hello";
```

- 함수 스코프
- 재선언 가능
- 호이스팅 발생

### let

```javascript
// let 선언
let x = 10;
let y = "hello";
```

- 블록 스코프
- 재선언 불가
- 재할당 가능

### const

```javascript
// const 선언
const x = 10;
const y = "hello";
```

- 블록 스코프
- 재선언 불가
- 재할당 불가

## 스코프

### 함수 스코프

```javascript
function example() {
  var x = 10;
  console.log(x); // 10
}
console.log(x); // ReferenceError
```

### 블록 스코프

```javascript
{
  let x = 10;
  const y = 20;
  console.log(x, y); // 10 20
}
console.log(x, y); // ReferenceError
```

## 호이스팅

```javascript
// 호이스팅 예시
console.log(x); // undefined
var x = 10;

console.log(y); // ReferenceError
let y = 20;
```

## 사용 권장

### 일반적인 경우

```javascript
// 기본 변수
let count = 0;
let name = "John";

// 상수
const PI = 3.14;
const MAX_SIZE = 100;
```

### 특수한 경우

```javascript
// 전역 변수
var globalVar = "global";

// 즉시 실행 함수
(function () {
  var privateVar = "private";
})();
```

## 정리

- var: 함수 스코프, 호이스팅
- let: 블록 스코프, 재할당 가능
- const: 블록 스코프, 불변 값
- 스코프: 변수 접근 범위 결정
- 호이스팅: 선언의 상단 이동
- 코딩테스트: let과 const 주로 사용

# JavaScript 콘솔 로그

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [기본 로깅 메서드](#기본-로깅-메서드)
- [고급 로깅 메서드](#고급-로깅-메서드)
- [디버깅 팁](#디버깅-팁)
- [정리](#정리)

## 개요

JavaScript의 콘솔 로그는 디버깅과 코드 검증에 필수적인 도구입니다. 다양한 로깅 메서드를 상황에 맞게 활용하면 효율적인 디버깅이 가능합니다.

## 시간 복잡도

| 메서드          | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                                                     |
| --------------- | ---------------- | ---------------- | -------------------------------------------------------- |
| console.log()   | O(1)             | O(n)             | 단일 값 출력은 상수 시간, 객체나 배열 출력은 크기에 비례 |
| console.error() | O(1)             | O(n)             | log()와 동일한 복잡도                                    |
| console.warn()  | O(1)             | O(n)             | log()와 동일한 복잡도                                    |
| console.info()  | O(1)             | O(n)             | log()와 동일한 복잡도                                    |
| console.table() | O(n)             | O(n²)            | 데이터 크기에 비례, 중첩된 객체는 제곱으로 증가          |
| console.group() | O(1)             | O(1)             | 상수 시간                                                |
| console.time()  | O(1)             | O(1)             | 상수 시간                                                |
| console.trace() | O(n)             | O(n)             | 스택 트레이스 깊이에 비례                                |

## 기본 로깅 메서드

```javascript
// 기본 출력
console.log("Hello, World!");

// 변수 출력
const name = "John";
console.log(name);

// 여러 값 출력
console.log("Name:", name, "Age:", 30);
```

## 고급 로깅 메서드

### console.table()

```javascript
// 테이블 형식 출력
const data = [
  { name: "John", age: 30 },
  { name: "Jane", age: 25 },
];
console.table(data);
```

### console.group()

```javascript
// 그룹 출력
console.group("사용자 정보");
console.log("이름: John");
console.log("나이: 30");
console.groupEnd();
```

### console.time()

```javascript
// 실행 시간 측정
console.time("작업");
// 작업 수행
console.timeEnd("작업");
```

## 디버깅 팁

### 변수 추적

```javascript
// 변수 값 추적
let counter = 0;
console.log("Counter:", counter);
counter++;
console.log("Counter:", counter);
```

### 조건부 로깅

```javascript
// 조건부 출력
const DEBUG = true;
DEBUG && console.log("디버그 정보");
```

### 성능 측정

```javascript
// 실행 시간 측정
console.time("작업");
// 작업 수행
console.timeEnd("작업");
```

## 정리

- 콘솔 로그: 디버깅과 정보 출력의 기본 도구
- 다양한 메서드: 상황에 맞는 출력 방식 선택
- 디버깅: 변수 추적, 조건부 로깅, 성능 측정 등 활용
- 코딩테스트: 문제 해결 과정의 검증에 유용

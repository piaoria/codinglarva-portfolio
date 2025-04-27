# JavaScript 1차원 배열 입문

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [배열 생성](#배열-생성)
- [배열 접근](#배열-접근)
- [배열 메서드](#배열-메서드)
- [실용 예제](#실용-예제)
- [정리](#정리)

## 개요

JavaScript의 1차원 배열은 동일한 타입의 데이터를 순차적으로 저장하는 자료구조입니다. 다양한 메서드를 통해 효율적인 데이터 처리가 가능합니다.

## 시간 복잡도

| 메서드                    | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                                              |
| ------------------------- | ---------------- | ---------------- | ------------------------------------------------- |
| Array.prototype.push()    | O(1)             | O(n)             | 일반적으로 상수 시간, 배열 크기 조정 시 선형 시간 |
| Array.prototype.pop()     | O(1)             | O(1)             | 마지막 요소 제거는 항상 상수 시간                 |
| Array.prototype.shift()   | O(n)             | O(n)             | 첫 번째 요소 제거는 항상 선형 시간                |
| Array.prototype.unshift() | O(n)             | O(n)             | 첫 번째에 요소 추가는 항상 선형 시간              |
| Array.prototype.length    | O(1)             | O(1)             | 길이 접근은 항상 상수 시간                        |
| Array.prototype[].length  | O(1)             | O(1)             | 길이 접근은 항상 상수 시간                        |
| Array.prototype.at()      | O(1)             | O(1)             | 인덱스 접근은 항상 상수 시간                      |
| Array.prototype.entries() | O(1)             | O(1)             | 이터레이터 생성은 상수 시간                       |
| Array.prototype.keys()    | O(1)             | O(1)             | 이터레이터 생성은 상수 시간                       |
| Array.prototype.values()  | O(1)             | O(1)             | 이터레이터 생성은 상수 시간                       |

## 배열 생성

### 리터럴 방식

```javascript
// 기본 배열
const numbers = [1, 2, 3, 4, 5];
const fruits = ["apple", "banana", "cherry"];

// 빈 배열
const empty = [];
```

### 생성자 방식

```javascript
// Array 생성자
const arr1 = new Array(5); // 길이 5의 빈 배열
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
```

## 배열 접근

### 인덱싱

```javascript
// 요소 접근
const arr = [10, 20, 30];
console.log(arr[0]); // 10
console.log(arr[1]); // 20
console.log(arr[2]); // 30
```

### 길이 확인

```javascript
// 배열 길이
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

## 배열 메서드

### 요소 추가/제거

```javascript
// push/pop
const arr = [1, 2];
arr.push(3); // [1, 2, 3]
arr.pop(); // [1, 2]

// unshift/shift
arr.unshift(0); // [0, 1, 2]
arr.shift(); // [1, 2]
```

### 배열 변환

```javascript
// map
const doubled = [1, 2, 3].map((x) => x * 2); // [2, 4, 6]

// filter
const evens = [1, 2, 3, 4].filter((x) => x % 2 === 0); // [2, 4]

// reduce
const sum = [1, 2, 3].reduce((a, b) => a + b, 0); // 6
```

## 실용 예제

### 데이터 처리

```javascript
// 데이터 필터링
const scores = [85, 92, 78, 90];
const passing = scores.filter((score) => score >= 80);

// 데이터 변환
const names = ["john", "jane"];
const capitalized = names.map(
  (name) => name.charAt(0).toUpperCase() + name.slice(1)
);
```

### 알고리즘 문제

```javascript
// 최대값 찾기
function findMax(arr) {
  return Math.max(...arr);
}

// 중복 제거
function removeDuplicates(arr) {
  return [...new Set(arr)];
}
```

## 정리

- 배열 생성: 리터럴 또는 생성자 사용
- 요소 접근: 인덱스 기반
- 기본 메서드: push, pop, shift, unshift
- 변환 메서드: map, filter, reduce
- 코딩테스트: 데이터 처리와 알고리즘 구현에 필수

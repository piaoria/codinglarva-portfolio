# JavaScript 1차원 배열 활용

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [배열 조작](#배열-조작)
- [데이터 처리](#데이터-처리)
- [알고리즘 구현](#알고리즘-구현)
- [정리](#정리)

## 개요

JavaScript의 1차원 배열은 다양한 데이터 처리와 알고리즘 구현에 활용됩니다. 효율적인 배열 조작은 코딩테스트의 핵심입니다.

## 시간 복잡도

| 메서드                        | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                                                    |
| ----------------------------- | ---------------- | ---------------- | ------------------------------------------------------- |
| Array.prototype.sort()        | O(n log n)       | O(n²)            | 일반적으로 퀵소트, 최악의 경우 삽입정렬                 |
| Array.prototype.reverse()     | O(n)             | O(n)             | 배열 길이의 절반에 비례                                 |
| Array.prototype.join()        | O(n)             | O(n)             | 배열 요소 수에 비례                                     |
| Array.prototype.toString()    | O(n)             | O(n)             | 배열 요소 수에 비례                                     |
| Array.prototype.indexOf()     | O(1)             | O(n)             | 일반적으로 빠르게 찾을 수 있으나, 최악의 경우 전체 탐색 |
| Array.prototype.lastIndexOf() | O(1)             | O(n)             | indexOf()와 동일한 복잡도                               |
| Array.prototype.includes()    | O(1)             | O(n)             | 일반적으로 빠르게 찾을 수 있으나, 최악의 경우 전체 탐색 |
| Array.prototype.flat()        | O(n)             | O(n)             | 평탄화할 요소 수에 비례                                 |
| Array.prototype.flatMap()     | O(n)             | O(n)             | 매핑할 요소 수에 비례                                   |

## 배열 조작

### 요소 추가/제거

```javascript
// 배열 조작
const arr = [1, 2, 3];

// 요소 추가
arr.push(4); // [1, 2, 3, 4]
arr.unshift(0); // [0, 1, 2, 3, 4]

// 요소 제거
arr.pop(); // [0, 1, 2, 3]
arr.shift(); // [1, 2, 3]
```

### 배열 변환

```javascript
// 배열 변환
const numbers = [1, 2, 3, 4];

// map: 요소 변환
const doubled = numbers.map((x) => x * 2); // [2, 4, 6, 8]

// filter: 조건 필터링
const evens = numbers.filter((x) => x % 2 === 0); // [2, 4]

// reduce: 누적 계산
const sum = numbers.reduce((a, b) => a + b, 0); // 10
```

## 데이터 처리

### 정렬

```javascript
// 배열 정렬
const numbers = [3, 1, 4, 1, 5, 9];

// 오름차순
numbers.sort((a, b) => a - b); // [1, 1, 3, 4, 5, 9]

// 내림차순
numbers.sort((a, b) => b - a); // [9, 5, 4, 3, 1, 1]
```

### 검색

```javascript
// 배열 검색
const fruits = ["apple", "banana", "cherry"];

// 요소 존재 확인
console.log(fruits.includes("banana")); // true

// 인덱스 찾기
console.log(fruits.indexOf("cherry")); // 2
```

## 알고리즘 구현

### 최대/최소값

```javascript
// 최대/최소값
const numbers = [1, 5, 2, 8, 3];

// 최대값
const max = Math.max(...numbers); // 8

// 최소값
const min = Math.min(...numbers); // 1
```

### 중복 제거

```javascript
// 중복 제거
const numbers = [1, 2, 2, 3, 3, 3];

// Set 사용
const unique = [...new Set(numbers)]; // [1, 2, 3]

// filter 사용
const unique2 = numbers.filter((x, i) => numbers.indexOf(x) === i); // [1, 2, 3]
```

## 정리

- 배열 조작: push, pop, shift, unshift
- 데이터 변환: map, filter, reduce
- 정렬/검색: sort, includes, indexOf
- 알고리즘: 최대/최소값, 중복 제거 등
- 코딩테스트: 효율적인 배열 처리가 핵심

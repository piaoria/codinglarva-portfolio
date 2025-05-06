# JavaScript 코딩테스트 자주 쓰는 min, max, sort 함수 형태

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [최솟값/최댓값 구하기](#최솟값최댓값-구하기)
- [정렬하기](#정렬하기)
- [파이썬과의 비교](#파이썬과의-비교)
- [정리](#정리)

## 개요

JavaScript는 Python처럼 min, max, sort가 내장 함수로 바로 동작하지 않으므로, 배열 처리 시 함수 형태를 잘 익혀두는 것이 중요합니다. 코딩테스트에서 자주 쓰는 패턴을 효율적으로 정리합니다.

## 시간 복잡도

| 메서드                  | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                           |
| ----------------------- | ---------------- | ---------------- | ------------------------------ |
| Math.min(...arr)        | O(n)             | O(n)             | 배열 전체 순회                 |
| Math.max(...arr)        | O(n)             | O(n)             | 배열 전체 순회                 |
| arr.sort((a, b) => ...) | O(n log n)       | O(n log n)       | TimSort(브라우저 엔진 기준)    |
| arr.flat()              | O(n)             | O(n)             | 1단계 평탄화, n은 전체 원소 수 |

- n: 배열의 길이
- sort는 대부분의 JS 엔진에서 TimSort(최악 O(n log n)) 또는 QuickSort(최악 O(n^2), 평균 O(n log n)) 사용

## 최솟값/최댓값 구하기

### 배열에서 최솟값

```javascript
const arr = [5, 2, 9, 1];
const minValue = Math.min(...arr); // 1
```

- Math.min은 여러 인자를 받으므로, 배열은 전개 연산자(...)로 펼쳐서 전달해야 함

### 배열에서 최댓값

```javascript
const arr = [5, 2, 9, 1];
const maxValue = Math.max(...arr); // 9
```

- Math.max도 동일하게 사용

### 2차원 배열(행렬)에서 전체 최솟값/최댓값

```javascript
const matrix = [
  [3, 7],
  [1, 9],
  [4, 2],
];
const minValue = Math.min(...matrix.flat()); // 1
const maxValue = Math.max(...matrix.flat()); // 9
```

- flat()으로 1차원 배열로 만든 뒤 사용

## 정렬하기

### 오름차순 정렬

```javascript
const arr = [5, 2, 9, 1];
arr.sort((a, b) => a - b); // [1, 2, 5, 9]
```

- sort()는 기본적으로 문자열 기준 정렬이므로, 숫자 정렬 시 비교 함수를 반드시 명시

### 내림차순 정렬

```javascript
const arr = [5, 2, 9, 1];
arr.sort((a, b) => b - a); // [9, 5, 2, 1]
```

### 객체 배열 정렬 (예: 점수 기준 내림차순)

```javascript
const users = [
  { name: "A", score: 80 },
  { name: "B", score: 95 },
  { name: "C", score: 70 },
];
users.sort((a, b) => b.score - a.score);
// [{name: 'B', score: 95}, ...]
```

## 파이썬과의 비교

| 기능          | Python 예시               | JavaScript 예시           |
| ------------- | ------------------------- | ------------------------- |
| 최솟값        | min(arr)                  | Math.min(...arr)          |
| 최댓값        | max(arr)                  | Math.max(...arr)          |
| 오름차순 정렬 | sorted(arr)               | arr.sort((a, b) => a - b) |
| 내림차순 정렬 | sorted(arr, reverse=True) | arr.sort((a, b) => b - a) |

- Python은 내장 함수로 바로 동작하지만, JavaScript는 전개 연산자와 비교 함수가 필수

## 정리

- Math.min(...arr), Math.max(...arr) 형태를 암기
- sort((a, b) => a - b)로 숫자 오름차순, (b - a)로 내림차순
- 2차원 배열은 flat() 후 처리
- Python과 달리 내장 min/max/sort 함수가 없으니, 위 형태를 반드시 숙지
- 코딩테스트에서 빠르고 안전하게 사용하려면 위 패턴을 그대로 활용

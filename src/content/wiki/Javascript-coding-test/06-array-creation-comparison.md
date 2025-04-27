# JavaScript 배열 생성 방법 비교

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [생성 방법](#생성-방법)
- [성능 비교](#성능-비교)
- [사용 권장](#사용-권장)
- [정리](#정리)

## 개요

JavaScript에서 배열을 생성하는 방법은 여러 가지가 있으며, 각 방법은 특정 상황에 최적화되어 있습니다. 적절한 방법 선택이 성능과 가독성에 영향을 미칩니다.

## 시간 복잡도

| 메서드                   | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                         |
| ------------------------ | ---------------- | ---------------- | ---------------------------- |
| []                       | O(1)             | O(1)             | 리터럴 방식은 상수 시간      |
| Array()                  | O(1)             | O(1)             | 생성자 방식은 상수 시간      |
| Array.from()             | O(n)             | O(n)             | 변환할 요소 수에 비례        |
| Array.of()               | O(n)             | O(n)             | 요소 수에 비례               |
| Array.prototype.concat() | O(n)             | O(n)             | 연결할 배열의 총 길이에 비례 |
| Array.prototype.slice()  | O(n)             | O(n)             | 복사할 요소 수에 비례        |
| Array.prototype.splice() | O(n)             | O(n)             | 삽입/삭제할 요소 수에 비례   |
| Array.prototype.fill()   | O(n)             | O(n)             | 채울 요소 수에 비례          |

## 생성 방법

### 리터럴 방식

```javascript
// 기본 배열
const arr1 = [1, 2, 3];

// 빈 배열
const arr2 = [];

// 초기화된 배열
const arr3 = new Array(3).fill(0); // [0, 0, 0]
```

### 생성자 방식

```javascript
// 길이 지정
const arr1 = new Array(5); // [empty × 5]

// 요소 지정
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
```

### Array.from()

```javascript
// 유사 배열 변환
const arr1 = Array.from("hello"); // ["h", "e", "l", "l", "o"]

// 매핑 함수 사용
const arr2 = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

## 성능 비교

### 생성 속도

1. 리터럴 방식: 가장 빠름
2. Array.from(): 중간
3. 생성자 방식: 가장 느림

### 메모리 사용

1. 리터럴 방식: 최적화됨
2. Array.from(): 상황에 따라 다름
3. 생성자 방식: 추가 오버헤드

## 사용 권장

### 일반적인 경우

```javascript
// 기본 배열
const numbers = [1, 2, 3];

// 빈 배열
const empty = [];
```

### 특수한 경우

```javascript
// 고정 길이 배열
const fixed = new Array(5).fill(0);

// 유사 배열 변환
const chars = Array.from("hello");
```

## 정리

- 리터럴 방식: 일반적인 배열 생성에 권장
- 생성자 방식: 고정 길이 배열에 사용
- Array.from(): 유사 배열 변환에 적합
- 성능: 리터럴 방식이 가장 효율적
- 가독성: 상황에 맞는 방법 선택 필요

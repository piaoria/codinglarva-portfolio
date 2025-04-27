# JavaScript 반복 메서드

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [기본 반복 메서드](#기본-반복-메서드)
- [배열 반복 메서드](#배열-반복-메서드)
- [성능 비교](#성능-비교)
- [코딩 테스트 활용](#코딩-테스트-활용)
- [정리](#정리)

## 개요

JavaScript의 반복문과 배열 메서드는 데이터 처리의 핵심 도구입니다. 각 방법은 특정 상황에 최적화되어 있으며, 코딩테스트에서는 이를 적절히 선택해야 합니다.

## 시간 복잡도

| 메서드      | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                                                            |
| ----------- | ---------------- | ---------------- | --------------------------------------------------------------- |
| for         | O(n)             | O(n)             | 반복 횟수에 비례                                                |
| while       | O(n)             | O(n)             | 반복 횟수에 비례                                                |
| do...while  | O(n)             | O(n)             | 반복 횟수에 비례                                                |
| for...in    | O(n)             | O(n²)            | 객체 속성 수에 비례, 프로토타입 체인 탐색 시 제곱으로 증가      |
| for...of    | O(n)             | O(n)             | 반복 가능 객체의 요소 수에 비례                                 |
| forEach()   | O(n)             | O(n)             | 배열 길이에 비례                                                |
| map()       | O(n)             | O(n)             | 배열 길이에 비례                                                |
| filter()    | O(n)             | O(n)             | 배열 길이에 비례                                                |
| reduce()    | O(n)             | O(n)             | 배열 길이에 비례                                                |
| find()      | O(1)             | O(n)             | 일반적으로 빠르게 찾을 수 있으나, 최악의 경우 전체 탐색         |
| findIndex() | O(1)             | O(n)             | find()와 동일한 복잡도                                          |
| some()      | O(1)             | O(n)             | 조건 만족 요소를 빠르게 찾을 수 있으나, 최악의 경우 전체 탐색   |
| every()     | O(1)             | O(n)             | 조건 불만족 요소를 빠르게 찾을 수 있으나, 최악의 경우 전체 탐색 |

## 기본 반복 메서드

### for

```javascript
// 기본 for 문
for (let i = 0; i < n; i++) {
  // 반복 실행
}
```

- 인덱스 기반 접근
- 명시적 반복 횟수 제어
- 배열 순회에 적합

### while

```javascript
// while 문
while (condition) {
  // 반복 실행
}
```

- 조건 기반 반복
- 반복 횟수 불명확 시 사용
- 조건 false까지 반복

### do...while

```javascript
// do...while 문
do {
  // 반복 실행
} while (condition);
```

- 최소 1회 실행
- 조건 검사는 실행 후
- while과 실행 순서 상이

### for...in

```javascript
// for...in 문
for (const key in object) {
  // 객체 속성 순회
}
```

- 객체 속성 열거
- 배열보다 객체에 적합
- 순서 보장 없음

### for...of

```javascript
// for...of 문
for (const element of array) {
  // 요소 직접 접근
}
```

- 반복 가능 객체 순회
- 요소 직접 접근
- 순서 보장

## 배열 반복 메서드

### forEach

```javascript
// forEach
array.forEach((element, index) => {
  // 요소 처리
});
```

- 각 요소에 콜백 실행
- 반환값 없음
- 중단 불가

### map

```javascript
// map
const newArray = array.map((element) => element * 2);
```

- 요소 변환
- 새 배열 생성
- 원본 불변

### filter

```javascript
// filter
const filtered = array.filter((element) => element > 0);
```

- 조건 필터링
- 새 배열 생성
- 원본 불변

### reduce

```javascript
// reduce
const sum = array.reduce((acc, curr) => acc + curr, 0);
```

- 배열 축소
- 누적값 처리
- 복잡 연산 가능

### find

```javascript
// find
const found = array.find((element) => element > 0);
```

- 조건 만족 요소 찾기
- 첫 번째 요소 반환
- 원본 불변

### findIndex

```javascript
// findIndex
const index = array.findIndex((element) => element > 0);
```

- 조건 만족 요소 인덱스 찾기
- 첫 번째 인덱스 반환
- 원본 불변

### some

```javascript
// some
const hasPositive = array.some((element) => element > 0);
```

- 조건 만족 요소 존재 여부 확인
- 불리언 반환
- 원본 불변

### every

```javascript
// every
const allPositive = array.every((element) => element > 0);
```

- 모든 요소가 조건 만족 여부 확인
- 불리언 반환
- 원본 불변

## 성능 비교

### 반복문 성능

1. for 문: 최고
2. while/do...while: for와 유사
3. for...of: for보다 약간 느림
4. for...in: 최저

### 배열 메서드 성능

1. forEach: 기본
2. map: 약간 느림 (새 배열 생성)
3. filter: 조건 검사로 인해 느림
4. reduce: 연산 복잡도에 따라 변동

## 코딩 테스트 활용

### 권장 사용법

1. 단순 반복

   ```javascript
   // 인덱스 필요
   for (let i = 0; i < array.length; i++) {
     // 처리
   }

   // 인덱스 불필요
   for (const element of array) {
     // 처리
   }
   ```

2. 데이터 변환

   ```javascript
   // 새 배열 필요
   const transformed = array.map((x) => x * 2);

   // 단순 순회
   array.forEach((x) => console.log(x));
   ```

3. 데이터 필터링
   ```javascript
   // 조건 필터링
   const filtered = array.filter((x) => x > 0);
   ```

## 정리

- 반복문: 상황에 맞는 선택 필요
- 배열 메서드: 목적에 맞는 선택 필요
- 성능: 작업 특성에 따라 달라짐
- 코딩테스트: 문제 요구사항에 맞춰 선택

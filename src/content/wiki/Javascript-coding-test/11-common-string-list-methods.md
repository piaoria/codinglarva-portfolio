# JavaScript 문자열과 배열에서 공통으로 쓰는 주요 메서드 정리

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [공통 메서드 비교 표](#공통-메서드-비교-표)
- [주요 메서드 설명 및 예시](#주요-메서드-설명-및-예시)
- [정리](#정리)

## 개요

JavaScript에서는 문자열(String)과 배열(Array) 모두에서 사용할 수 있는 메서드가 있습니다. 코딩테스트에서 자주 쓰이는 includes, indexOf 등은 자료형에 상관없이 활용도가 높으니 반드시 숙지해야 합니다.

## 시간 복잡도

| 메서드      | 시간 복잡도(문자열) | 시간 복잡도(배열) | 설명                |
| ----------- | ------------------- | ----------------- | ------------------- |
| includes    | O(n)                | O(n)              | 전체 탐색           |
| indexOf     | O(n)                | O(n)              | 앞에서부터 탐색     |
| lastIndexOf | O(n)                | O(n)              | 뒤에서부터 탐색     |
| slice       | O(k)                | O(k)              | k: 추출 길이        |
| concat      | O(n+m)              | O(n+m)            | 두 길이 합만큼 복사 |
| length      | O(1)                | O(1)              | 프로퍼티 접근       |

- n: 원본 길이, m: 추가 길이

## 공통 메서드 비교 표

| 메서드      | 문자열(String) 예시      | 배열(Array) 예시       | 반환값       | 설명                        |
| ----------- | ------------------------ | ---------------------- | ------------ | --------------------------- |
| includes    | 'abc'.includes('b')      | [1,2,3].includes(2)    | boolean      | 포함 여부                   |
| indexOf     | 'abc'.indexOf('b')       | [1,2,3].indexOf(2)     | number       | 첫 등장 위치, 없으면 -1     |
| lastIndexOf | 'ababa'.lastIndexOf('a') | [1,2,1].lastIndexOf(1) | number       | 마지막 등장 위치, 없으면 -1 |
| slice       | 'abcdef'.slice(1,4)      | [1,2,3,4,5].slice(1,4) | string/array | 부분 추출                   |
| concat      | 'ab'.concat('cd')        | [1,2].concat([3,4])    | string/array | 이어붙이기                  |
| toString    | (N/A)                    | [1,2,3].toString()     | string       | 배열을 문자열로 변환        |
| length      | 'abc'.length             | [1,2,3].length         | number       | 길이(프로퍼티)              |

- 일부 메서드는 동작 방식이 자료형에 따라 다를 수 있음

## 주요 메서드 설명 및 예시

### includes

```javascript
"hello".includes("e"); // true
[1, 2, 3].includes(2); // true
```

- 포함 여부를 boolean으로 반환

### indexOf

```javascript
"hello".indexOf("l"); // 2
[1, 2, 3].indexOf(2); // 1
```

- 첫 등장 위치(없으면 -1)

### lastIndexOf

```javascript
"banana".lastIndexOf("a"); // 5
[1, 2, 1].lastIndexOf(1); // 2
```

- 마지막 등장 위치(없으면 -1)

### slice

```javascript
"abcdef".slice(1, 4); // 'bcd'
[1, 2, 3, 4, 5].slice(1, 4); // [2, 3, 4]
```

- 부분 추출(원본 불변)

### concat

```javascript
"ab".concat("cd"); // 'abcd'
[1, 2].concat([3, 4]); // [1, 2, 3, 4]
```

- 이어붙이기(원본 불변)

### length

```javascript
"hello".length; // 5
[1, 2, 3].length; // 3
```

- 길이(프로퍼티)

## 정리

- includes, indexOf, lastIndexOf, slice, concat 등은 문자열과 배열 모두에서 사용 가능
- 시간복잡도는 대부분 O(n)이나, length는 O(1)
- 코딩테스트에서 문자열/배열 자료형 구분 없이 활용할 수 있어 매우 유용

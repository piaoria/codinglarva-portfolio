# JavaScript 문자열 메서드

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [문자열 생성 메서드](#문자열-생성-메서드)
- [문자열 접근 메서드](#문자열-접근-메서드)
- [문자열 변환 메서드](#문자열-변환-메서드)
- [문자열 검색 메서드](#문자열-검색-메서드)
- [문자열 분할 메서드](#문자열-분할-메서드)
- [정리](#정리)

## 개요

JavaScript의 문자열은 텍스트 데이터를 처리하기 위한 기본 자료형입니다. 다양한 메서드를 통해 효율적인 문자열 처리가 가능합니다.

## 시간 복잡도

| 메서드        | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                                                 |
| ------------- | ---------------- | ---------------- | ---------------------------------------------------- |
| String()      | O(1)             | O(1)             | 문자열 생성은 상수 시간                              |
| charAt()      | O(1)             | O(1)             | 인덱스 접근은 상수 시간                              |
| charCodeAt()  | O(1)             | O(1)             | 인덱스 접근은 상수 시간                              |
| length        | O(1)             | O(1)             | 길이 접근은 상수 시간                                |
| toUpperCase() | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| toLowerCase() | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| trim()        | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| trimStart()   | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| trimEnd()     | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| includes()    | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| indexOf()     | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| lastIndexOf() | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| startsWith()  | O(1)             | O(n)             | 일반적으로 상수 시간, 최악의 경우 문자열 길이에 비례 |
| endsWith()    | O(1)             | O(n)             | 일반적으로 상수 시간, 최악의 경우 문자열 길이에 비례 |
| split()       | O(n)             | O(n)             | 문자열 길이에 비례                                   |
| substring()   | O(n)             | O(n)             | 부분 문자열 길이에 비례                              |
| slice()       | O(n)             | O(n)             | 부분 문자열 길이에 비례                              |
| substr()      | O(n)             | O(n)             | 부분 문자열 길이에 비례                              |

## 문자열 생성 메서드

```javascript
// 리터럴 방식
const str1 = "Hello";
const str2 = "World";
const str3 = `Template`;

// 생성자 방식
const str4 = String(123); // "123"
```

## 문자열 접근 메서드

```javascript
// 인덱싱
const str = "Hello";
console.log(str[0]); // "H"
console.log(str.charAt(1)); // "e"

// 길이
console.log(str.length); // 5
```

## 문자열 변환 메서드

```javascript
// 대소문자
const str = "Hello";
console.log(str.toUpperCase()); // "HELLO"
console.log(str.toLowerCase()); // "hello"

// 공백 제거
const str2 = "  Hello  ";
console.log(str2.trim()); // "Hello"
```

## 문자열 검색 메서드

```javascript
// 포함 여부
const str = "Hello World";
console.log(str.includes("World")); // true

// 위치 찾기
console.log(str.indexOf("o")); // 4
console.log(str.lastIndexOf("o")); // 7
```

## 문자열 분할 메서드

```javascript
// 분할
const str = "Hello World";
console.log(str.split(" ")); // ["Hello", "World"]
```

## 정리

JavaScript의 문자열 메서드를 통해 다양한 문자열 처리가 가능합니다. 각 메서드의 시간 복잡도를 이해하고 적절한 메서드를 선택하여 효율적인 코드를 작성할 수 있습니다.

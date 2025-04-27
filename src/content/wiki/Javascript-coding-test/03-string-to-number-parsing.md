# JavaScript 문자열을 숫자로 파싱하는 방법

## 목차

- [개요](#개요)
- [시간 복잡도](#시간-복잡도)
- [변환 메서드](#변환-메서드)
- [주의사항](#주의사항)
- [실용 예제](#실용-예제)
- [정리](#정리)

## 개요

JavaScript에서 문자열을 숫자로 변환하는 것은 데이터 처리의 기본 작업입니다. 여러 메서드를 통해 안전하고 효율적인 변환이 가능합니다.

## 시간 복잡도

| 메서드              | 일반 시간 복잡도 | 최악 시간 복잡도 | 설명                         |
| ------------------- | ---------------- | ---------------- | ---------------------------- |
| Number()            | O(n)             | O(n)             | 문자열 길이에 비례           |
| parseInt()          | O(n)             | O(n)             | 문자열 길이에 비례           |
| parseFloat()        | O(n)             | O(n)             | 문자열 길이에 비례           |
| + 연산자            | O(n)             | O(n)             | 문자열 길이에 비례           |
| Number.parseInt()   | O(n)             | O(n)             | parseInt()와 동일한 복잡도   |
| Number.parseFloat() | O(n)             | O(n)             | parseFloat()와 동일한 복잡도 |
| Number.isNaN()      | O(1)             | O(1)             | 단일 값 검사는 상수 시간     |
| Number.isFinite()   | O(1)             | O(1)             | 단일 값 검사는 상수 시간     |
| Number.isInteger()  | O(1)             | O(1)             | 단일 값 검사는 상수 시간     |

## 변환 메서드

### Number()

```javascript
// 기본 변환
const num1 = Number("123"); // 123
const num2 = Number("12.34"); // 12.34
const num3 = Number("123abc"); // NaN
```

### parseInt()

```javascript
// 정수 변환
const int1 = parseInt("123"); // 123
const int2 = parseInt("12.34"); // 12
const int3 = parseInt("123abc"); // 123
```

### parseFloat()

```javascript
// 실수 변환
const float1 = parseFloat("12.34"); // 12.34
const float2 = parseFloat("12.34.56"); // 12.34
const float3 = parseFloat("12.34abc"); // 12.34
```

### 단항 연산자 (+)

```javascript
// 단항 연산자
const num1 = +"123"; // 123
const num2 = +"12.34"; // 12.34
const num3 = +"123abc"; // NaN
```

## 주의사항

### NaN 처리

```javascript
// NaN 체크
const num = Number("abc");
if (isNaN(num)) {
  console.log("유효하지 않은 숫자");
}
```

### 진수 변환

```javascript
// 진수 변환
const binary = parseInt("1010", 2); // 10
const hex = parseInt("FF", 16); // 255
```

## 실용 예제

### 사용자 입력 처리

```javascript
// 입력값 검증
function validateNumber(input) {
  const num = Number(input);
  return !isNaN(num) ? num : null;
}
```

### 데이터 정제

```javascript
// 데이터 정제
const data = ["123", "45.67", "abc"];
const numbers = data.map(Number).filter((n) => !isNaN(n));
```

## 정리

- Number(): 일반적인 숫자 변환
- parseInt(): 정수 변환, 진수 지정 가능
- parseFloat(): 실수 변환
- 단항 연산자: 간단한 변환
- NaN 체크: 유효성 검증 필수
- 코딩테스트: 입력값 처리에 자주 사용

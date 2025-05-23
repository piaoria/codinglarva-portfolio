# JavaScript 정수 부분 추출 방법 비교

## 목차

- [개요](#개요)
- [비교 표](#비교-표)
- [주요 방법 설명](#주요-방법-설명)
- [비교 예시](#비교-예시)
- [상황별 추천](#상황별-추천)
- [아주 큰 수(BigInt) 처리](#아주-큰-수bigint-처리)
- [정리](#정리)

## 개요

JavaScript에서 소수점 이하를 버리고 정수 부분만 추출하는 방법은 여러 가지가 있습니다. 각 방법은 동작 방식, 가독성, 성능, 부호 처리 등에서 차이가 있으므로 상황에 맞는 선택이 중요합니다.

## 비교 표

| 방법                | 예시                  | 설명                             | 추천도      |
| ------------------- | --------------------- | -------------------------------- | ----------- | ------------------------ | ----------- |
| parseInt(...)       | parseInt(12.8) → 12   | 문자열처럼 처리, 숫자에 비효율적 | 비추천      |
| Math.floor(...)     | Math.floor(12.8) → 12 | 내림, 양수/음수 모두 정수 내림   | 표준적      |
| Math.trunc(...)     | Math.trunc(12.8) → 12 | 소수점 절단, 부호 유지           | 가장 명확   |
| ~~value (비트 연산) | ~~12.8 → 12           | 빠르지만 가독성/음수 처리 주의   | 짧지만 주의 |
| value               | 0 (비트 or)           | (12.8                            | 0) → 12     | ~~와 유사, 가독성 떨어짐 | 짧지만 주의 |

## 주요 방법 설명

### parseInt(...)

```javascript
parseInt(12.8); // 12
```

- 문자열 변환 후 파싱하므로 숫자 처리에 비효율적
- 소수점 이하 버림, 음수도 절단
- 추천하지 않음

### Math.floor(...)

```javascript
Math.floor(12.8); // 12
Math.floor(-12.8); // -13
```

- 항상 내림(Down), 음수는 더 작은 정수로 내림
- 양수만 다룰 때 표준적

### Math.trunc(...)

```javascript
Math.trunc(12.8); // 12
Math.trunc(-12.8); // -12
```

- 소수점 이하 절단, 부호 유지
- 양수/음수 모두 자연스럽게 정수 부분만 남김
- 가장 명확하고 추천

### 비트 연산 (~~, | 0)

```javascript
~~12.8; // 12
-~~12.8; // -12
12.8 | 0; // 12
-12.8 | 0; // -12
```

- 빠르지만 가독성 떨어짐, 음수/특수값 처리 주의
- 대회/짧은 코드에서만 제한적으로 사용

## 비교 예시

```javascript
const value = sumOneToN(inputNum) / 10;

const method1 = parseInt(value); // 문자열 기반
const method2 = Math.floor(value); // 양수만 있을 때 표준
const method3 = Math.trunc(value); // 부호 상관없이 항상 정수 부분
const method4 = ~~value; // 암기 코딩 느낌
```

## 상황별 추천

| 상황               | 추천 방식                    |
| ------------------ | ---------------------------- | --- |
| 양수만 다룰 경우   | Math.floor() or Math.trunc() |
| 음수도 고려할 경우 | Math.trunc()                 |
| 가독성/안정성 우선 | Math.trunc()                 |
| 성능 극한 추구     | ~~value, value               | 0   |

## 아주 큰 수(BigInt) 처리

JavaScript의 Number 타입은 안전하게 표현할 수 있는 정수 범위가 제한되어 있습니다(약 ±9,007,199,254,740,991). 이 범위를 넘는 큰 정수 연산이 필요하다면 BigInt 타입을 사용해야 하며, Math 계열 함수나 비트 연산은 BigInt에 사용할 수 없습니다.

### BigInt에서 정수 부분 추출

BigInt는 소수점이 없는 정수만 표현하므로, 소수점 이하가 있는 값은 BigInt로 변환 시 자동으로 버려집니다.

```javascript
const bigValue = BigInt(12.8); // 12n
const bigNegative = BigInt(-12.8); // -12n
```

- BigInt 생성자에 소수점이 포함된 값을 넣으면 소수점 이하가 절단되어 정수 부분만 남습니다.
- 이미 BigInt 타입이라면 별도의 처리가 필요 없습니다.
- BigInt는 Math.trunc, Math.floor, ~~ 등과 함께 사용할 수 없습니다.

## 정리

- parseInt: 문자열 변환, 비효율적, 추천하지 않음
- Math.floor: 내림, 양수만 다룰 때 표준
- Math.trunc: 소수점 절단, 부호 유지, 가장 명확/추천
- ~~value, value | 0: 짧지만 가독성/안정성 떨어짐, 특수 상황만
- 실무/코테에서는 Math.trunc() 사용 권장
- 수치가 매우 크면 BigInt로 변환하여 정수 부분만 사용

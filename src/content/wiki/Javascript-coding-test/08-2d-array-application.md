# JavaScript 2차원 배열 응용

## 목차

- [개요](#개요)
- [2차원 배열 생성 및 입력](#2차원-배열-생성-및-입력)
- [탐색 및 출력](#탐색-및-출력)
- [새로운 배열 만들기](#새로운-배열-만들기)
- [특정 위치 값 접근/변경](#특정-위치-값-접근변경)
- [정리](#정리)

## 개요

JavaScript에서 2차원 배열은 배열을 요소로 갖는 배열(Array of Arrays)로, 행과 열 구조의 데이터를 효율적으로 처리할 수 있습니다. 입력, 탐색, 변환, 특정 위치 값 변경 등 다양한 문제 해결에 필수적으로 활용됩니다.

## 2차원 배열 생성 및 입력

### 1. 가로, 세로 지정 없이 한 줄에 한 행씩 입력되는 경우

예시 입력:

```
1 2 3
4 5 6
7 8 9
```

```javascript
const fs = require("fs");
let input = fs.readFileSync(0).toString().trim().split("\n");
let matrix = input.map((line) => line.split(" ").map(Number));
console.log(matrix);
// 결과: [[1,2,3],[4,5,6],[7,8,9]]
```

---

### 2. 첫 줄에 행과 열이 주어지고, 그 다음 줄부터 행렬 데이터가 이어지는 경우

예시 입력:

```
3 4
1 2 3 4
5 6 7 8
9 10 11 12
```

```javascript
const fs = require("fs");
let input = fs.readFileSync(0).toString().trim().split("\n");
const [rows, cols] = input[0].split(" ").map(Number);
let matrix = [];
for (let i = 0; i < rows; i++) {
  matrix.push(input[i + 1].split(" ").map(Number));
}
console.log(matrix);
// 결과: [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
```

---

### 3. 빈 줄(여백)로 여러 개의 행렬이 구분되어 입력되는 경우

예시 입력:

```
1 2
3 4

5 6
7 8
```

```javascript
const fs = require("fs");
let input = fs.readFileSync(0).toString().trim().split("\n");

let matrices = [];
let current = [];
for (let line of input) {
  if (line.trim() === "") {
    if (current.length > 0) {
      matrices.push(current);
      current = [];
    }
  } else {
    current.push(line.split(" ").map(Number));
  }
}
if (current.length > 0) matrices.push(current);

console.log(matrices);
// 결과: [[[1,2],[3,4]], [[5,6],[7,8]]]
```

- 여러 개의 행렬을 하나의 배열(matrices)에 순서대로 담는 방식입니다.

---

### 3-1. 빈 줄(여백)로 여러 개의 행렬이 구분되어 입력되는 경우 (각각 변수에 저장)

예시 입력:

```
1 2
3 4

5 6
7 8
```

```javascript
const fs = require("fs");
let input = fs.readFileSync(0).toString().trim().split("\n");

let splitIndex = input.findIndex((line) => line.trim() === "");
let matrix1 = input
  .slice(0, splitIndex)
  .map((line) => line.split(" ").map(Number));
let matrix2 = input
  .slice(splitIndex + 1)
  .map((line) => line.split(" ").map(Number));

console.log(matrix1);
// 결과: [[1,2],[3,4]]
console.log(matrix2);
// 결과: [[5,6],[7,8]]
```

- findIndex로 빈 줄의 위치를 찾고, slice로 빈 줄 전후를 각각 잘라서 별도의 2차원 배열로 만듭니다.
- 빈 줄이 여러 개라면, 이 방법을 반복적으로 적용하거나, 배열을 순회하며 여러 matrix 변수로 나눌 수 있습니다.

## 탐색 및 출력

```javascript
let matrix = [
  [3, 1],
  [4, 2],
];
for (let i = 0; i < matrix.length; i++) {
  let str = "";
  for (let j = 0; j < matrix[i].length; j++) {
    str += matrix[i][j] + " ";
  }
  console.log(str);
}
```

- 이중 for문으로 행과 열을 순회하며 값 출력

## 새로운 배열 만들기

```javascript
let matrix = [
  [1, -1],
  [0, 5],
];
const newMatrix = matrix.map((row) => row.map((element) => element * 2));
```

- map 등 배열 메서드를 활용해 각 요소를 변환한 새로운 2차원 배열 생성

## 특정 위치 값 접근/변경

```javascript
let matrix = [
  [1, -1],
  [0, 5],
];
let rIdx = 1,
  cIdx = 0;
if (rIdx >= 0 && rIdx < matrix.length && cIdx >= 0 && cIdx < matrix[0].length) {
  matrix[rIdx][cIdx] = 100; // 값 변경
}
```

- 행, 열 인덱스를 통해 원하는 위치의 값 읽기/수정, 인덱스 범위 체크 필수

## 정리

- 2차원 배열은 배열을 요소로 갖는 배열로, `matrix[row][col]` 형태로 접근
- 입력, 탐색, 변환, 특정 위치 값 변경 등 다양한 문제 해결에 필수
- 이중 for문과 배열 메서드(map 등)를 적절히 활용

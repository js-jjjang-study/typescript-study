## 1주차 구현 기록

<br>

## 🛠️ 기능 목록

<br>

### 필수 기능

#### 1. 인풋값 확인 => checkRequired()

#### 2. 인풋값 길이 확인 => checkLength()

- 유저이름 최소 4, 최대 10
- 이메일 (도메인 제외) 최소 4, 최대 64
- 비밀번호 최소 10, 최대 20

#### 3. 이메일 유효성 확인 => checkEmail()

- id 부분 영어,숫자만 허용

#### 4. 비밀번호 매칭 확인 => checkPasswordsMatch()

#### 5. 유효성 검사에 통과 못할 시 에러 텍스트 토글

<br>

## 기능 구현 사항

### 1. 에러 토글

![image](https://user-images.githubusercontent.com/81623931/219420571-60a94ed6-3e59-4e76-a8e2-4db0fdfeaf1a.png)

- 각 input 값의 유효성을 통과하지 못할 시에 에러토클이 발생합니다.
- Confirm Password 같은 경우 Password가 빈칸일 때는 에러토글이 발생하지 않습니다.
- Confirm Password의 기능은 Password에 값이 들어올 떄부터 기능합니다.

<br>

### 2. 유효성 체크

![image](https://user-images.githubusercontent.com/81623931/219421286-af8f6ced-c076-41f2-ac4b-361001358f35.png)

- 각 input 값의 유효성을 통과하면 값이 허용됩니다.
- Password와 Confirm Password의 값이 서로 다를 시에는 Confirm Password 에러토글만 나타납니다.

<br>

### 3. 제출 기능

![image](https://user-images.githubusercontent.com/81623931/219423104-84989856-e8fb-4ee7-86a6-5461e6c095bb.png)

- 모든 유효성을 통과하면 제출되었다는 alert가 발생합니다.

<br>

## ⁉️ 트러블슈팅

<br>

## 1. input value 캐스팅 에러

<img src="https://user-images.githubusercontent.com/81623931/219395697-72f5fde6-d420-4f9c-bc5f-c7377dfde239.png" />

<br>

### 📝 해결 방법

```typescript
const email = <HTMLInputElement>document.getElementById("email");
```

- HTMLInputElement 캐스팅

<br>

## 2. null, undefined 체크

<img src="https://user-images.githubusercontent.com/81623931/219407214-17ecc64c-4c4b-496c-9ee6-b200ceb1859e.png" />

<br>

### 📝 해결 방법

```typescript
if (domain!.slice(domain!?.length - 4) !== ".com") return false;
```

- 확정 할당 어선셜

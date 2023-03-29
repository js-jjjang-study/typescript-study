# 기능 목록

- [x] 모달창 구현
- [x] 슬라이드 메뉴 구현

<br>

# 모달창

## 로직

1. `Sign Up` 버튼 클릭
2. 모달창 보여지기 (`show-modal`, `keyframes` 애니메이션)
3. 이름, 이메일, 비밀번호, 비밀번호 확인 입력
   - `email` 유효성 검사
4. `Submit` 클릭 => 제출 (새로고침 및 모달 안 보이게)
5. `X` 버튼 클릭 or 모달 아닌 부분 클릭 => 모달 안 보이게

<br>

# 슬라이드 메뉴

## 로직

1. 메뉴 버튼 클릭
2. 슬라이더 `nav` 보여지기 (`body`에 `show-nav` 추가)
3. 재클릭 시 슬라이더 `nav` 숨기기

<br>

# 배운 점 || 생각해 볼만한 점

- 모달 외부를 클릭했을 때 모달이 닫히도록 하는 기능을 구현하였습니다.
- 이에 따라 모달이 열려졌을 때 모달 외부를 클릭하는 경우(모달의 상위 노드) 모달이 닫히도록 하는 기능을 추가하였습니다.
- 상위 노드를 클릭하는 경우에도 `closeModal` 함수를 호출하여 모달을 닫아주었습니다.
- 추가적으로 `document.querySelector`를 사용하면 코드의 길이가 길어져 들여쓰기가 발생합니다.
- 이에 따라 `document.querySelector` 함수를 `selectQuery`에 할당하여 활용하였습니다.

- `showNav` 함수의 반환 타입은 `boolean`을 사용해야 합니다.
- 하지만 `showNav` 함수의 목적은 어떠한 값을 반환하는 것이 아니므로 아래와 같은 사용법이 더 적절할 수 있습니다.

```ts
// before
const showNav = (): boolean => bodyElement.classList.toggle(showNavClass);

// after
const showNav = (): void => {
  bodyElement.classList.toggle(showNavClass);
};
```

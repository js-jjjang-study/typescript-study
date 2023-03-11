# 3주차 CustomVideoPlayer 프로젝트

## 🛠️ 기능 구현

- [x] 비디오 재생 버튼 클릭 시 비디오 재생 및 아이콘 변경
- [x] 비디오 일시 정지 버튼 클릭 시 비디오 일시 정지 및 아이콘 변경
- [x] 비디오 정지 버튼 클릭 시 비디오 정지 및 아이콘 변경
- [x] 비디오 지속 시간에 맞는 시간 출력

<br />

이번 프로젝트에서 신경 쓴 부분들은 다음과 같습니다.

1. 함수 재사용성 고려
2. 불필요한 이벤트 추가 X
3. 삼항연산자

<br />

## 🔃 아이콘 업데이트 재사용

```typescript
const updateIcon = (): void => {
  play.children[0].className = video.paused
    ? "fa fa-play fa-2x"
    : "fa fa-pause fa-2x";
};
```

위와 같은 코드로 일시정지, 재생, 정지 시 아이콘을 변경해줍니다.

위 코드는 일시정지, 재생, 정지시 매번 동작해야합니다.

따라서, 하나의 함수로 선언하여 각 기능들을 실행할 때 호출되도록 불렀습니다.

활용 예는 다음과 같습니다.

```typescript
const videoPlayToggle = (): void => {
  video.paused ? video.play() : video.pause();
  updateIcon();  // <= 아이콘 업데이트
};

// - Stop
const stopVideo = (): void => {
  video.currentTime = 0;
  video.pause();
  updateIcon();  // <= 아이콘 업데이트
};
};

```

<br />

## ⛔ 불필요한 이벤트 추가 X

play와 pause 이벤트는 굳이 필요하지 않습니다.

따라서, 사용하지 않았습니다.

<br/>

## ⏰ 시간 설정

```typescript
const minutes: string = `0${~~(video.currentTime / 60)}`.slice(-2);
const seconds: string = `0${~~(video.currentTime % 60)}`.slice(-2);
```

<br />

위 코드는 제가 시간을 가공할 때 자주 사용하는 코드입니다. ex) 03:05

if 문으로 구분할 필요없이 코드가 간결해서 가독성이 좋다는 점이 장점입니다.

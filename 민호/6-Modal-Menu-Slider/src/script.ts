const toggleButton = document.getElementById('toggle') as HTMLButtonElement;
const closeButton = document.getElementById('close') as HTMLButtonElement;
const openButton = document.getElementById('open') as HTMLButtonElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const navButton = document.getElementById('navbar') as HTMLDivElement;

type toggleState = {
  stateName: 'toggle';
  isToggle: boolean;
};
type modalState = {
  stateName: 'modal';
  isShow: boolean;
};
type stateType = toggleState | modalState;

const useState = <T extends stateType>(status: T): [() => T, (state: T) => void] => {
  let initialState = status;

  const state = () => initialState as T;

  const setState = (newState: T) => {
    initialState = newState;

    newState.stateName === 'toggle' ? toggleRender() : modalRender();
  };

  return [state, setState];
};

const [navToggle, setNavToggle] = useState({
  isToggle: false,
  stateName: 'toggle',
} as toggleState);

const [showModal, setShowModal] = useState({
  isShow: false,
  stateName: 'modal',
} as modalState);

const toggleAction = (e: Event) => {
  let current = navToggle();

  // 토글이 되어 있는 상황일 때(=navbar가 열려 있는 상황일 때)
  if (current.isToggle) {
    // navbar 외부 클릭 시 (navbar를 닫아야 함)
    if (
      e.target !== toggleButton &&
      !toggleButton.contains(e.target as HTMLElement) &&
      e.target !== navButton &&
      !navButton.contains(e.target as HTMLElement)
    ) {
      setNavToggle({ isToggle: false, stateName: 'toggle' });
    }

    // 토글 버튼 클릭 시 (navbar를 닫아야 함)
    if (toggleButton.contains(e.target as HTMLElement)) {
      setNavToggle({ isToggle: false, stateName: 'toggle' });
    }

    return;
  }

  // 토글이 안 되어 있는 상황일 때(=navbar가 닫혀 있는 상황일 때)
  if (!current.isToggle) {
    if (toggleButton.contains(e.target as HTMLElement)) {
      setNavToggle({ isToggle: true, stateName: 'toggle' });
    }
    return;
  }
};

const modalAction = () => {
  let current = showModal();

  // if (current.isShow) {
  //   setShowModal({ isShow: false, stateName: 'modal' });
  //   return;
  // }
  // if (!current.isShow) {
  //   setShowModal({ isShow: true, stateName: 'modal' });
  //   return;
  // }
  
  setShowModal({ isShow: !(current.isShow), stateName: 'modal' });
};


// 리렌더링 로직들
// 상태가 true인 값으로 리렌더링이 호출 되면 navbar or modal을 엽니다
// 상태가 false인 값으로 리렌더링이 호출 되면 navbar or modal을 닫습니다
const toggleRender = () => {
  if (navToggle().isToggle) {
    document.body.classList.add('show-nav');
  }
  if (!navToggle().isToggle) {
    document.body.classList.remove('show-nav');
  }
};

const modalRender = () => {
  console.log(showModal());
  if (showModal().isShow) {
    modal.classList.add('show-modal');
  }
  if (!showModal().isShow) {
    modal.classList.remove('show-modal');
  }
};

// 이벤트 할당
openButton.addEventListener('click', modalAction);

closeButton.addEventListener('click', modalAction);

document.body.addEventListener('click', toggleAction);

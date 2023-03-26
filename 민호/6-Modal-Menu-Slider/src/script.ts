const toggleButton = document.getElementById('toggle') as HTMLButtonElement;
const closeButton = document.getElementById('close') as HTMLButtonElement;
const openButton = document.getElementById('open') as HTMLButtonElement;
const modal = document.getElementById('modal') as HTMLDivElement;
const navButton = document.getElementById('navbar') as HTMLDivElement;

type statesType = {
  isToggle: boolean;
};

const useState = <T extends statesType>(
  status: T,
): [() => T, (state: T) => void] => {
  let initialState = status;

  const state = () => initialState as T;

  const setState = (newState: T) => {
    initialState = newState;
    render();
  };

  return [state, setState];
};

const [navToggle, setNavToggle] = useState({ isToggle: false });

const toggleAction = (e: Event) => {
  let current = navToggle();

  if (current.isToggle) {
    // navbar 외부 클릭 시
    if (
      e.target !== toggleButton &&
      !toggleButton.contains(e.target as HTMLElement) &&
      e.target !== navButton &&
      !navButton.contains(e.target as HTMLElement)
    ) {
      setNavToggle({ isToggle: false });
    }

    // 토글 버튼 클릭 시
    if (toggleButton.contains(e.target as HTMLElement)) {
      setNavToggle({ isToggle: false });
    }

    return;
  }
  if (!current.isToggle) {
    if (toggleButton.contains(e.target as HTMLElement)) {
      setNavToggle({ isToggle: true as any });
    }
    return;
  }
};

const render = () => {
  if (navToggle().isToggle) {
    document.body.classList.add('show-nav');
  }
  if (!navToggle().isToggle) {
    document.body.classList.remove('show-nav');
  }
};

document.body.addEventListener('click', toggleAction);

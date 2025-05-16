## 📦 2025.05.14 react-quill@2.0.0 설치 관련 메모

- 현재 React 버전은 19
- 지금 버전의 quill은 현재 사용하는 react19 버전과 충돌이 있어 '--legacy-peer-deps' 옵션으로 충돌을 무시하고 설치함
- quill 공식 페이지에 react19버전을 호환하는 quill 버전이 나오면 그때 교체해야함

📝 참고:
- 현재 설치한 버전은 대부분 기능이 동작한다해서 이전 버전이 아닌 최신 버전으로 설치했슴다
- 사용한 명령어 : 'npm i react-quill --legacy-peer-deps'


## 2025.05.14 rafce 관련 설명

- js파일을 만들고 아무것도 없는 상태에서 'rfce + tab'을 하면 자동으로 기본설정이 된다는 사실~~
- 자동으로 형식 맞추는 명령어 : rfce + tab


## 2025.05.14 react-router-dom 설치 관련 설명

- quill 버전 때문에 'react-router-dom' 설치 관련해서 호환 문제 발생
- 현재 방법으로는 지금 사용하고있는 react19 버전을 낮추거나 '--legacy-peer-deps' 옵션으로 강제로 충돌을 무시하고 설치하는 방법뿐
- 강제로 의존성 주입해도 문제될건 없기에 '--legacy-peer-deps' 옵션으로 강제로 의존성 주입하겠음

📝 참고:
- 현재 react19 버전이 quill 설치 버전이랑 맞지 않아서 생긴 문제이기에 router 설치에도 문제 발생ㅠㅠ
- 사용한 명령어 : 'npm i react-router-dom --legacy-peer-deps'


## 2025.05.16 quill api 사용 관련 설명

- 25.05.15 이 날 했던 --legacy-peer-deps'로 react19버전에 quill을 강제로 추가시켰지만 실제 작동해본 결과 react-quill 내부 코드가 'ReactDOM.findDOMNode()'를 사용중이라 React19와 충돌 발생
- 따라서 React 버전을 18로 다운그래이드 함

📝 참고:
- 현재 React19가 아닌 React18 버전
- React19 버전은 Quill의 내부 코드인 'ReactDOM.findDOMNode()'와 충돌이 발생해 React18로 낮췄음
- 사용한 명령어 (위에서 차례로)
    * npm uninstall react react-dom
    * npm install react@18.2.0 react-dom@18.2.0
    * npm install react-quill


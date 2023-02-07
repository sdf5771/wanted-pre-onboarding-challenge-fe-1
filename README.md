# **📋 프로젝트 개요**

해당 프로젝트는 원티드 온보딩 프론트 엔드 2023.01 챌린지 사전 과제를 위해 제작하였으며,

Front-end : React JS, TypeScript

State Management : redux, react-query

로 구현하였습니다.

전반적으로 기존 명세에 따라 구현하였지만, 할 일의 title 값을 사용하지 않고, content 값 만을 사용하여

좀 더 할 일의 내용을 쉽게 추가하고, 쉽게 수정할 수 있게 사용할 수 있기를 바라며 제 임의로 해당하는 사항만 변경하는 방식으로 구현하였습니다.

감사합니다.

- Email : [seobisback@gmail.com](mailto:seobisback@gmail.com)
- Notion Portpolio : [Developer Seobwoo Kim Portpolio](https://www.notion.so/Developer-Seobwoo-Kim-Portpolio-a2d2e2fb6c6e4a4b9de09c47e99f3010)
- Github Link : [sdf5771 - Overview](https://github.com/sdf5771)
- Github Tech Blog : [Seobisback Github Blog](https://sdf5771.github.io/)

---

# 1. 설치 및 실행방법

- Node Package Manager를 통한 종속성 라이브러리 설치

```python
npm install
```

- React Script 실행

```python
npm start
```

- 서버 API Git Repo

https://github.com/sdf5771/wanted-pre-onboarding-challenge-fe-1-api.git

---

# 2. 프로젝트 Directory 구조

- Path : src/

```python
.
├── App.tsx
├──📁 components
│   ├──📁 auth
│   │   ├── AuthInputComponent.tsx
│   │   ├── LoginScreen.tsx
│   │   └── SignUpScreen.tsx
│   ├──📁 public
│   │   ├── PublicMessageBox.tsx
│   │   └── PublicStyleButton.tsx
│   ├──📁 route
│   │   └──📁 mainApp
│   │       ├── TodoApp.tsx
│   │       └── TopBar.tsx
│   └──📁 todo
│       ├── TodoDetailView.tsx
│       └── TodoElement.tsx
├──📁 images
│   ├── cross.png
│   ├── cross_hover.png
│   ├── pencil.png
│   ├── pencil_hover.png
│   ├── todo_image.png
│   └── todo_star.png
├── index.css
├── index.tsx
├──📁 modules
│   └──📁 auth
│       └── authValidation.tsx
├──📁 queries
│   ├──📁 auth
│   └──📁 todo
│       ├── CreateTodo.ts
│       ├── DeleteTodo.ts
│       ├── GetDetailTodoData.ts
│       ├── GetTodos.ts
│       └── UpdateTodo.ts
├── react-app-env.d.ts
├──📁 reducers
│   ├──📁 auth
│   │   ├── authEmailInputErrorReducer.tsx
│   │   ├── authPasswordInputErrorReducer.tsx
│   │   ├── authReducer.tsx
│   │   └── authSlideMenuReducer.tsx
│   ├── reducers.tsx
│   └──📁 todo
│       ├── todoDeleteReducer.tsx
│       ├── todoDetailViewClickReducer.tsx
│       └── todoReducer.tsx
├──📁 route
│   ├──📁 auth
│   │   └── Auth.tsx
│   ├──📁 mainApp
│   │   └── MainApp.tsx
│   └──📁 todo
│       └── TodoScreen.tsx
├──📁 store
│   └── store.tsx
└──📁 stylesheets
    ├──📁 components
    │   ├──📁 auth
    │   │   ├── AuthInputComponent.module.css
    │   │   ├── LoginScreen.module.css
    │   │   └── SignUpScreen.module.css
    │   ├──📁 public
    │   │   ├── PublicMessageBox.module.css
    │   │   └── PublicStyleButton.module.css
    │   └── todo
    └──📁 route
        ├──📁 auth
        │   └── Auth.module.css
        ├──📁 mainApp
        │   ├── MainApp.module.css
        │   ├── TodoApp.module.css
        │   └── TopBar.module.css
        └──📁 todo
            ├── TodoDetailView.module.css
            ├── TodoElement.module.css
            └── TodoScreen.module.css
```

- components : 공용으로 사용하는 component는 ‘public’ 폴더에 두고 그 밖에는
- images
- modules
- queries
- reducers
- route
- store
- stylesheets

---

# 3. 구현 요구 사항 목록

**Assignment 1 - Login / SignUp**

- /auth 경로에 로그인 / 회원가입 기능을 개발합니다
    - 로그인, 회원가입을 별도의 경로로 분리해도 무방합니다
    - [x]  최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성해주세요
    - [x]  이메일과 비밀번호의 유효성을 확인합니다
    - [x]  이메일 조건 : 최소 `@`, `.` 포함
    - [x]  비밀번호 조건 : 8자 이상 입력
    - [x]  이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
    - [x]  로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요
    - [x]  응답으로 받은 토큰은 로컬 스토리지에 저장해주세요
    - [x]  다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트 시켜주세요
    - [x]  어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트 시켜주세요

**Assignment 2 - Todo List**

- Todo List API를 호출하여 Todo List CRUD 기능을 구현해주세요
    - [x]  목록 / 상세 영역으로 나누어 구현해주세요
    - [x]  Todo 목록을 볼 수 있습니다.
    - [x]  Todo 추가 버튼을 클릭하면 할 일이 추가 됩니다.
    - [x]  Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소할 수 있습니다.
    - [x]  Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제할 수 있습니다.
    - [x]  한 화면 내에서 Todo List와 개별 Todo의 상세를 확인할 수 있도록 해주세요.
    - [x]  새로고침을 했을 때 현재 상태가 유지되어야 합니다.
    - [x]  개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회할 수 있도록 해주세요.
    - [x]  한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현해주세요
    - [x]  수정되는 Todo의 내용이 목록에서도 실시간으로 반영되어야 합니다

**과제 참고 사항**

1. 로컬 서버를 실행했을 때 생성되는 `db/db.json`이 DB 역할을 하게 됩니다. 해당 파일을 삭제하면 DB는 초기화 됩니다.
2. 로그인 / 회원 가입 기능은 유저를 DB에 추가하고 JWT 토큰을 응답으로 돌려줄 뿐, 실제 유저별로 Todo 목록을 관계 지어 관리하지는 않습니다. (모든 유저가 하나의 Todo를 가짐)
3. 로그아웃은 클라이언트 단에서 localStorage에 저장된 token을 삭제하는 방식으로 간단히 구현해주세요.

---

# 4.  세미나를 들으며, 과제 진행 후 느낀점

- Read Me 작성에 대해 고민을 하게 되었다.
    - 누군가 내 코드를 보기 전에 정보와 프로젝트의 명세가 제대로 되어 있는 문서를 제공받은 후 코드를 확인하는 것과 아무런 정보도 없는 소스를 그저 보는 것은 차이가 심하다고 생각한다. 이번 세미나에서는 업무와 프로젝트 진행중 놓치고 있던 디테일한 요소들을 리마인드 할 수 있는 계기가 되어 굉장히 보람있는 공부를 했다고 생각한다.
- 다음 프로젝트까지 React Query를 좀 더 공부하고 제대로 사용해보아야 할 것 같다.
    - 기존에는 React Query의 존재 유무만 알고 공부하지 않았는데 이번 세미나의 주제가 React CRUD와 React Query인 만큼 React Query에 관한 내용을 다루고 있었지만 해당 기술의 초기 공부가 부족한 탓에 현재 코드에서도 API 호출부만 기존 useEffect를 통한 통신에서 React Query를 사용한 방식으로 변경해보았다. 하지만 이것만으로는 React Query의 매력을 충분히 공부하기 어려울 것이라고 판단된다. 마침 차후에 팀 프로젝트로 진행하는 부분에 해당 기술을 공부하고 적용하는 것을 목표로 잡아야겠다.
- 디자인 패턴에 관해서 많은 고민을 하게 되었다.
    - 같은 세미나를 진행하시는 분들의 코드를 확인해보았는데, ****presentational and container 패턴이 굉장히 눈에 띄었다. 이 디자인 패턴으로 설계한 코드들은 구조만 보아도 어떤 기능을 담고 있는지 명확하게 파악이 가능했으며, UI 변경이 자주 일어나는 웹에서 UI와 비즈니스 로직을 분리하여 재사용성을 높이는 부분도 크게 다가와서 한 동안 이 패턴을 공부할 것 같다.****

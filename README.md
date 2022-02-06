# 깃 관련 명령어를 정리

---

### 전체적인 사용

- 이름과 이메일 전역에 저장하기
  - `git config --global user.name "이름`
  - `git config --global user.email "이메일"`
  - 확인일 경우 뒤에 "" 부분 생략
- 기본 브랜치명 변경
  - `git config --global init.defaultBranch main`
  - master라는 브랜치명이 사회적 문제가 있을 수 있으므로, 기본 브랜치 명을 main으로 변경해줍니다.
- git 관리에서 배제할 파일/폴더들은 .gitignore 파일에 명시해줍니다.
  [gitignore 참조링크](https://git-scm.com/docs/gitignore)
- `git status` : 현재 상태 확인
- `git add "저장할 파일명" or "."(변경된 모든 파일을 뜻함)`
- `git commit [-m "메세지 내용"]`
- `git log [--all --oneline --graph]`: 로그 보기

---

### 리셋과 리버트

#### reset

이전의 커밋으로 돌아갑니다.
`git reset [--hard | --soft] "돌아갈 커밋 해쉬" (아무것도 입력안하면 이전 커밋)`

#### revert

선택한 커밋 상태를 되돌린 후, 새로운 커밋을 생성합니다.
`git revert "리버트할 커밋 해쉬"`

- 리버트할 커밋에 의존을 하고 있는 이후 커밋이 존재한다면, 해결 후 `git revert --continue`를 입력해줍니다.
- 진행하고 있는 리버트를 중단하려면 `--abort`
- 커밋을 남기지 않고 리버트만 진행하고 싶다면 `--no-commit`

---

### 브런치

같은 프로젝트에서 여러가지 브런치를 생성해, 단독적인 일을 진행할 수 있습니다.

- `git barnch "새로 만들 브런치 이름` 브런치 생성, 브런치 이름 생략 시, 현재 브런치 목록을 보여줍니다.

- `git switch "이동할 브런치 이름"` 브런치를 이동합니다. `-C` 옵션을 주면 브런치 생성도 함께 이루어집니다.

> git 2.23 버전부터 checkout 명령이 switch, restore로 분리되고, checkout 자체도 하는일이 있습니다.

---

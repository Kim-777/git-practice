# 깃 관련 명령어를 정리 🦆

---

작성된 모든 내용은 Mac을 기준으로 작성되어 있습니다.

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
  - `-D` 브랜치 삭제
  - `-m "기존 브랜치 이름" "바꿀 브랜치 이름"` 브랜치 이름 변경

> git 2.23 버전부터 checkout 명령이 switch, restore로 분리되고, checkout 자체도 하는일이 있습니다.

#### 브랜치 합치기

##### merge

머지를 진행할 브런치에서 병합할 브런치를 `merge` 하여 병합시킵니다.

> 예시
> git merge add-branch

:wq 입력 후 머지를 완료합니다.

##### rebase

리베이스할 브런치에서 진행해야 합니다.

> 예시
> add-branch를 main에 리베이스 한다면 `git switch add-branch`로 이동 후 진행

`git rebase "리베이스가 되어지는 대상 브런치"`

이렇게 `rebase`를 진행하면 아직 브런치가 `rebase` 되어진 브런치의 커밋까지 도달하지 못한 상태 이기 때문에 `git switch "리베이스가 되어지는 대상 브런치"`로 이동 후 `git merge "리베이스할 브펀치"`로 `fast-forward`를 시켜줍니다.

#### 브런치 충돌 해결하기

`merge` 시 같은 공간에서의 수정 부분이 겹친다면 충돌이 발생합니다. 현재 브런치와 병합될 브런치의 내용 중 하나를 채택하거나, 수정 후 새로운 내용을 작성 후, `git add`와 `commit`을 진행합니다.

- `merge` 진행을 취소하려면 `--abort` 옵션 사용

`rebase`의 경우는 리베이스 브런치의 `commit` 각각 모두 충돌을 해결해 줘야 합니다.

- `--abort` 리베이스 취소
- `--continue`로 리베이스 진행, 만약 다음 커밋에 또 충돌이 있다면, 충돌을 해결하라고 `git`이 알려줍니다.
- 이후 `브런치 합치기 (rebase)`에서 진행했던 과정을 똑같이 진행합니다(merge`)

---

# 깃 관련 명령어를 정리 🦆

작성된 모든 내용은 Mac을 기준으로 작성되어 있습니다.

---

## 전체적인 사용

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

## 리셋과 리버트

### reset

이전의 커밋으로 돌아갑니다.
`git reset [--hard | --soft] "돌아갈 커밋 해쉬" (아무것도 입력안하면 이전 커밋)`

- `soft` : `repository`에서 `staging area`로 이동
- `--mixed(default)` : `repository`에서 `working directory`로 이동
- `--hard` : 수정 사항을 완전히 삭제

### revert

선택한 커밋 상태를 되돌린 후, 새로운 커밋을 생성합니다.
`git revert "리버트할 커밋 해쉬"`

- 리버트할 커밋에 의존을 하고 있는 이후 커밋이 존재한다면, 해결 후 `git revert --continue`를 입력해줍니다.
- 진행하고 있는 리버트를 중단하려면 `--abort`
- 커밋을 남기지 않고 리버트만 진행하고 싶다면 `--no-commit`

---

## 브런치

같은 프로젝트에서 여러가지 브런치를 생성해, 단독적인 일을 진행할 수 있습니다.

- `git barnch "새로 만들 브런치 이름` 브런치 생성, 브런치 이름 생략 시, 현재 브런치 목록을 보여줍니다.

- `git switch "이동할 브런치 이름"` 브런치를 이동합니다. `-C` 옵션을 주면 브런치 생성도 함께 이루어집니다.
  - `-D` 브랜치 삭제
  - `-m "기존 브랜치 이름" "바꿀 브랜치 이름"` 브랜치 이름 변경

> git 2.23 버전부터 checkout 명령이 switch, restore로 분리되고, checkout 자체도 하는일이 있습니다.

### 브랜치 합치기

#### merge

머지를 진행할 브런치에서 병합할 브런치를 `merge` 하여 병합시킵니다.

> 예시
> git merge add-branch

:wq 입력 후 머지를 완료합니다.

#### rebase

리베이스할 브런치에서 진행해야 합니다.

> 예시
> add-branch를 main에 리베이스 한다면 `git switch add-branch`로 이동 후 진행

`git rebase "리베이스가 되어지는 대상 브런치"`

이렇게 `rebase`를 진행하면 아직 브런치가 `rebase` 되어진 브런치의 커밋까지 도달하지 못한 상태 이기 때문에 `git switch "리베이스가 되어지는 대상 브런치"`로 이동 후 `git merge "리베이스할 브펀치"`로 `fast-forward`를 시켜줍니다.

### 브런치 충돌 해결하기

`merge` 시 같은 공간에서의 수정 부분이 겹친다면 충돌이 발생합니다. 현재 브런치와 병합될 브런치의 내용 중 하나를 채택하거나, 수정 후 새로운 내용을 작성 후, `git add`와 `commit`을 진행합니다.

- `merge` 진행을 취소하려면 `--abort` 옵션 사용

`rebase`의 경우는 리베이스 브런치의 `commit` 각각 모두 충돌을 해결해 줘야 합니다.

- `--abort` 리베이스 취소
- `--continue`로 리베이스 진행, 만약 다음 커밋에 또 충돌이 있다면, 충돌을 해결하라고 `git`이 알려줍니다.
- 이후 `브런치 합치기 (rebase)`에서 진행했던 과정을 똑같이 진행합니다(merge`)

---

## 원격 저장소 사용하기(github)

이 색션은 github의 아이디와 `repo`가 있다고 가정하고 진행합니다.

### 새로운 원격저장소 레포 생성 시

`github` 레포지토리 생성 후(비어있는 레포지토리여야합니다. 리드미도 있으면 X), 원격저장소에 저장할 프로젝트 폴더를 연 후

- `git remote add "orgin"(원격저장소의 별명입니다. origin 말고 무엇도 가능하지만 origin으로 저장하는 것이 관용적입니다.) "깃에서 가져온 원격 저장소 주소"`
- `git push -u(--set-upstream) "origin(원격 저장소 네임)" "main(현재 로컬 브런치를 저장할 원격 저장소 브런치 이름)"`

로 원격저장소와 로컬저장소를 연결해줍니다.

### 진행 중인 프로젝트 원격 저장소를 로컬로 가져올 때(로컬에 처음 프로젝트 가져오기)

- `github`에 다운 받을 프로젝트로 가서 `code` 버튼을 눌러 다운 받을 방식을 선택해줍니다(https, ssh 등)
- 프로젝트를 생성할 위치로 이동 후 `git clone "깃에서 가져온 원격 저장소 주소"`

### push

`로컬`에서 `원격`으로 커밋을 올립니다

- 로컬에서 작업 후 `add`, `commit`을 완료하면 원격보다 더 많은 `commit` 이 존재하게 됩니다.
- `git push`를 통해 원격에도 커밋 내용을 적용시킵니다.

### pull

`원격`에 있는 커밋을 `로컬`로 가져옵니다.

- 로컬에서 작업 후, 원격에 커밋 내용을 올리기 전에 `git pull`을 통해 원격에 커밋 내용에 변화가 있다면, 로컬에 가져와 주는 작업을 진행합니다.

### push와 pull 사용 주의 사항

- `push`를 진행했을 때, 원격 저장소에 `pull` 받아야 할 사항이 있다면 경고와 함꼐 `push`가 진행되지 않습니다.
- `push` 할 내용이 있을 시 `pull` 하는 두가지 방법
  - `git pull --no-reabes` merge 방식
  - `git pull --rebase` rebase 방식
- 원격을 로컬의 내역으로 강제 할 경우 `git push --force` (혼자하는 프로젝트나, 팀원들과 협의가 된 경우 사용하길 권장합니다.)

### 원격 브런치 잘 사용하기

- 새로운 로컬 브런치 원격에 저장하기

1. 로컬에서 새로운 브런치를 만듭니다. `git branch new(새로운 브런치 이름)`.
2. 이 new 브런치에서 작업 후 원격레포로 커밋 내역을 저장하려면 `git push`를 진행할 겁니다.
3. 하지만 원격 브런치에 로컬 브런치 `new`에 해당 내용을 저장할 브런치가 명시되어 있지 않기 떄문에 `git`은 어디에 저장할지 모르겠다고 `git push --set-upstream origin new`라는 명령어를 통해 원격에 `new`라는 브런치를 만들겠냐고 물어봅니다.
4. 그대로 진행하시면 원격에 로컬 브런치와 동일한 이름의 브런치를 생성할 수 있습니다!😄

- 새로운 원격 브런치 로컬에 동기화하기
  브런치를 확인할 경우 `git branch -a(--all)`로 원격의 브런치까지 전부 확인할 수 있습니다.
  `git fetch`로 원격저장소의 내용을 로컬에 동기화 해줍니다.

1. 원격 브런치에 새로운 브런치 `from-remote`가 있다고 가정합니다.
2. 로컬 브런치에서 `git fetch` 명령어를 통해 새로운 원격 브런치의 존재를 알아 차립니다.
3. `git switch -t origin/from-remote`를 통해 로컬에 원격저장소 브런치와 씽크되는 로컬브런치를 만들어 줍니다.

### 원격 브런치 삭제하기

`git push (원격저장소 이름) --delete (원격의 지울 브런치명)`

---

## git의 개념

깃의 기본 개념을 정리해봅니다.

### 3가지 공간

[이 개념은 잘 정리되어 있는 링크로 대체 합니다.](https://iseunghan.tistory.com/322)

### 파일의 삭제와 이동

그냥 파일을 삭제하면 파일을 삭제한 내역이 `working directory`에 저장됩니다. 하지만 `git rm "삭제할 파일명"`으로 삭제하면 `staging areat`에 삭제 내역이 저장되어 바로 커밋을 진행할 수 있습니다.

그냥 파일을 변경하면 "기존 파일이 삭제됨", "새로운 파일이 생김" 두 가지 내역이 생성되지만 `git mv "변경할 파일 이름" "변경될 파일 이름"`을 진행할 경우 `staging area`에 `renamed`라는 내역으로 파일 이름이 변경됨을 표시합니다.

`staging area`에 저장되어 있는 내역들을 다시 `working directory`로 옮기고 싶을 경우 `git restore --staged "파일 이름"(.로 사용시 전체 파일)` 만약 `--staged`를 사용하지 않으면 변경사항을 전부 리셋합니다!

### HEAD 사용하기

`git checkout HEAD[^]` 를 통해 `HEAD`를 이동 시킬 수 있습니다.

- `^ or ~`는 이동하고 싶은 갯수 만큼 사용할 수 있습니다.
  > 예시
  > 뒤로 2번 이동 `^^`
  > 뒤로 5번 이동 `~~~~~`
  > 커밋 해시로도 checkout이 가능 git checkout "커밋 해시 이름"
- 현재 위치한 브런치를 기준으로 `commit`을 이동하며 다닌다고 생가하면 편합니다.
- 헤더의 이동을 돌리고 싶으면 `git checkout -`를 사용

`HEAD`는 익명의 브런치 입니다. 즉, 이동되어 있는 커밋에서 내용을 변경 후 커밋하고 싶다면 익명 브런치에 이름을 달아 줍니다. `git switch -c "새로운 브런치 이름"`으로 브런치를 만든 후 작업하면 됩니다😜

### fetch와 pull의 차이점

- `fetch` : 원격 저장소의 최신 커밋을 로컬로 가져오기만 합니다.
- `pull` : 원격 저장소의 최신 커밋을 로컬로 가져와 `merge` 또는 `rebase` 해줍니다.

---

## 각종 설정

`git config`에 대해서 살펴봅시다!

- `--global` 옵션을 붙여주면 전역 설정을 의미합니다.
- `--list` 현재 프로젝트의 컨피그를 보여줍니다.
- `-e`
- `git config --global core.editor "code --wait"`로 에디터 변경할 수 있습니다.

### 유용한 설정들

- `git config --global core.autocrlf (윈도우: true / 맥: input)`
- `git config pull.rebase "false (or true)`
- `git config --global push.default current` push시 로컬과 동일한 브랜치명으로
- `git config --global alias.(단축키) "명령어"` (기본 깃 명령어에 익숙해질 때 사용할 것 추천드립니다. 저도 안쓰고 있습니다🤪)

---

## stash

작업을 하던 중에 결이 다른 내용을 프로젝트에 적용해야 할 경우, 현재 작업 사항을 잠시 옆으로 치워두는 기능입니다.

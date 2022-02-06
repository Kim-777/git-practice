# 깃 관련 명령어를 정리

---

### 전체적인 사용

- 이름과 이메일 전역에 저장하기
  - git config --global user.name "이름"
  - git config --global user.email "이메일"
  - 확인일 경우 뒤에 "" 부분 생략
- 기본 브랜치명 변경
  - git config --global init.defaultBranch main
  - master라는 브랜치명이 사회적 문제가 있을 수 있으므로, 기본 브랜치 명을 main으로 변경해줍니다.
- git 관리에서 배제할 파일/폴더들은 .gitignore 파일에 명시해줌.
  [gitignore 참조링크](https://git-scm.com/docs/gitignore)
- git status : 현재 상태 확인
- git add "저장할 파읾명" or "."(변경된 모든 파일을 뜻함)
- git commit [-m "메세지 내용"]
- git log [--all --oneline --graph]: 로그 보기

---

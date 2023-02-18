## 실행
 ```
 npm install
 npm start
 ```


## 중요

- API 시간당 요청 횟수가 적어 사용 시 문제가 생길 수 있습니다.
- API 시간당 요청을 늘리기 원한다면 App.tsx의 주석을 참고해주세요.


## 설명

- 검색을 통해 관련 레포지토리 리스트를 불러올 수 있습니다.

- 검색된 레포지토리의 페이지 당 개수는 80개입니다.
  인피니티 스크롤로 다음 페이지를 볼 수 있습니다.

- 검색된 레포지토리 상단 오른쪽 별모양을 누르면 관심 레포지토리에 추가할 수 있습니다.
  다시 누르면 관심 레포지토리에서 삭제됩니다.

- 관심 레포지토리는 오른쪽 사이드바에서 확인할 수 있습니다.
  상단 오른쪽 별모양 버튼으로 관심 레포지토리에서 추가 / 삭제 가능합니다.

- 관심 레포지토리 이슈 보러가기를 누르면 관심 레포지토리의 이슈를 모아서 업데이트 날짜 순으로 볼 수 있습니다.

- 검색된 레포지토리 보러가기를 누르면 다시 검색된 레포지토리를 볼 수 있습니다.
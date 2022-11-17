# oreillyDownloader (구 oreillyHack)

## 역사...?
1. 오라일리 인하우스 html(asciidoc을 뭔가로 변환한 요상한 형태)을 편집 시 참고하기 쉬운 형태로 바꿔 로컬 브라우저에서 편하게 보려고 만듦.
2. 오라일리에서 asciidoc만 주는 경우가 생겨 Asciidoctor.js로 직접 변환한 html도 지원하게 함.
3. 오라일리에서 데이터를 늦게 주는 일이 생겨 역자에게 사파리에서 파일을 받아서 주기 위해 스크레이퍼를 만듦.
4. 근데 보니까 오라일리 사파리에서 서비스하는 html은 유효한 데다가 넘버링도 훌륭함(배신감).
5. 그래서 그냥 스크레이퍼와 html 꾸며주는 코드를 합쳐서 이게 탄생.
6. 2021년 러닝 오라일리 사이트 개편(fetch 불가)으로 업데이트 중단.
7. 22-5-6 탬퍼멍키 스크립트와 함께 사용하는 방식으로 jpub.kr 사용자에게만 재오픈. 일단 매닝만 지원.

## 사용법
1. 탬퍼멍키 및 탬퍼멍키 스크립트(드롭박스에 호스팅)를 설치하고 탬퍼멍키 설정 화면에서 '설정 모드'를 '상급자'로 고른다.
2. 오라일리 사파리에 로그인 후 도서 메인 페이지(https://learning.oreilly.com/library/view/TITLE/ISBN/ 같은 주소)에서 `safari-dl-bml.min.js` 실행.
3. 자동으로 챕터를 끝까지 탐색하며 스크레이핑 후, 전과 같이 리포매팅한 파일 등을 담은 zip 다운로드가 시작됨.

## 서드파티 라이선스
여러 파일을 하나로 다운로드하기 위해 JSZip 불러다 씀: MIT/GPLv3 이중 라이선스.

## 재오픈 기념 스크린숏
![sample](https://user-images.githubusercontent.com/8731054/166978684-28aa7074-298c-4be8-82f5-bb51568cec99.png)

## 현 버전 알려진 문제
- 매닝이나 와일리 등은 NOTE, TIP, WARNING 등 구분 없이 모두 NOTE 스타일이 지정됨.

## 주요 업데이트 내역
- 2018-7-10 첫 커밋
- ...
- 2021-1-9 오라일리 'Practical Time Series Analysis' 지원 추가(수식 추출 오류)
- 2022-5-6 v0.0.1 탬퍼멍키 스크립트와 함께 사용하는 방식으로 jpub.kr 사용자에게만 재오픈. 일단 매닝만 지원.
- 2022-5-12 v0.0.2 팩트(새새 방식) 일부 지원... 달랑 한 권.
- 2022-11-17 v0.0.3 세팅 버그 수정. 탬퍼멍키 안에서 JSZip.generateAsync가 작동하지 않아서 사용 방식 바꿈
- 2022-11-17 v0.0.5 세팅과 CSS 수정(Real-World Cryptography). 로컬 캐시 사용해서 불필요한 페칭 방지

## todo
1. 오라일리 외 출판사 책도 가져오게 해보면 어떨까? -> 팩트, 에이프레스, 맥그로힐, 매닝, 와일리 책 추가. 더??
2. 목차 클릭 시 해당 요소 하이라이트(인라인 수식 등을 보기 편하게)
3. 이미지 클릭 시 확대가 되면 좋을 듯.
4. 오라일리 팁 박스 등에 텍스트 넣기.
5. css 리팩터링
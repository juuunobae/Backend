# module
- nodejs에서는 각 파일이 별개의 모듈로 취급된다.

## require
- 모듈을 가지고 오는 함수

# npm 
- node package manager

# CI Continuous Integration(지속적인 통합)
- 성공적으로 구현할 경우 애플리케이션에 대한 새로운 코드 변경사항이 정기적으로 빌드 및 테스트되어 공유 레퍼지토리에 통합되므로 여러 명의 개발자가 동시에 개발과 관련된 코드 작업을 할 경우 서로 충돌할 수 있는 문제를 해결할 수 있다.
## setting
### package.json => "script"
- 프로젝트를 관리하는 스크립트를 넣는 게 일반적이다.
```js

    {
        "engines": {
            "node": "14.16.1",
            // eslint가 node 버전을 인식하지 못할 때 
        },
        "script": {
            "lint": "eslint scr/**/*",
        }
    }

    // commend line 실행
    // npm run lint

```

# yarn
- `npm CLI`와 거의 동일한 역할을 하지만 효과적인 캐싱 때문에 속도가 빠르고 특수한 기능도 있다.

# NodeJS Convention
- 파일이름을 짓는 방식, API에서 error와 result를 처리하는 방식, API 작성 방식
- 
## 파일 이름
- 모두 소문자이여야하고, (_)나 (-)를 사용할 수 있고, .js로 끝나야 한다.

## 함수 형태
## node standard library module api를 호출하는 형태
### Callback Style
- 콜백함수는 파리미터로 error(첫번 째 인자)와 result(두번 째 인자)를 받는다.
### Sync Style
- Sync가 뒤에 붙은 함수들의 경우 tryCatch를 사용해 error handling을 해주어야 한다.
### Promise Style
- await를 해주어야하기 때문에 aysnc function 안에서 사용해야 한다.
- tryCatch를 사용해 error handling을 해주어야 한다.
- node version 11.14.0 전까지는 지원되지 않는다.

# 기본 데이터 구조
## Buffer
- 고정된 길이의 바이트 시퀀스를 나타내는데 사용되는 객체

## Stream
- 바이너리 데이터와 대용량 데이터를 다룰 때 사용하는 데이터 구조
- 대용량 데이터 처리에 특화된 데이터 구조
- 데이터가 흐르는 관 같은 것
- 자유자재로 연결할 수 있는 형태의 데이터 구조

# 내장객체
## __dirname
- 현재 실행되고 있는 파일의 디렉토리 이름이 절대경로 표시되어 진다.
## __filename
- 현재 실행되고 있는 파일의 파일 이름이 절대경로 표시되어 진다.
## process
- 프로그램을 실행했을 때 만들어지는 프로세스 정보들을 다루는 객체
- 표준 입출력을 담당하는 스트림이 연결되어 있다.
- `argv`: argument Vector
  - 프로세스를 실행할 때 전달되는 파라미터 정보
  - 명령줄 인자들이 배열로 들어간다.
  - 명령줄 인자들을 파싱해서 cri 프로그램을 만들 수 있다.

# 스탠다드 라이브러리
- node에 기본적으로 탑재되어 있는 모듈
## OS
- 운영체제에 대한 정보들이 있는 모듈
## FS
- 파일시스템에 접근하는 모듈
- 파일을 다룰 수 있다.
## childe_process
- 자식 프로세스를 생성할 수 있는 모듈
- 노드 프로세스 하나만 실행시켰을 때 생길 수 있는 제약이 있다면 자식 프로세스를 생성해 메모리 공간을 격리 시켜 전혀 다른 프로세스를 사용하기 때문에 동시성 이슈에서 자유로울 수 있다.
- 써드파티 바이너리(외부 모듈) 등을 실행할 때도 유용하게 사용할 수 있다.
## DNS
- 특정 도메인에 대한 정보를 domain name system을 통해 읽어올 수 있는 모듈
## Path
- 경로에 대한 연산을 할 때 사용하는 모듈
## Net
- TCP를 사용한 저수준 소켓 통신을 위한 모듈
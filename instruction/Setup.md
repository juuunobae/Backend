# NodeJS

## tj / n
- node version magager

## package.json
- `npm init -y`로 생성
- 패키지의 메타데이터를 포함하는 파일
- 해당 파일이 있는 폴더에서 작업하는 모든 파일들이 패키지를 위한 것으로 인식하게 한다.
  - 개인 프로젝트라고 할지라도 패키지로 본다.
```js

    {
        // 프로젝트에서 자주 사용하게 되는 script들을 간단하게 사용할 수 있도록 하는 필드
        "scripts": {
            "": "",
        }
    }

```

## .vscode/settings.json
- 해당 폴더의 프로젝트에만 해당하는 setting들을 모아둔 파일

## Formatting
- 코딩 스타일 정의

### Prettier
- `npm i --save-dev prettier`
- vscode plugin `prettier` 설치
```js

    // .prettierrc

    {
        "semi": false,
        "singleQuote": true
    }

```

- `.vscode/settings.json`
```js

    {
        "[javascript]": {
            "editor.formatOnSave": true,
            "editor.defaultFormatter": "esbenp.prettier-vscode",
        }
    }

```

## Linting
- 코딩 문법 정의
### ESLint
- `npm i --save-dev eslint`
```js

    // .eslintrc.js

    module.exports = {
        extends: ["airbnb-base", "plugin:node/recommended","prettier"],
        // eslint와 prettier가 충돌없이 잘 동작하기위해서는 "prettier"가 맨뒤에 작성되어야 한다.
    }

```
- 문법들을 하나하나 따로 정의할 수도 있고, 여러 문법들을 한꺼번에 정리해놓은 플러그인을 사용해도 된다.
- plugin 설치
  - `npm i --save-dev eslint-config-airbnb-base eslint-plugin-import`
  - `npm i --save-dev eslint-plugin-node`

> prettier와 eslint가 충돌하는 걸 방지하기 위해 설치
>   > `npm i --save-dev eslint-config-prettier`

### javascript는 동적으로 타입이 정의된다.
### 변수가 어떤 타입으로 활용될지 미리 알 수가 없기 때문에 미리 에러가 나지 않고 실행되고 나서야 에러가 있는 걸 알게된다.
### 이런 문제를 해결하기 위해 `Typescript`를 사용한다.

# Typescript
- javascript에 type 정의만 얹어놓은 것과 같다.
- `npm i --dave-dev typescript @types/node`
```js

    // @ts-scheck 

```
> `// @ts-check`: 해당 파일에서 typescript를 사용
> typescript를 node에서도 사용될 수 있게 해주는 패키지

## type cheking
- `jsconfig.json`
```js

    {
        "compilerOptions": {
            "strict": true
        },
        "include": []
            "src/**/*"
        ]
    }

```
- `strict`: 엄격하게 타입체크를 할 것인가
  - true: 엄격
  - false: 유연
- `include`: 사용할 파일
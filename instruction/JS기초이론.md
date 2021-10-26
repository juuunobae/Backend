# 자바스크립트의 동시성 모델
- 자바스크립트의 실행 모델은 event loop, call stack, callback queue 개념으로 이루어진다.

## Event Loop
- 여러개의 스레드 사용
- 작성한 코드가 실행되는 스레드를 메인 스레드라고 한다.
- 한 노드 프로세스에서 메인 스레드는 하나이며 한 순간에 한 줄 씩만 실행도니다.
- 그외의 일(file I/O, network)을 하는 워커 스레드는 여럿이 있을 수 있다.

## Call Stack
- 지금 시점까지 불린 함수들의 스텍
- 호출된 함수가 아래부터 위로 차례대로 쌓이고 젤 위에 있는 함수부터 실행된 후 빠져나간다.
  - 함수가 호출될 때 쌓이고 리턴할 때 빠진다.
- 이벤트 루프가 다음 콜백을 처리하려면 지금 처리하고 있는 콜백의 실행이 완전히 끝나야 한다.
  - call stack이 완전히 비면 다음 콜백을 처리한다.

## Callback Queue
- 앞으로 실행할 콜백들을 쌓아두는 큐
- 큐는 선입선출 구조이다.
- 브라우저나 node가 어떤 이벤트가 발생하면 메인 스레드에 이를 알려주기 위해 사용된다.
  - 이벤트는 파일 처리의 완료, 네트워크 작업의 완료, 타이머 호출 등

## Offloading
- 브라우저나 node에서, web API 혹은 Node API의 동작이 끝나면 callback queue에 등록한다.
- 브라우저나 node가 요청 받은 일을 처리하고 있는 동안 메인 스레드와 이벤트 루프는 영향을 받지 않고 계속 실행된다.
  - 브라우저나 node가 요청받은 일들(web API, node API)는 워커 스레드가 처리한다.
- Node 서버의 메인 스레드가 하나임에도 빠르게 동작할 수 았는 이유이다.

# Hoisting
- 변수의 선언만 해당 스코프의 맨 위로 끌어 올리는 것
- 함수도 hoisting이 된다.

# Scope
### binding
- 코드의 어떤 식별자가 실제로  어떤 값이 가리키는지를 결정하는 것을 binding이라고 한다.
- 자바스크립트에서의 binding은 lexical scope를 통해 이루어진다.

## lexical scope
- 안쪽에서 바깥쪽 변수에 접근할 수 있다는 뜻이다.

# Closure
- function + environment
  - environment: 함수 자신을 둘러싼, 접근할 수 있는 모든 스코프를 뜻한다.
- 함수 그 자체와 어떤 함수에 대한 포인터와 그 함수가 실행할 때 필요한 변수(참조하고 있는 변수)들의 합을 환경(environment)이라고 보면된다.
- 함수가 선언될 때마다 하나씩 생긴다.

```js

    function and(x){
        return function(y){
            return x + ' and ' + y;
        }
    }

    const saltAnd = and('salt');
    console.log(saltAnd('pepper')); // salt and pepper
    console.log(saltAnd('sugar')); // salt and sugar
    
    const waterAnd = and('water');
    console.log(waterAnd('juice')) // water and juice

```
- `and` 함수로 만들어진 `saltAnd`의 `Closure`는 
  - 함수: print
  - 환경: x -> 'salt'
- `saltAnd`와 `waterAnd` 모두 함수는 같은 print이지만, 각각 주어진 변수가 다르다.
- `saltAnd`는 x가 `salt`, `waterAnd`는 x가 `water`로 바인딩 되어 있다.
- 즉, 서로 다른 closure를 형성하고 있다.

# Proto Type
- Object의 유전자라고 생각하면 된다.
- 자식 객체들은 부모로 부터 prototype을 
- 무언가를 prototype에 추가하면 해당 Object로 부터 생성된 자식들에서 사용가능
- 추가한 데이터는 부모 Object만 가지고 있고 자식 Object에서 끌어다 쓴다.
```js

  function People() {
    this.eyes = 2;
    this.legs = 2;
  }

  People.prototype.move = 'run';
  // 부모 Object의 prototype에 추가해주면 자식 Object에서 사용 가능하다.

  const person = new People();
  console.log(person) // ▶︎ People {eyes: 2, legs: 2}
  console.log(person.move); // 'run'

```

# 모던 자바스크립트
- 자바스크립트는 빠르게 변화하고 있는 언어이다.
## Ecma international
- 자바스크립트를 포함한 다양한 기술 표준 정립을 목적으로 하는 비영리 단체이다.
### TC39 위원회
- Ecma international의 위원회
- 자바스크립트(ECMAScript) 표준 제정을 담당한다.
## node.green
- Node의 각 버전별로 지원하는 ECMAScript의 기능을 확인할 수 있다.

## let, const
- hoisting 규칙이 없고, block scoping을 지원한다. 
  - var보다 훨씬 예측 가능한 코드를 짤 수 있다.
- 주로 const를 사용하고 필요에 의해 let을 사용하고 var는 절대 쓰지 않는 것이 좋다.

## Spread syntax
- 병합, 구조 분배 할당 등에 다양하게 활용할 수 있다.

### object, array merge
- object를 합친다.
- 기존에 있던 데이터를 덮어 쓸 수 있다.
```js

  const personalData = {
    email: 'abc@def.com',
    password: '****'
  }

  const publicData = {
    nickname: 'foo',
  }

  const overrides = {
    email: 'fff@fff.com',
  }

  const user1  = {
    ...personalData,
    ...publicData,
  }

  const user2  = {
    ...personalData,
    ...publicData,
    ...overrides,
  }

  console.log(user1) // ▶︎ {email: 'abc@def.com', password: '****', nickname: 'foo'}

  console.log(user2) // ▶︎ {email: 'fff@fff.com', password: '****', nickname: 'foo'}

```

### object, array rest
- 나머지 데이터를 저장
```js

  const arr = [1, 2, 3, 4, 5];

  const [a, ...rest] = arr;

  console.log(a, rest); // 1 ▶︎(4) [2, 3, 4, 5]

```

# 비동기 처리
## Promise
- 체이닝 방식으로 비동기 작업을 순차적으로 처리할 때 사용  
```js

  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise')
    }, 1000);
    reject(new Error('error'))
  })
  .then(value => {
    console.log(value); // promise
  })
  .catch(error => {
    console.log(error)
  })

```
- resolve
  - 성공 리턴 값을 .then으로 연결
- reject
  - 실패 리턴 값을 catch로 연결

# Polyfill
- 브라우저나 node.js에서 구현되지 않은 기능을 미리 써 볼 수 있도록 만들어진 구현체
- `npm install core-js`
```js

  require('core-js');
  
```

# transpile
- 코드를 언어에서 언어로 변환하는 작업을 뜻한다.
- 신규 언어 스펙에서 구형 언어 스펙으로 트랜스파일 할 때 주로 사용한다.
- Babel, tsc(Typescript Compiler), ESBuild 등이 있다.
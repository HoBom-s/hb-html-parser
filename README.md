## HoBom FrontEnd Library

> jQuery 라이브러리 중에서 자주 사용하는 Methods만 모아서 JavaScript로 구현
>
> 초기 셋팅 필요 없이 빠르게 HTML 및 JavaScript를 작성할 수 있음
>
> (물론 약간의 초기 셋팅이 필요하긴 하지만...)

아마 예시를 본다면 어렵지 않게 사용이 가능할 것으로 예상

<br />

### 사용 방법

기본적인 사용 방법은 **templates** 폴더의 **index.html** 확인

사용 방법이 어렵지 않기 때문에 **template**폴더의 **index.html** 예시를 본다면 쉽게 사용할 수 있을 것이라고 예상.

---

<br />

## HoBom HTML Parser V2

큰 규모의 Project에 적합한 Framework는 결코 아님. 주로 작은 규모의 Project에 사용하도록 함.

순수 JavaScript로 작성됐기 때문에 속도도 굉장함.

Framework라고 이름을 지은 만큼 명확한 규칙이 있음. 아마 이 부분이 사용하는 데 있어 처음이자 마지막 **러닝커브**일 것 같음.

> V1의 기능을 기반으로 Class 기반 HTML Template Control을 목적으로 했음
>
> 정해진 규칙대로 HTML을 작성하면 HoBom HTML Parser가 HTML의 내용을 Parsing을 진행한 후
>
> **JavaScript Class Template**을 작성해 줌
>
> 굳이 HTML의 내용을 보지 않고 Class 안에서 HTML을 Control하는 것이 주요 목적

<br />

### 사용 방법

```
1. HTML을 아래의 규칙에 맞춰 작성후 [npm start]

2. templates 밑에 class 디렉토리에 빌드 된 파일 확인

3. main.js에서 생성된 class를 인스턴스화
  - new FormGroup();
```

### 1. HTML

아래의 규칙에 따라서 HTML을 작성하도록 함

- **templates** 디렉토리에서 HTML 파일 작성
  - id="root" 이 기준
  - 각각의 data-template-name 은 고유해야 함
- data-template
  - Template의 시작 지점
  - TEMPLATE은 반드시 TEMPLATE 이어야 함 (data-template="TEMPLATE")
- data-group
  - data-template 밑에 Group
  - GROUP은 반드시 GROUP이어야 함 (data-group="GROUP")
- data-list
  - data-group 밑에 List
  - LIST는 반드시 LIST이어야 함 (data-list="LIST")
- data-item

  - data-list 밑에 Item
  - ITEM은 반드시 ITEM이어야 함 (data-item="ITEM")

사용 예시는 아래와 같음.

```html
<div id="root">
  <div data-template="TEMPLATE" data-template-name="FormTemplate">
    <form id="form-group" data-group="GROUP" data-template-name="FormGroup">
      <div data-list="LIST" data-template-name="InputList">
        <input
          type="text"
          name="username"
          data-item="ITEM"
          data-template-name="InputUserNameItem"
        />
        <input
          type="password"
          name="password"
          data-item="ITEM"
          data-template-name="InputUserPasswordItem"
        />
      </div>
    </form>
  </div>
</div>
```

<br />

---

<br />

### 2. JavaScript

정해진 곳에서 본인이 원하는 기능을 넣으면 됨. class가 생성됐을텐데 원하는 class의 constructor **[생성자]** 에서 기능을 작성하면 됨.

예를 들어서 input의 change 이벤트를 바인딩 하고 싶다면 아래와 같이 작성.

```js
export class InputUserNameItemParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "ITEM";
    this.templateName = "InputUserNameItem";
    this.templateNode = this.matchNode("InputUserNameItem");

    // Change Event
    this.templateNode.on("change", (e) => {
      const { value } = e.target;

      console.log(value);
    });
  }
}
```

**V1**의 기능은 HoBomHTMLParserBase에 정의가 돼 있으므로 적절한 시기에 불러와서 사용하면 됨.

위의 예시에서 덧붙이자면,,,

```js
export class InputUserNameItemParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "ITEM";
    this.templateName = "InputUserNameItem";
    this.templateNode = this.matchNode("InputUserNameItem");

    this.$.transport("/api/url", {
      methods: "GET",
      success: function (data) {
        // ...success
      },
      error: function (error) {
        // ...fail
      },
    });
  }
}
```

<br />

---

## HoBom HTML Parser V1

### 1. HTMLElement Selector

```javascript
<div class="temp"></div>
<div id="temp2"></div>

$(".temp");
$("#temp2");
```

### 2. HTMLElement Event Binding

```javascript
<button class="temp-btn">button</button>;

$(".temp-btn").on("click", () => {
  alert("hi");
});
```

### 3. HTMLElement Create

2가지 방법이 있음

1.

```js
$.crate("div");
```

2.

```js
const divElem = $.create("div");

$.createElementFromString(divElem, `<input />`);
```

### 4. API 통신

jQuery의 **ajax**처럼 구현 했음. 그러나 기존의 jQuery의 경우 굳이 사용하지 않는 불필요한 Option이 너무 많았기 때문에 필요한 것만 경량화 하여 구현.

지원되지 않는 브라우저를 고려하여 **XMLHttpRequest**를 사용하여 구현 했음.

```javascript
// transport Method 활용

$.transport("https://fakestoreapi.com/products", {
  methods: "GET",
  success: function (data) {
    const elem = $.create("div");
    data.forEach((v) => {
      const elem = $.create("div");
      $.createElementFromString(elem, `<span>${v.title}</span>`);
      $(".root").append(elem);
    });
  },
  error: function (error) {
    console.log(error);
  },
});
```

### 5. Function Util

Data type이 Object, Array상관 없이 for 반복문 지원.

```javascript
// Like _.each, _.map ...

// Array
$.utils.each([1, 2, 3, 4], (item, idx) => console.log(item, idx));

// Object
const obj = {
  A: "a",
  B: "b",
};
$.utils.each(obj, (key, value) => console.log(key, value));
```

## HoBom FrontEnd Library

> jQuery 라이브러리 중에서 자주 사용하는 Methods만 모아서 JavaScript로 구현
>
> 초기 셋팅 필요 없이 빠르게 HTML 및 JavaScript를 작성할 수 있음

<br />

### 사용 방법

기본적인 사용 방법은 **templates** 폴더의 **index.html** 확인

사용 방법이 어렵지 않기 때문에 **template**폴더의 **index.html** 예시를 본다면 쉽게 사용할 수 있을 것이라고 예상.

---

<br />

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

### 3. API 통신

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

### 4. Function Util

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

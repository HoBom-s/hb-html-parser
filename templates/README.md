# TEMPLATE HTML

> 해당 디렉토리에서 HTML 작업 수행
>
> 정해진 규칙대로 HTML 작업을 수행
>
> **[main.js]** Class Initialize 수행

<br />

## HTML Head

```html
<head>
  <meta charset="UTF-8" />

  <title>Template</title>

  <style></style>

  <script defer type="module" src="main.js"></script>
</head>
```

## HTML Body

```html
<body>
  <!-- For V2 Test -->
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
  <!-- @@@@ V2 @@@@ -->
</body>
```

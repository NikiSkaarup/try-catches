# try-catches

wrapper functions for simpler try catching without extra indentation;


### tryCatch
safely call a synchrous function that might throw

```js
const [data, error] = tryCatch(() => { return "some value"});
```

safely call an asynchrous function that might throw
```js
const [data, error] = await tryCatch(async () => { return "some value"});
```

### tryCatchP

safely returns a promise value

```js
const [data, error] = await tryCatchP(somePromise);
```

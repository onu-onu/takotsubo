(c) onu

Last update: 2024/9/19

# Takotsubo is...
Takotsuboはオクトパスエナジー https://octopusenergy.co.jp/ のGraphQL API を叩くためのラッパークラスを提供するライブラリです。

# Usage
JSとTS両方をサポートしています

## Install
- JS
  - https://github.com/onu-onu/takotsubo/blob/main/takotsubo.js

- TS
  ```
  npm install https://github.com/onu-onu/takotsubo
  ```

## Coding
```js
import { Takotsubo } from "takotsubo";

const main = async () => {
	const takotusbo = new Takotsubo();
    let email = 'xxxx';
    let pass = 'xxxx';
    let id = 'xxxx';
    let startDate = '2024-01-01T00:00:00Z';
    let endDate = '2024-01-31T23:59:59Z';
    try {
        const result = await takotusbo.fetchToken(email, pass);
        let data = await takotusbo.fetchData(result.token, id, startDate, endDate);
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

main();
```


README
===========================
react練習專案，API來源是翻找[GISAID](https://www.gisaid.org/)而來的，這樣是可以的吧？！僅是利用API來練習框架，並無商業用途。
[CodeSandbox](https://sftt4.csb.app/)，codeSandBox是最初版，用的是舊的寫法，Github這有經過整理，增加新功能，也納入了React Hook的用法，但可能有漏網之魚。

## UPDATE
後來GISAID的API有更新過，找不到適合的可以使用，因此最後是有在github找到開源的csv檔，然後用Node.js+express，把它變成需要的API。
沒建server，直接用的是[codesandbox](https://w5q6k.sse.codesandbox.io/)，repository一樣有放在[github](https://github.com/hsuan9522/2019-nCoV-Api)。

## DEMO
[Demo Site](https://hsuan9522.github.io/2019-nCov/)

## Reference
1. [GISAID](https://sftt4.csb.app/)
2. [DXY-COVID-19-Crawler](https://github.com/BlankerL/DXY-COVID-19-Crawler)

## Install & Run
Clone
```
> $ git clone https://github.com/hsuan9522/2019-nCov.git
```

Install
```
> $ npm install / yarn install
```

Run
```
> $ npm run start / yarn start
```

## Build
擇一即可。
```
> $ npm run build / yarn build (這是webpack)
```
```
> $ npm run react-build / yarn react-build (建react專案提供)
```

## 小記
> 如何知道build的檔案由無成功，用的是docker做測試，因為沒有把node包進image裡，需要先build在up。須先有docker和docker-compose。

1. 先build，也就是上面的指令
2. ```> $ docker-compose up```
3. 若是使用react-build的 ```localhost:3000```，build則是 ```localhost:3000/dist```

路徑不同是docker-compose.yml裡面設定的，可以做修改。


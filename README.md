# Playground

## Vercel設定の更新

`src/lib/playgrounds.json` の内容を元に `vercel.json` の rewrite ルールを更新するには、以下のコマンドを実行します。

```bash
npm run update-config
```

このコマンドは `npm run dev` および `npm run build` の実行時にも自動的に実行されます。

# mandara-cnthtml
MANDARAが出力する連続データのHTMLを加工するコンバーター

# 操作手順
1. MANDARAが出力したHTMLファイルを指定箇所にドラッグ＆ドロップする
2. 変換実行
3. 完了したらダウンロード

# 設計
- index.htmlとmapstyle.cssを出力する
- JavaScriptでクライアントサイドで完結
- gulpは、watchとreloadのみ
- seleniumでテストを記載


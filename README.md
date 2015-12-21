# mandara-cnthtml
- MANDARAが出力する連続データのHTMLを加工するコンバーター
- 連続データの変更を地図上に並べる
- 地図の著作権表示

# 操作手順
1. 地図の著作権表示文字列を指定(OpenStreetMapを初期値)
2. MANDARAが出力したHTMLファイルを指定箇所にドラッグ＆ドロップする
3. 変換実行
4. 完了したらダウンロード

# 設計
- index.htmlとmapstyle.cssを出力する
- JavaScriptでクライアントサイドで完結
- gulpは、watchとreloadのみ
- seleniumでテストを記載


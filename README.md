# Todo Application

Todo アプリケーション。Next.js + TypeScript + Firebase で構築。

## デモ

https://portfolio-1458b.web.app

## 機能

- Google アカウントでログイン
- Todo の追加・編集・削除
- 期限管理
- 一括削除機能
- レスポンシブデザイン

## 開発環境のセットアップ

```bash
# パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev

# Storybook の起動
npm run storybook
```

## デプロイ

```bash
# ビルド
npm run build

# Firebase へのデプロイ（Hosting と Firestore）
firebase deploy --only hosting,firestore

# 個別のデプロイ
firebase deploy --only hosting     # Hosting のみ
firebase deploy --only firestore   # Firestore のみ
```

## 技術スタック

- Next.js 14
- TypeScript
- Firebase (Authentication, Firestore)
- Material-UI
- Storybook

## ライセンス

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy Commands

```bash
# Build the Next.js app
npm run build

# Deploy to Firebase (Hosting and Firestore)
firebase deploy --only hosting,firestore

# Deploy specific services
firebase deploy --only hosting  # Deploy only hosting
firebase deploy --only firestore  # Deploy only Firestore rules
```

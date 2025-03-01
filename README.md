# Todo Application

Todo アプリケーション。Next.js + TypeScript + Firebase で構築。

## アーキテクチャ

### レイヤー構成

1. **UI レイヤー** (`src/app`, `src/components/`)

   - ユーザーインターフェース
   - イベントハンドリング
   - `useTodoStore` フックを使用してデータ操作

2. **Store レイヤー** (`src/hooks/useTodoStore.ts`)

   - 状態管理
   - 認証状態に応じたストレージの切り替え
   - LocalStorage/Firebase 操作の抽象化

3. **サービスレイヤー** (`src/services/TodoFirebaseService.ts`)
   - Firebase との通信処理
   - CRUD オペレーション
   - データの永続化

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
npm run sb
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

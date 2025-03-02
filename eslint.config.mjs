import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // 必要に応じて追加の設定をここに記述
  {
    overrides: [
      {
        files: ['*.js', '*.ts'],
        // ここにルールを追加
      }
    ]
  }
];

export default eslintConfig;

import { Card as MuiCard } from "@mui/material";

/**
 * 基本的なカードコンポーネント
 * 汎用的な使用を想定
 */
interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  sx?: any;
}

export const BaseCard = ({
  children,
  onClick,
  selected,
  disabled,
  className,
  sx = {}  // デフォルト値を追加
}: CardProps) => {
  return (
    <MuiCard
      className={className}
      onClick={onClick}
      sx={{
        opacity: disabled ? 0.5 : 1,
        border: selected ? '2px solid primary.main' : 'none',
        ...sx  // 渡されたsxプロパティをマージ
      }}
    >
      {children}
    </MuiCard>
  );
};

export const Card = BaseCard;  // BaseCardをCardとしてエクスポート
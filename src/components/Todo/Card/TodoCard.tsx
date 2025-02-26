/**
 * Todoの表示用カードコンポーネント
 * - 見た目の制御のみを担当
 * - ロジックは持たない
 */
import React from 'react';
import { CardContent } from '@mui/material';
import { Card } from '../../common/Card';
import { StatusCheckBox } from '../../common/CheckBox/index';
import { TodoCardProps } from '../../../types/todo';

const TodoCard = ({
  todo,
  onSelect,
  onEdit,
  onDelete,
  onComplete,
  isBulkDeleteMode
}: TodoCardProps) => {
  return (
    <Card
      selected={todo.selected}
      disabled={isBulkDeleteMode}
      onClick={onSelect}
    >
      <CardContent>
        <StatusCheckBox
          checked={todo.completed}
          onChange={(e) => onComplete(e.target.checked)}
        />
        {/* ... 他のUI要素 ... */}
      </CardContent>
    </Card>
  );
};

export default TodoCard;
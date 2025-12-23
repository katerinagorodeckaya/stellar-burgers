import { FC } from 'react';
import { OrderStatusUI } from '@ui';

export const OrderStatus: FC<{ status: string }> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'done':
        return { text: 'Выполнен', textStyle: '#00CCCC' };
      case 'pending':
        return { text: 'Готовится', textStyle: '#E52B1A' };
      case 'created':
        return { text: 'Создан', textStyle: '#F2F2F3' };
      default:
        return { text: status, textStyle: '#F2F2F3' };
    }
  };

  const config = getStatusConfig();

  return <OrderStatusUI textStyle={config.textStyle} text={config.text} />;
};

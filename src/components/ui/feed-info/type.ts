export type TOrderFeed = {
  _id: string;
  ingredients: string[];
  status: 'created' | 'pending' | 'done' | 'ready';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type FeedInfoUIProps = {
  feed: {
    total: number;
    totalToday: number;
    orders?: TOrderFeed[];
    isLoading?: boolean;
    error?: string | null;
  };
  readyOrders: number[];
  pendingOrders: number[];
};

export type HalfColumnProps = {
  orders: number[];
  title: string;
  textColor?: string;
};

export type TColumnProps = {
  title: string;
  content: number;
};

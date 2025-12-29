import { MenuItem } from '../data/menuItems';

export interface OrderPayloadItem {
  id: number;
  title: string;
  quantity: number;
  options?: string[];
}

export interface OrderPayload {
  items: OrderPayloadItem[];
  comment?: string;
  totalCalories: number;
}

/**
 * Build a compact payload that can be consumed by a future Telegram bot.
 * Items are grouped by id + selected options to preserve option choices.
 */
export const buildOrderPayload = (
  items: (MenuItem & { selectedOptions?: string[] })[],
  comment?: string
): OrderPayload => {
  const grouped = new Map<string, OrderPayloadItem & { calories: number }>();

  items.forEach((item) => {
    const optionsKey = item.selectedOptions?.length
      ? item.selectedOptions.join('|')
      : 'none';
    const key = `${item.id}::${optionsKey}`;

    const existing = grouped.get(key);
    if (existing) {
      existing.quantity += 1;
    } else {
      grouped.set(key, {
        id: item.id,
        title: item.title,
        quantity: 1,
        options: item.selectedOptions,
        calories: item.calories,
      });
    }
  });

  const payloadItems = Array.from(grouped.values()).map(({ calories, ...rest }) => rest);
  const totalCalories = items.reduce((sum, item) => sum + (item.calories || 0), 0);

  return {
    items: payloadItems,
    comment: comment?.trim() || undefined,
    totalCalories,
  };
};


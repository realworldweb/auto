import { Order } from '../types';

const orders = new Map<string, Order>();

export const OrderManager = {
	addOrder: (id: string, order: Order): void => {
		orders.set(id, order);
	},
	getOrder: (id: string): Order | null => orders.get(id) || null,
	getAllOrders: (): Order[] => Array.from(orders.values()),
	removeOrder: (id: string): void => {
		orders.delete(id);
	},
};

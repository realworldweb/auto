import { Trade } from '../types';

const trades = new Map<string, Trade>();

export const TradeManager = {
	addTrade: (id: string, trade: Trade): void => {
		trades.set(id, trade);
	},

	getTrade: (id: string): Trade | null => {
		return trades.get(id) || null;
	},

	getAllTrades: (): Array<Trade> => {
		return Array.from(trades.values());
	},

	removeTrade: (id: string): void => {
		trades.delete(id);
	},
};

import { Auction } from '../types';

const auctions = new Map<string, Auction>();

export const AuctionManager = {
	addAuction: (id: string, auction: Auction): void => {
		auctions.set(id, auction);
	},

	getAuction: (id: string): Auction | null => auctions.get(id) || null,

	getAllAuctions: (): Array<Auction> => Array.from(auctions.values()),

	removeAuction: (id: string): void => {
		auctions.delete(id);
	},
};

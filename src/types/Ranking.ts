export interface RankingEntry {
  position: number;
  driverName: string | null; // null cuando es anónimo
  monthlyDeliveries: number;
  isCurrentUser: boolean;
}

export interface RankingResponse {
  currentMonth: string;
  entries: RankingEntry[];
  userPosition: number;
}

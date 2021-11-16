
import HistoryAttempt from "./HistoryAttempt";

export default interface LoadGameResponse {
  id: string;
  name: string;
  tries: number;
  history: HistoryAttempt[];
}

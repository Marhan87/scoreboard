export interface User {
    _id: number,
    name: string,
}
export interface Score {
    userId: number,
    score: number,
}

export interface UserAndScore {
  name: string;
  score: number;
}
export interface Usersdata {
  data: Array<Info>;
  total: number;
}


export interface Info {
    username: string;
    password: string;
    email: string;
    id: number;
}
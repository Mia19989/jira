export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
  identity?: string;
}

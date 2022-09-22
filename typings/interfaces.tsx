export interface ILoaderProps {
  show?: boolean;
}

export interface IButtonProps {
  text: string;
  handleClick?: () => void;
  width: number;
  height: number;
  bgColor?: string;
  color?: string;
  borderRadius?: number;
}

export interface IUser {
  createdAt: number;
  displayName: string;
  photoURL: string;
  uid: string;
  username: string;
  email: string;
}

export interface IPost {
  content: string;
  createdAt: number;
  heartCount: number;
  published: boolean;
  slug: string;
  title: string;
  uid: string;
  username: string;
  updatedAt: number;
}

export interface IProfileProps {
  user: IUser;
  posts: IPost[];
}

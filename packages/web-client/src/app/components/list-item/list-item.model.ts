export interface ListItem {
  accessedAt: Date;
  checked?: boolean;
  children?: ListItem[];
  createdAt: Date;
  extension: string;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
  name: string;
  path: string;
  size: number;
  updatedAt: Date;
}

export interface ListItem {
  checked?: boolean;
  children: ListItem[];
  extension: string;
  name: string;
  path: string;
  size: number;
  type: 'file' | 'directory';
}

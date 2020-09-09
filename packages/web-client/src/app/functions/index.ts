import { ListItem } from 'src/app/components/list-item/list-item.model';

export function getFilesListFrom(filesService): Promise<ListItem[]> {
  return filesService.find()
    .then((files: string[]): ListItem[] => files.map(file => ({
      name: file,
      checked: false,
      type: 'file'
    })));
}

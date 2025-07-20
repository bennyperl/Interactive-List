const ITEM_COUNT = 5;

export interface ListItemData {
  id: string;
  value: string;
}

const generateMockItems = (): ListItemData[] => {
  const items: ListItemData[] = [];
  const prefixes = [
    'Task', 'Item', 'Note', 'Entry', 'Record', 'Element', 'Component', 'Feature', 'Bug', 'Enhancement',
    'Document', 'File', 'Project', 'Module', 'Function', 'Class', 'Interface', 'Service', 'Utility', 'Helper'
  ];
  
  for (let i = 1; i <= ITEM_COUNT; i++) {
    const prefix = prefixes[i % prefixes.length];
    items.push({
      id: i.toString(),
      value: `${prefix} #${i} - ${Math.random().toString(36).substring(7)}`
    });
  }
  
  return items;
};

export const mockItems: ListItemData[] = generateMockItems(); 
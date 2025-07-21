export const messages = {
  // InteractiveList component
  title: 'Interactive List',
  readOnlyButton: {
    editable: 'Editable',
    readOnly: 'Read Only'
  },
  readOnlyIndicator: 'Read Only Mode - Items cannot be added, edited, or deleted',
  errorIndicator: '⚠️ Error State - Something went wrong',
  
  // InputBar component
  inputPlaceholder: 'Add new item...',
  readOnlyPlaceholder: 'Read-only mode - cannot add items',
  addButtonTitle: 'Add item',
  
  // EmptyState component
  emptyState: {
    title: {
      editable: 'No Items Yet',
      readOnly: 'No Items Available'
    },
    description: {
      editable: 'Start by adding your first item using the input field above.',
      readOnly: 'There are no items to display in read-only mode.'
    }
  },
  
  // ListItem component
  listItem: {
    editInputPlaceholder: 'Edit item...',
    deleteConfirmation: (itemValue: string) => 
      `Are you sure you want to delete "${itemValue}"?`
  },
  
  // Stats
  stats: {
    items: 'Items',
    status: 'Status',
    total: 'Total',
    loadingStatus: '...',
    readyStatus: '✓'
  },
  
  // Error messages
  errors: {
    addItemFailed: 'Failed to add item:',
    general: 'Something went wrong'
  }
}; 
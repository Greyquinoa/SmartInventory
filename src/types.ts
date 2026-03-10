export interface Item {
  id: string;
  name: string;
  description: string;
  quantity: number;
  category: string;
  imageUrl?: string;
  barcode?: string;
}

export interface Box {
  id: string;
  name: string;
  items: Item[];
  qrCode?: string;
}

export type Screen = 'HOME' | 'SCAN' | 'SEARCH' | 'BOX_DETAILS' | 'ADD_ITEM' | 'EDIT_ITEM' | 'PROFILE' | 'BOXES' | 'SETTINGS' | 'HELP' | 'JOIN_HOUSE' | 'FEEDBACK' | 'ADMIN_FEEDBACK';

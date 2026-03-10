/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Search, 
  Plus, 
  Package, 
  User, 
  Settings, 
  Bell, 
  QrCode, 
  ArrowLeft, 
  X, 
  ShoppingBag, 
  ArrowDownLeft, 
  Utensils,
  CreditCard,
  Wallet,
  Trash2,
  Edit2,
  LogOut,
  LogIn,
  Camera,
  RotateCcw,
  Minus,
  PackageMinus,
  HelpCircle,
  MessageSquare,
  Shield
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { motion, AnimatePresence } from 'motion/react';
import { Screen, Box, Item } from './types';

type Language = 'en' | 'mr';

const translations = {
  en: {
    welcome: 'Welcome back',
    searchPlaceholder: 'Search your boxes...',
    quickScan: 'Quick Scan',
    myBoxes: 'My Boxes',
    appSettings: 'App Settings',
    sendFeedback: 'Send Feedback',
    adminPanel: 'Admin Panel',
    disconnectHouse: 'Disconnect House',
    connectHouse: 'Connect House ID',
    addNewBox: 'Add New Box',
    addNewItem: 'Add New Item',
    saveChanges: 'Save Changes',
    delete: 'Delete',
    quantity: 'Quantity',
    description: 'Description',
    name: 'Name',
    scanQr: 'Scan QR Code',
    darkMode: 'Dark Mode',
    language: 'Language',
    home: 'Home',
    search: 'Search',
    boxes: 'Boxes',
    profile: 'Profile',
    houseProfile: 'House Profile',
    connectedSyncing: 'Connected & Syncing',
    guestMode: 'Guest Mode',
    connectToSync: 'Connect to House ID to sync',
    helpSharing: 'Help & Sharing',
    sharingWithOthers: 'Sharing with others',
    usingMultipleDevices: 'Using multiple devices',
    houseIdSync: 'House ID Sync',
    qrCodeLabels: 'QR Code Labels',
    connectedHouse: 'Connected House',
    preferences: 'Preferences',
    pushNotifications: 'Push Notifications',
    comingSoon: 'Coming Soon',
    backToProfile: 'Back to Profile',
    submitFeedback: 'Submit Feedback',
    feedbackPlaceholder: 'Tell us what you think...',
    feedbackSuccess: 'Thank you for your feedback!',
    feedbackError: 'Failed to send feedback. Please try again.',
    loadingInventory: 'Loading your inventory...',
    justAMoment: 'Just a moment while we sync your data.',
    noBoxesYet: 'No boxes found',
    createFirstBox: 'Create your first box to start tracking.',
    itemsCount: 'items',
    editBox: 'Edit Box',
    boxName: 'Box Name',
    boxDescription: 'Box Description',
    boxItems: 'Box Items',
    noItemsInBox: 'No items in this box yet',
    addItemToStart: 'Add an item to start tracking.',
    editItem: 'Edit Item',
    itemName: 'Item Name',
    itemDescription: 'Item Description',
    itemQuantity: 'Item Quantity',
    itemImage: 'Item Image URL',
    scanToFind: 'Scan a QR code to find a box or item',
    scanSuccess: 'Scan successful!',
    scanError: 'Scan failed. Please try again.',
    adminFeedback: 'Admin: User Feedback',
    adminHouses: 'Admin: Houses',
    loadingData: 'Loading data...',
    noFeedbackYet: 'No feedback received yet.',
    noHousesYet: 'No houses created yet.',
    created: 'Created',
    feedbackTab: 'Feedback',
    housesTab: 'Houses',
    scanBox: 'Scan Box',
    scanQrOrId: 'Scan QR or enter ID',
    connectHouseFirst: 'Connect House ID first',
    recentSearches: 'Recent Searches',
    quickActions: 'Quick Actions',
    addBox: 'Add Box',
    viewInventory: 'View Inventory',
    needHelp: 'Need Help?',
    contactSupport: 'Contact Support',
    joinOrCreate: 'Join or Create',
    enterUniqueId: 'Enter a unique House ID to sync your inventory with everyone in your home.',
    howItWorks: 'How it works',
    firstUserCreates: 'First user creates a unique ID',
    othersJoin: 'Others join using the same ID',
    allDataSyncs: 'All data syncs instantly',
    houseNotFound: 'House Not Found',
    houseIdDoesntExist: 'The House ID "{houseId}" doesn\'t exist. Would you like to create it?',
    yesCreateNew: 'Yes, Create New House',
    noCheckId: 'No, Check ID',
    newBoxPrompt: 'New Box?',
    createEntryFor: 'Create a new entry for "{id}"?',
    yesCreateBox: 'Yes, Create Box',
    noCancel: 'No, Cancel',
    restartScanner: 'Restart Scanner',
    manualEntry: 'Manual Entry',
    boxNameOrId: 'Box Name or ID',
    go: 'Go',
    searchResults: 'Search Results',
    noItemsFound: 'No items found for "{query}"',
    recentlySearched: 'Recently Searched',
    quickPack: 'Quick Pack',
    quickUnpack: 'Quick Unpack',
    pack: 'Pack',
    unpack: 'Unpack',
    scanToAddItem: 'Scan to add item',
    scanToRemoveItem: 'Scan to remove item',
    deletePermanently: 'Delete Permanently',
    capturePhoto: 'Capture Item Photo',
    alignItemInSquare: 'Align item in the square',
    takePhoto: 'Take Photo',
    uploadFromGallery: 'Upload from Gallery',
    optimizedForSquare: 'Optimized for square fit',
    scanBarcode: 'Scan Barcode',
    enterItemName: 'Enter item name',
    enterDescription: 'Enter description',
    enterQuantity: 'Enter quantity',
    pointCameraAtBarcode: 'Point your camera at a barcode or QR code',
    syncAcrossDevices: 'Sync Across Devices',
    connectToHouseToSave: 'Connect to a House ID to save your data securely and access it from any phone or computer.',
    smartInventory: 'by Anirudh',
    keepTrackOfEveryBox: 'Keep track of |every box| you pack.',
    easiestWayToManage: 'The easiest way to manage your moving or storage inventory with QR codes.',
    houseIdMinLength: 'House ID must be at least 3 characters',
    failedToJoin: 'Failed to join house',
    failedToCreate: 'Failed to create house',
    connecting: 'Connecting...',
    connectToHouse: 'Connect to House',
    newBox: 'New Box',
    adminPanelTitle: 'Admin Panel',
    feedback: 'Feedback',
    houses: 'Houses',
    house: 'House',
    houseId: 'House ID',
    createdDate: 'Created',
    deleteHouseConfirm: 'Are you sure you want to delete house "{id}"? This will delete all its boxes and items.',
    publicPreviewLink: 'Public Preview Link',
    devLinkNote: 'Note: The "dev" link only works for you because it\'s tied to your developer account.',
  },
  mr: {
    welcome: 'परत स्वागत आहे',
    searchPlaceholder: 'तुमचे खोके शोधा...',
    quickScan: 'त्वरित स्कॅन',
    myBoxes: 'माझे खोके',
    appSettings: 'ॲप सेटिंग्ज',
    sendFeedback: 'अभिप्राय पाठवा',
    adminPanel: 'ॲडमिन पॅनेल',
    disconnectHouse: 'घर डिस्कनेक्ट करा',
    connectHouse: 'घर आयडी कनेक्ट करा',
    addNewBox: 'नवीन खोका जोडा',
    addNewItem: 'नवीन वस्तू जोडा',
    saveChanges: 'बदल जतन करा',
    delete: 'हटवा',
    quantity: 'प्रमाण',
    description: 'वर्णन',
    name: 'नाव',
    scanQr: 'QR कोड स्कॅन करा',
    darkMode: 'डार्क मोड',
    language: 'भाषा',
    home: 'मुख्यपृष्ठ',
    search: 'शोधा',
    boxes: 'खोके',
    profile: 'प्रोफाइल',
    houseProfile: 'घर प्रोफाइल',
    connectedSyncing: 'कनेक्ट केलेले आणि सिंक होत आहे',
    guestMode: 'पाहुणे मोड',
    connectToSync: 'सिंक करण्यासाठी घर आयडी कनेक्ट करा',
    helpSharing: 'मदत आणि शेअरिंग',
    sharingWithOthers: 'इतरांशी शेअर करणे',
    usingMultipleDevices: 'अनेक उपकरणे वापरणे',
    houseIdSync: 'घर आयडी सिंक',
    qrCodeLabels: 'QR कोड लेबल्स',
    connectedHouse: 'कनेक्ट केलेले घर',
    preferences: 'पसंती',
    pushNotifications: 'पुश नोटिफिकेशन्स',
    comingSoon: 'लवकरच येत आहे',
    backToProfile: 'प्रोफाइलवर परत जा',
    submitFeedback: 'अभिप्राय सबमिट करा',
    feedbackPlaceholder: 'तुम्हाला काय वाटते ते आम्हाला सांगा...',
    feedbackSuccess: 'तुमच्या अभिप्रायाबद्दल धन्यवाद!',
    feedbackError: 'अभिप्राय पाठवण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    loadingInventory: 'तुमची इन्व्हेंटरी लोड होत आहे...',
    justAMoment: 'आम्ही तुमचा डेटा सिंक करत असताना थोडा वेळ थांबा.',
    noBoxesYet: 'कोणतेही खोके सापडले नाहीत',
    createFirstBox: 'ट्रॅकिंग सुरू करण्यासाठी तुमचा पहिला खोका तयार करा.',
    itemsCount: 'वस्तू',
    editBox: 'खोका संपादित करा',
    boxName: 'खोक्याचे नाव',
    boxDescription: 'खोक्याचे वर्णन',
    boxItems: 'खोक्यातील वस्तू',
    noItemsInBox: 'या खोक्यात अद्याप कोणतीही वस्तू नाही',
    addItemToStart: 'ट्रॅकिंग सुरू करण्यासाठी एक वस्तू जोडा.',
    editItem: 'वस्तू संपादित करा',
    itemName: 'वस्तूचे नाव',
    itemDescription: 'वस्तूचे वर्णन',
    itemQuantity: 'वस्तूचे प्रमाण',
    itemImage: 'वस्तूची प्रतिमा URL',
    scanToFind: 'खोका किंवा वस्तू शोधण्यासाठी QR कोड स्कॅन करा',
    scanSuccess: 'स्कॅन यशस्वी!',
    scanError: 'स्कॅन अयशस्वी. कृपया पुन्हा प्रयत्न करा.',
    adminFeedback: 'ॲडमिन: वापरकर्ता अभिप्राय',
    adminHouses: 'ॲडमिन: घरे',
    loadingData: 'डेटा लोड होत आहे...',
    noFeedbackYet: 'अद्याप कोणताही अभिप्राय मिळालेला नाही.',
    noHousesYet: 'अद्याप कोणतीही घरे तयार केलेली नाहीत.',
    created: 'तयार केले',
    feedbackTab: 'अभिप्राय',
    housesTab: 'घरे',
    scanBox: 'खोका स्कॅन करा',
    scanQrOrId: 'QR स्कॅन करा किंवा ID प्रविष्ट करा',
    connectHouseFirst: 'प्रथम घर आयडी कनेक्ट करा',
    recentSearches: 'अलीकडील शोध',
    quickActions: 'त्वरित कृती',
    addBox: 'खोका जोडा',
    viewInventory: 'इन्व्हेंटरी पहा',
    needHelp: 'मदत हवी आहे?',
    contactSupport: 'सपोर्टशी संपर्क साधा',
    joinOrCreate: 'सामील व्हा किंवा तयार करा',
    enterUniqueId: 'तुमची इन्व्हेंटरी तुमच्या घरातील प्रत्येकासह सिंक करण्यासाठी एक अद्वितीय घर आयडी प्रविष्ट करा.',
    howItWorks: 'हे कसे कार्य करते',
    firstUserCreates: 'पहिला वापरकर्ता एक अद्वितीय आयडी तयार करतो',
    othersJoin: 'इतर समान आयडी वापरून सामील होतात',
    allDataSyncs: 'सर्व डेटा त्वरित सिंक होतो',
    houseNotFound: 'घर सापडले नाही',
    houseIdDoesntExist: 'घर आयडी "{houseId}" अस्तित्वात नाही. आपण तो तयार करू इच्छिता?',
    yesCreateNew: 'होय, नवीन घर तयार करा',
    noCheckId: 'नाही, आयडी तपासा',
    newBoxPrompt: 'नवीन खोका?',
    createEntryFor: '"{id}" साठी नवीन नोंद तयार करायची?',
    yesCreateBox: 'होय, खोका तयार करा',
    noCancel: 'नाही, रद्द करा',
    restartScanner: 'स्कॅनर रीस्टार्ट करा',
    manualEntry: 'मॅन्युअल नोंद',
    boxNameOrId: 'खोक्याचे नाव किंवा आयडी',
    go: 'जा',
    searchResults: 'शोध निकाल',
    noItemsFound: '"{query}" साठी कोणतीही वस्तू सापडली नाही',
    recentlySearched: 'अलीकडे शोधलेले',
    quickPack: 'त्वरित भरा',
    quickUnpack: 'त्वरित रिकामे करा',
    pack: 'भरा',
    unpack: 'रिकामे करा',
    scanToAddItem: 'वस्तू जोडण्यासाठी स्कॅन करा',
    scanToRemoveItem: 'वस्तू काढण्यासाठी स्कॅन करा',
    deletePermanently: 'कायमचे हटवा',
    capturePhoto: 'वस्तूचा फोटो काढा',
    alignItemInSquare: 'वस्तू चौकोनात सरळ करा',
    takePhoto: 'फोटो काढा',
    uploadFromGallery: 'गॅलरीमधून अपलोड करा',
    optimizedForSquare: 'चौकोनी फिटसाठी ऑप्टिमाइझ केलेले',
    scanBarcode: 'बारकोड स्कॅन करा',
    enterItemName: 'वस्तूचे नाव प्रविष्ट करा',
    enterDescription: 'वर्णन प्रविष्ट करा',
    enterQuantity: 'प्रमाण प्रविष्ट करा',
    pointCameraAtBarcode: 'तुमचा कॅमेरा बारकोड किंवा QR कोडवर धरा',
    syncAcrossDevices: 'सर्व उपकरणांवर सिंक करा',
    connectToHouseToSave: 'तुमचा डेटा सुरक्षितपणे जतन करण्यासाठी आणि कोणत्याही फोन किंवा संगणकावरून त्यात प्रवेश करण्यासाठी घर आयडीशी कनेक्ट करा.',
    smartInventory: 'by Anirudh',
    keepTrackOfEveryBox: 'तुम्ही भरलेल्या |प्रत्येक खोक्याचा| मागोवा ठेवा.',
    easiestWayToManage: 'QR कोडसह तुमची हलणारी किंवा साठवणूक इन्व्हेंटरी व्यवस्थापित करण्याचा सर्वात सोपा मार्ग.',
    publicPreviewLink: 'सार्वजनिक पूर्वावलोकन लिंक',
    devLinkNote: 'टीप: "dev" लिंक फक्त तुमच्यासाठी कार्य करते कारण ती तुमच्या डेव्हलपर खात्याशी जोडलेली आहे.',
    houseIdMinLength: 'घर आयडी किमान ३ अक्षरांचा असावा',
    failedToJoin: 'घरात सामील होण्यात अयशस्वी',
    failedToCreate: 'घर तयार करण्यात अयशस्वी',
    connecting: 'कनेक्ट होत आहे...',
    connectToHouse: 'घराशी कनेक्ट करा',
    newBox: 'नवीन बॉक्स',
    adminPanelTitle: 'ॲडमिन पॅनेल',
    feedback: 'अभिप्राय',
    houses: 'घरे',
    house: 'घर',
    houseId: 'घर आयडी',
    createdDate: 'तयार केले',
    deleteHouseConfirm: 'तुम्हाला खात्री आहे की तुम्ही "{id}" घर हटवू इच्छिता? यामुळे त्याचे सर्व बॉक्स आणि वस्तू हटवल्या जातील.',
  }
};

const useTranslation = (lang: Language) => {
  return (key: keyof typeof translations['en'], params?: Record<string, string>) => {
    let text = translations[lang][key] || translations['en'][key];
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }
    return text;
  };
};

// Mock Data
const INITIAL_BOXES: Box[] = [
  {
    id: '1',
    name: 'Sample BOX',
    items: [
      { id: 'i1', name: 'Books', description: 'Novels and textbooks', quantity: 3, category: 'Media' },
      { id: 'i2', name: 'Clothes', description: 'Winter sweaters', quantity: 5, category: 'Apparel' },
      { id: 'i3', name: 'Electronics', description: 'Cables and chargers', quantity: 2, category: 'Tech' },
      { id: 'i4', name: 'Kitchenware', description: 'Plates and bowls', quantity: 10, category: 'Kitchen' },
    ]
  }
];

const RECENT_SEARCHES = ['Winter Clothes', 'Books', 'Kitchenware', 'Electronics'];

// --- Screen Components (Defined outside to prevent focus loss) ---

const BoxTrackerHomeScreen = ({ onNavigate, houseId, language }: { onNavigate: (s: Screen, state?: any) => void, houseId: string | null, language: Language }) => {
  const t = useTranslation(language);
  const heroTextParts = t('keepTrackOfEveryBox').split('|');

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-6 py-8 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-100 dark:shadow-none">
            <Package size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">SMART INVENTORY</h1>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t('smartInventory')}</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('PROFILE')} 
          className="size-12 flex items-center justify-center rounded-2xl bg-white/40 dark:bg-slate-800/40 backdrop-blur-md text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-700/60 transition-colors border border-white/20 dark:border-slate-700/50"
        >
          <User size={24} />
        </button>
      </header>

      <main className="flex-1 px-6 py-10 space-y-10 pb-32 overflow-y-auto">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
            {heroTextParts.length === 3 ? (
              <>
                {heroTextParts[0]}
                <span className="text-emerald-600">{heroTextParts[1]}</span>
                {heroTextParts[2]}
              </>
            ) : (
              t('keepTrackOfEveryBox')
            )}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-xs mx-auto">
            {t('easiestWayToManage')}
          </p>
        </section>

        {/* Main Actions */}
        <div className="grid gap-4">
          <button 
            onClick={() => houseId ? onNavigate('SCAN') : onNavigate('JOIN_HOUSE')}
            className={`group relative overflow-hidden w-full p-6 rounded-3xl font-bold transition-all flex items-center justify-between ${houseId ? 'bg-emerald-600/90 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-100 dark:shadow-none backdrop-blur-sm' : 'bg-white/20 dark:bg-slate-800/20 text-slate-400 dark:text-slate-600 cursor-not-allowed backdrop-blur-sm border border-white/10 dark:border-slate-800/30'}`}
          >
            <div className="text-left">
              <span className="block text-xl">{t('scanBox')}</span>
              <span className={`${houseId ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-600'} text-sm font-normal`}>
                {houseId ? t('scanQrOrId') : t('connectHouseFirst')}
              </span>
            </div>
            <div className={`size-12 rounded-2xl flex items-center justify-center transition-transform ${houseId ? 'bg-white/20 group-hover:scale-110' : 'bg-slate-200/50 dark:bg-slate-700/50'}`}>
              <QrCode size={28} />
            </div>
          </button>

          <button 
            onClick={() => houseId ? onNavigate('BOXES') : onNavigate('JOIN_HOUSE')}
            className={`w-full p-6 rounded-3xl font-bold transition-all border flex items-center justify-between shadow-sm backdrop-blur-md ${houseId ? 'bg-white/40 dark:bg-slate-900/40 hover:bg-white/60 dark:hover:bg-slate-800/60 text-slate-900 dark:text-white border-white/20 dark:border-slate-800/50' : 'bg-white/10 dark:bg-slate-900/10 text-slate-300 dark:text-slate-700 border-white/10 dark:border-slate-800/30 cursor-not-allowed'}`}
          >
            <div className="text-left">
              <span className="block text-xl">{t('myBoxes')}</span>
              <span className={`${houseId ? 'text-slate-500 dark:text-slate-400' : 'text-slate-300 dark:text-slate-700'} text-sm font-normal`}>
                {houseId ? t('viewInventory') : t('connectHouseFirst')}
              </span>
            </div>
            <div className={`size-12 rounded-2xl flex items-center justify-center ${houseId ? 'bg-white/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400' : 'bg-white/10 dark:bg-slate-800/10 text-slate-300 dark:text-slate-700'}`}>
              <Package size={28} />
            </div>
          </button>
        </div>

        {/* Login / Sync Section */}
        {!houseId && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-white/20 dark:border-slate-800/50 shadow-sm space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('syncAcrossDevices')}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {t('connectToHouseToSave')}
              </p>
            </div>
            <button 
              onClick={() => onNavigate('JOIN_HOUSE')}
              className="w-full bg-slate-900/90 dark:bg-emerald-600/90 hover:bg-slate-900 dark:hover:bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95 backdrop-blur-sm"
            >
              <LogIn size={20} />
              {t('connectHouse')}
            </button>
            <p className="text-[10px] text-center text-slate-400 uppercase tracking-widest font-bold">
              Secure • Private • Shared
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

const ScanScreen = ({ 
  onNavigate, 
  manualId, 
  setManualId, 
  handleScan, 
  showCreatePrompt, 
  setShowCreatePrompt, 
  createNewBox,
  scannedId,
  language
}: { 
  onNavigate: (s: Screen, state?: any) => void,
  manualId: string,
  setManualId: (s: string) => void,
  handleScan: (id?: string) => void,
  showCreatePrompt: boolean,
  setShowCreatePrompt: (b: boolean) => void,
  createNewBox: () => void,
  scannedId: string | null,
  language: Language
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const t = useTranslation(language);

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    if (isScanning) {
      html5QrCode = new Html5Qrcode("qr-reader");
      
      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleScan(decodedText);
          setIsScanning(false);
        },
        () => {}
      ).catch(err => {
        console.error("Unable to start scanning", err);
        setIsScanning(false);
      });
    }

    return () => {
      if (html5QrCode) {
        if (html5QrCode.isScanning) {
          html5QrCode.stop().catch(err => console.error("Failed to stop scanner", err));
        }
      }
    };
  }, [isScanning]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('HOME')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <X size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('scanQr')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 flex flex-col items-center px-8">
        <div className="w-full aspect-square max-w-[320px] bg-black rounded-3xl flex items-center justify-center relative overflow-hidden mb-8 shadow-2xl border-4 border-white/20">
          <div id="qr-reader" className="w-full h-full"></div>
          
          <div className="absolute inset-0 border-2 border-emerald-500/30 rounded-3xl pointer-events-none z-10"></div>
          
          {isScanning && (
            <motion.div 
              animate={{ top: ['10%', '90%', '10%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute left-[10%] right-[10%] h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-30"
            />
          )}

          {!isScanning && !showCreatePrompt && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 backdrop-blur-sm z-40">
              <button 
                onClick={() => setIsScanning(true)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
              >
                <QrCode size={20} />
                {t('restartScanner')}
              </button>
            </div>
          )}
        </div>

        <div className="w-full space-y-4">
          <p className="text-slate-500 text-sm text-center px-4">
            {t('scanToFind')}
          </p>
          
          <div className="pt-6 border-t border-white/10 dark:border-slate-800/50">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('manualEntry')}</label>
            </div>
            <div className="flex gap-2">
              <input 
                className="flex-1 h-12 px-4 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white text-sm" 
                placeholder={t('boxNameOrId')} 
                type="text"
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
              />
              <button 
                onClick={() => handleScan()}
                className="px-6 bg-slate-900/90 dark:bg-emerald-600/90 text-white rounded-xl font-bold text-sm active:scale-95 transition-all backdrop-blur-sm"
              >
                {t('go')}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Create Prompt Modal */}
      <AnimatePresence>
        {showCreatePrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCreatePrompt(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20 dark:border-slate-800/50"
            >
              <div className="size-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('newBoxPrompt')}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                {t('createEntryFor', { id: manualId || scannedId || '' })}
              </p>
              <div className="space-y-3">
                <button 
                  onClick={createNewBox}
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none"
                >
                  {t('yesCreateBox')}
                </button>
                <button 
                  onClick={() => setShowCreatePrompt(false)}
                  className="w-full bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 py-3.5 rounded-xl font-bold border border-white/20 dark:border-slate-700/50"
                >
                  {t('noCancel')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchScreen = ({ 
  onNavigate, 
  searchQuery, 
  setSearchQuery,
  boxes,
  setSelectedBoxId,
  recentSearches,
  onSearch,
  language
}: { 
  onNavigate: (s: Screen, state?: any) => void, 
  searchQuery: string, 
  setSearchQuery: (s: string) => void,
  boxes: Box[],
  setSelectedBoxId: (id: string) => void,
  recentSearches: string[],
  onSearch: (term: string) => void,
  language: Language
}) => {
  const t = useTranslation(language);
  const filteredItems = searchQuery.trim() === '' ? [] : boxes.flatMap(box => 
    box.items
      .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(item => ({ ...item, boxName: box.name, boxId: box.id }))
  );

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('HOME')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('search')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 overflow-y-auto pb-32">
        <div className="relative flex items-center mb-8 pt-6">
          <div className="absolute left-4 text-emerald-600 z-10">
            <Search size={20} />
          </div>
          <input 
            autoFocus
            className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-emerald-600/50 shadow-sm" 
            placeholder={t('searchPlaceholder')} 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                onSearch(searchQuery.trim());
              }
            }}
          />
        </div>

        {searchQuery.trim() !== '' ? (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('searchResults')}</h2>
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => {
                      onSearch(searchQuery.trim());
                      onNavigate('BOX_DETAILS', { selectedBoxId: item.boxId });
                    }}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 active:bg-white/60 dark:active:bg-slate-800/60 transition-all shadow-sm"
                  >
                    <div className="size-12 rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-sm flex items-center justify-center text-emerald-600 overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <ShoppingBag size={24} />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        In {item.boxName} • {item.quantity} units
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 dark:text-slate-500">{t('noItemsFound', { query: searchQuery })}</p>
              </div>
            )}
          </div>
        ) : (
          <>
            {recentSearches.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{t('recentlySearched')}</h2>
                <div className="space-y-4">
                  {recentSearches.map((term, i) => (
                    <button 
                      key={i} 
                      className="w-full flex items-center gap-4 group"
                      onClick={() => setSearchQuery(term)}
                    >
                      <div className="size-12 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 flex items-center justify-center text-slate-900 dark:text-white group-active:bg-white/60 dark:group-active:bg-slate-800/60 transition-all shadow-sm">
                        <Search size={20} />
                      </div>
                      <span className="text-base font-medium text-slate-700 dark:text-slate-300">{term}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const BoxDetailsScreen = ({ 
  onNavigate, 
  selectedBox, 
  deleteBox,
  onEditItem,
  onDeleteItem,
  onQuickAdd,
  onQuickRemove,
  language
}: { 
  onNavigate: (s: Screen, state?: any) => void, 
  selectedBox: Box, 
  deleteBox: (id: string) => void,
  onEditItem: (item: Item) => void,
  onDeleteItem: (id: string) => void,
  onQuickAdd: (item: Item) => void,
  onQuickRemove: (barcode: string) => void,
  language: Language
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'ADD' | 'REMOVE'>('ADD');
  const [scanError, setScanError] = useState<string | null>(null);
  const t = useTranslation(language);

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    if (isScanning) {
      html5QrCode = new Html5Qrcode("box-barcode-reader");
      
      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.0
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          setIsScanning(false);
          
          if (scanMode === 'REMOVE') {
            onQuickRemove(decodedText);
            return;
          }

          const newItem: Item = {
            id: `item-${Date.now()}`,
            name: decodedText,
            description: '',
            quantity: 1,
            category: 'General',
            barcode: decodedText
          };

          // Try to fetch product details
          try {
            const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`);
            if (res.ok) {
              const data = await res.json();
              if (data.status === 1 && data.product.product_name) {
                newItem.name = data.product.product_name;
                newItem.description = data.product.brands || '';
                newItem.imageUrl = data.product.image_url;
              }
            }
          } catch (err) {
            console.error("Failed to fetch product details", err);
          }

          onQuickAdd(newItem);
        },
        () => {}
      ).catch(err => {
        console.error("Unable to start scanning", err);
        setScanError(t('scanError'));
        setIsScanning(false);
      });
    }

    return () => {
      if (html5QrCode) {
        if (html5QrCode.isScanning) {
          html5QrCode.stop().catch(err => console.error("Failed to stop scanner", err));
        }
      }
    };
  }, [isScanning, scanMode]);

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('BOXES')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{selectedBox.name}</h1>
        <button 
          onClick={() => setShowDeleteConfirm(true)}
          className="size-10 flex items-center justify-center text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 rounded-full transition-colors backdrop-blur-sm"
        >
          <X size={24} />
        </button>
      </header>

      <main className="flex-1 px-6 pb-32">
        {isScanning && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col">
            <div className="p-4 flex justify-between items-center text-white">
              <h2 className="font-bold">{scanMode === 'ADD' ? t('quickPack') : t('quickUnpack')}</h2>
              <button onClick={() => setIsScanning(false)} className="p-2"><X size={24} /></button>
            </div>
            
            <div className="flex justify-center p-4">
              <div className="bg-white/10 p-1 rounded-xl flex gap-1">
                <button 
                  onClick={() => setScanMode('ADD')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${scanMode === 'ADD' ? 'bg-emerald-600 text-white' : 'text-white/60'}`}
                >
                  {t('pack')}
                </button>
                <button 
                  onClick={() => setScanMode('REMOVE')}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors ${scanMode === 'REMOVE' ? 'bg-rose-600 text-white' : 'text-white/60'}`}
                >
                  {t('unpack')}
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <div id="box-barcode-reader" className="w-full h-full"></div>
              <div className={`absolute inset-0 border-2 pointer-events-none ${scanMode === 'ADD' ? 'border-emerald-500/30' : 'border-rose-500/30'}`}></div>
              <motion.div 
                animate={{ top: ['20%', '80%', '20%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`absolute left-[10%] right-[10%] h-0.5 shadow-[0_0_10px] ${scanMode === 'ADD' ? 'bg-emerald-500 shadow-emerald' : 'bg-rose-500 shadow-rose'}`}
              />
            </div>
            <div className="p-8 text-center text-white/60 text-sm">
              {scanMode === 'ADD' ? t('scanToAddItem') : t('scanToRemoveItem')}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('boxItems')}</h2>
          <div className="px-3 py-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 dark:border-slate-700/50 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            ID: {selectedBox.id}
          </div>
        </div>
        
        <div className="space-y-4">
          {selectedBox.items.length > 0 ? (
            selectedBox.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 group shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-xl bg-white/60 dark:bg-slate-800/60 shadow-sm flex items-center justify-center text-emerald-600 overflow-hidden shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ShoppingBag size={24} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-slate-900 dark:text-white">{item.name}</span>
                    {item.description && <span className="text-xs text-slate-500 dark:text-slate-400">{item.description}</span>}
                    <span className="text-xs font-medium text-emerald-600 mt-1">{t('quantity')}: {item.quantity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onEditItem(item)}
                    className="size-10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-emerald-600 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all border border-transparent hover:border-white/20 dark:hover:border-slate-700/50"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => onDeleteItem(item.id)}
                    className="size-10 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-rose-600 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all border border-transparent hover:border-white/20 dark:hover:border-slate-700/50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm rounded-3xl border border-dashed border-white/30 dark:border-slate-800/50">
              <Package size={48} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
              <p className="text-slate-400 dark:text-slate-500">{t('noItemsInBox')}</p>
            </div>
          )}
        </div>

        {scanError && <p className="text-xs text-rose-500 font-medium mt-4 text-center">{scanError}</p>}

        <div className="fixed bottom-24 right-6 flex flex-col gap-4">
          <button 
            onClick={() => setIsScanning(true)}
            className="size-16 rounded-2xl bg-slate-900/90 text-white shadow-xl backdrop-blur-md border border-white/10 flex items-center justify-center active:scale-95 transition-all"
          >
            <QrCode size={32} />
          </button>
          <button 
            onClick={() => onNavigate('ADD_ITEM')}
            className="size-16 rounded-2xl bg-emerald-600/90 text-white shadow-xl backdrop-blur-md border border-white/10 flex items-center justify-center active:scale-95 transition-all"
          >
            <Plus size={32} />
          </button>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowDeleteConfirm(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl border border-white/20 dark:border-slate-800/50"
            >
              <div className="size-16 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-6">
                <X size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('delete')} Box?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Are you sure you want to delete <strong>{selectedBox.name}</strong>? This action cannot be undone.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => deleteBox(selectedBox.id)}
                  className="w-full bg-rose-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-rose-100 dark:shadow-none"
                >
                  {t('deletePermanently')}
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 py-3.5 rounded-xl font-bold border border-white/20 dark:border-slate-700/50"
                >
                  {t('noCancel')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AddItemScreen = ({ 
  onNavigate, 
  newItem, 
  setNewItem, 
  handleAddItem,
  isEditing,
  language
}: { 
  onNavigate: (s: Screen, state?: any) => void, 
  newItem: { name: string, description: string, quantity: number, imageUrl?: string },
  setNewItem: (item: any) => void,
  handleAddItem: () => void,
  isEditing?: boolean,
  language: Language
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const t = useTranslation(language);

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (isCapturing) {
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "environment",
          width: { ideal: 1024 },
          height: { ideal: 1024 }
        } 
      })
      .then(s => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      })
      .catch(err => {
        console.error("Camera access denied", err);
        setScanError("Camera access denied");
        setIsCapturing(false);
      });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCapturing]);

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const size = Math.min(video.videoWidth, video.videoHeight);
      const startX = (video.videoWidth - size) / 2;
      const startY = (video.videoHeight - size) / 2;

      canvas.width = 800; // Standardized resolution that "fits"
      canvas.height = 800;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, startX, startY, size, size, 0, 0, 800, 800);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setNewItem({ ...newItem, imageUrl: dataUrl });
        setIsCapturing(false);
      }
    }
  };

  useEffect(() => {
    let html5QrCode: Html5Qrcode | null = null;
    
    if (isScanning) {
      html5QrCode = new Html5Qrcode("barcode-reader");
      
      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 150 },
        aspectRatio: 1.0
      };

      html5QrCode.start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          setNewItem({ ...newItem, name: decodedText });
          setIsScanning(false);
          
          // Optional: Try to fetch product name from OpenFoodFacts or similar
          try {
            const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`);
            if (res.ok) {
              const data = await res.json();
              if (data.status === 1 && data.product.product_name) {
                setNewItem({ 
                  ...newItem, 
                  name: data.product.product_name,
                  description: data.product.brands || '',
                  imageUrl: data.product.image_url || newItem.imageUrl
                });
              }
            }
          } catch (err) {
            console.error("Failed to fetch product details", err);
          }
        },
        () => {}
      ).catch(err => {
        console.error("Unable to start scanning", err);
        setScanError("Camera access denied or not found");
        setIsScanning(false);
      });
    }

    return () => {
      if (html5QrCode) {
        if (html5QrCode.isScanning) {
          html5QrCode.stop().catch(err => console.error("Failed to stop scanner", err));
        }
      }
    };
  }, [isScanning]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('BOX_DETAILS')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <X size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{isEditing ? 'Edit Item' : 'Add Item'}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 space-y-6 overflow-y-auto pb-32">
        {isCapturing && (
          <div className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col">
            <div className="p-4 flex justify-between items-center text-white">
              <h2 className="font-bold">Capture Item Photo</h2>
              <button onClick={() => setIsCapturing(false)} className="p-2"><X size={24} /></button>
            </div>
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="absolute w-full h-full object-cover"
              />
              {/* Viewfinder Overlay */}
              <div className="relative size-64 border-2 border-white/50 rounded-3xl shadow-[0_0_0_100vmax_rgba(0,0,0,0.5)]">
                <div className="absolute inset-0 border-2 border-emerald-500 rounded-3xl animate-pulse"></div>
              </div>
            </div>
            <div className="p-10 flex flex-col items-center gap-4 bg-black/40 backdrop-blur-sm">
              <button 
                onClick={capturePhoto}
                className="size-20 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform shadow-xl"
              >
                <div className="size-16 rounded-full border-4 border-black bg-white"></div>
              </button>
              <p className="text-white/60 text-sm font-medium">Align item in the square</p>
            </div>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        {isScanning && (
          <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col">
            <div className="p-4 flex justify-between items-center text-white">
              <h2 className="font-bold">Scan Barcode</h2>
              <button onClick={() => setIsScanning(false)} className="p-2"><X size={24} /></button>
            </div>
            <div className="flex-1 relative">
              <div id="barcode-reader" className="w-full h-full"></div>
              <div className="absolute inset-0 border-2 border-emerald-500/30 pointer-events-none"></div>
              <motion.div 
                animate={{ top: ['20%', '80%', '20%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-[10%] right-[10%] h-0.5 bg-emerald-500 shadow-[0_0_10px_emerald]"
              />
            </div>
            <div className="p-8 text-center text-white/60 text-sm bg-black/40 backdrop-blur-sm">
              Point your camera at a barcode or QR code
            </div>
          </div>
        )}

        <div className="space-y-2 pt-8">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Item Image</label>
          <div className="flex items-center gap-6">
            <div className="size-24 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md flex items-center justify-center text-emerald-600 overflow-hidden shrink-0 border border-white/20 dark:border-slate-800/50 relative group shadow-sm">
              {newItem.imageUrl ? (
                <>
                  <img src={newItem.imageUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <button 
                    onClick={() => setNewItem({ ...newItem, imageUrl: '' })}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                  >
                    <X size={20} />
                  </button>
                </>
              ) : (
                <ShoppingBag size={32} />
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              <button 
                onClick={() => setIsCapturing(true)}
                className="flex items-center justify-center gap-2 w-full h-12 bg-emerald-600/90 text-white rounded-xl font-bold text-sm active:scale-95 transition-all shadow-lg shadow-emerald-100 dark:shadow-none backdrop-blur-sm"
              >
                <Camera size={18} />
                Take Photo
              </button>
              
              <label className="flex items-center justify-center gap-2 w-full h-12 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-emerald-600 dark:text-emerald-400 rounded-xl font-bold text-sm cursor-pointer active:scale-95 transition-all border border-white/20 dark:border-slate-800/50 shadow-sm">
                <Plus size={18} />
                Upload from Gallery
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange} 
                />
              </label>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center font-medium">Optimized for square fit</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Item Name</label>
            <button 
              onClick={() => setIsScanning(true)}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-3 py-1.5 rounded-lg active:scale-95 transition-all border border-white/20 dark:border-slate-800/50 shadow-sm"
            >
              <QrCode size={14} />
              Scan Barcode
            </button>
          </div>
          <input 
            className="w-full h-14 px-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm" 
            placeholder="Enter item name" 
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          {scanError && <p className="text-xs text-rose-500 font-medium pl-1">{scanError}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Description</label>
          <input 
            className="w-full h-14 px-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm" 
            placeholder="Enter description" 
            type="text"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Quantity</label>
          <input 
            className="w-full h-14 px-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm" 
            placeholder="Enter quantity" 
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div className="mt-auto pb-10">
          <button 
            onClick={handleAddItem}
            disabled={!newItem.name}
            className="w-full h-16 rounded-2xl bg-emerald-600/90 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 dark:shadow-none active:scale-[0.98] transition-all backdrop-blur-sm disabled:opacity-50 disabled:active:scale-100"
          >
            {isEditing ? 'Save Changes' : 'Add Item'}
          </button>
        </div>
      </main>
    </div>
  );
};

const JoinHouseScreen = ({ onNavigate, onJoin, language }: { onNavigate: (s: Screen, state?: any) => void, onJoin: (id: string, create?: boolean) => Promise<{success: boolean, error?: string, notFound?: boolean}>, language: Language }) => {
  const [houseId, setHouseId] = useState('');
  const [error, setError] = useState('');
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslation(language);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (houseId.length < 3) {
      setError(t('houseIdMinLength'));
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    const result = await onJoin(houseId, false);
    if (!result.success) {
      if (result.notFound) {
        setShowCreateConfirm(true);
      } else {
        setError(result.error || t('failedToJoin'));
      }
    }
    setIsSubmitting(false);
  };

  const handleConfirmCreate = async () => {
    setIsSubmitting(true);
    const result = await onJoin(houseId, true);
    if (!result.success) {
      setError(result.error || t('failedToCreate'));
      setShowCreateConfirm(false);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('HOME')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('connectHouse')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-8 py-10 space-y-8 overflow-y-auto">
        <div className="text-center space-y-4">
          <div className="size-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-white/20 dark:border-slate-800/50">
            <Home size={40} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">{t('joinOrCreate')}</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
            {t('enterUniqueId')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">{t('houseId')}</label>
            <input 
              autoFocus
              className="w-full h-16 px-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 focus:ring-2 focus:ring-emerald-500 transition-all text-slate-900 dark:text-white font-bold text-lg placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-sm" 
              placeholder="e.g. smith-family-2024" 
              type="text"
              value={houseId}
              onChange={(e) => setHouseId(e.target.value)}
            />
            {error && <p className="text-xs text-rose-500 font-medium ml-1">{error}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-16 bg-emerald-600/90 disabled:opacity-50 text-white rounded-2xl font-bold shadow-xl shadow-emerald-100 dark:shadow-none active:scale-95 transition-all backdrop-blur-sm"
          >
            {isSubmitting ? t('connecting') : t('connectToHouse')}
          </button>
        </form>

        <div className="pt-10 border-t border-white/10 dark:border-slate-800/50">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">{t('howItWorks')}</h3>
          <ul className="space-y-4">
            {[
              { icon: <Plus size={16} />, text: t('firstUserCreates') },
              { icon: <User size={16} />, text: t('othersJoin') },
              { icon: <RotateCcw size={16} />, text: t('allDataSyncs') },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="size-8 rounded-xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-white/20 dark:border-slate-800/50 shadow-sm">
                  {item.icon}
                </div>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <AnimatePresence>
        {showCreateConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowCreateConfirm(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xs bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[32px] p-8 text-center shadow-2xl border border-white/20 dark:border-slate-800/50"
            >
              <div className="size-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <Home size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t('houseNotFound')}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                {t('houseIdDoesntExist', { houseId })}
              </p>
              <div className="space-y-3">
                <button 
                  onClick={handleConfirmCreate}
                  className="w-full bg-emerald-600/90 text-white py-3.5 rounded-xl font-bold active:scale-95 transition-all backdrop-blur-sm shadow-lg shadow-emerald-100 dark:shadow-none"
                >
                  {t('yesCreateNew')}
                </button>
                <button 
                  onClick={() => setShowCreateConfirm(false)}
                  className="w-full bg-white/40 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 py-3.5 rounded-xl font-bold active:scale-95 transition-all border border-white/20 dark:border-slate-700/50"
                >
                  {t('noCheckId')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BoxesScreen = ({ onNavigate, boxes, setSelectedBoxId, language }: { onNavigate: (s: Screen, state?: any) => void, boxes: Box[], setSelectedBoxId: (id: string) => void, language: Language }) => {
  const t = useTranslation(language);
  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('HOME')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('myBoxes')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 pt-6 pb-32">
        <div className="grid grid-cols-2 gap-4">
          {boxes.map((box) => (
            <button 
              key={box.id}
              onClick={() => {
                onNavigate('BOX_DETAILS', { selectedBoxId: box.id });
              }}
              className="aspect-square rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 flex flex-col items-center justify-center gap-3 p-4 active:scale-95 transition-all shadow-sm"
            >
              <div className="size-16 rounded-2xl bg-white/60 dark:bg-slate-800/60 shadow-sm flex items-center justify-center text-emerald-600">
                <Package size={32} />
              </div>
              <span className="font-bold text-slate-900 dark:text-white truncate w-full px-2">{box.name}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{box.items.length} {t('itemsCount')}</span>
            </button>
          ))}
          <button 
            onClick={() => onNavigate('SCAN')}
            className="aspect-square rounded-3xl bg-emerald-600/10 dark:bg-emerald-600/20 border-2 border-dashed border-emerald-600/30 flex flex-col items-center justify-center gap-2 p-4 text-emerald-600 active:bg-emerald-600/20 transition-all"
          >
            <Plus size={32} />
            <span className="font-bold text-sm">{t('newBox')}</span>
          </button>
        </div>
      </main>
    </div>
  );
};

const ProfileScreen = ({ onNavigate, boxes, houseId, onLogout, language }: { onNavigate: (s: Screen, state?: any) => void, boxes: Box[], houseId: string | null, onLogout: () => void, language: Language }) => {
  const t = useTranslation(language);
  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('HOME')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('houseProfile')}</h1>
        <button onClick={() => onNavigate('SETTINGS')} className="size-10 flex items-center justify-center text-slate-600 dark:text-slate-400">
          <Settings size={24} />
        </button>
      </header>

      <main className="flex-1 px-6 flex flex-col items-center pt-10 overflow-y-auto pb-32">
        <div className="size-32 rounded-3xl bg-white/40 dark:bg-emerald-900/20 backdrop-blur-md p-1 border-4 border-white/20 dark:border-emerald-900/40 mb-6 overflow-hidden flex items-center justify-center text-emerald-600 shadow-xl">
          <Home size={64} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{houseId ? `${t('house')}: ${houseId}` : t('guestMode')}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10">{houseId ? t('connectedSyncing') : t('connectToSync')}</p>

        <div className="w-full space-y-4">
          {[
            { icon: <Package size={20} />, label: t('myBoxes'), count: boxes.length, screen: 'BOXES' as Screen },
            { icon: <Settings size={20} />, label: t('appSettings'), screen: 'SETTINGS' as Screen },
            { icon: <MessageSquare size={20} />, label: t('sendFeedback'), screen: 'FEEDBACK' as Screen },
            houseId === 'admin' && { icon: <Shield size={20} />, label: t('adminPanel'), screen: 'ADMIN_FEEDBACK' as Screen },
          ].filter(Boolean).map((item: any, i) => (
            <button 
              key={i} 
              onClick={() => item.screen && onNavigate(item.screen)}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 active:bg-white/60 dark:active:bg-slate-800/60 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="text-emerald-600">{item.icon}</div>
                <span className="font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className="size-6 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {item.count}
                </span>
              )}
            </button>
          ))}

          {houseId ? (
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-900/20 backdrop-blur-md border border-rose-500/20 text-rose-600 active:bg-rose-500/20 dark:active:bg-rose-900/40 transition-all font-bold"
            >
              <LogOut size={20} />
              <span>{t('disconnectHouse')}</span>
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('JOIN_HOUSE')}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-emerald-600 text-white active:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 dark:shadow-none font-bold"
            >
              <Home size={20} />
              <span>{t('connectHouse')}</span>
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

const HelpScreen = ({ onNavigate, language }: { onNavigate: (s: Screen, state?: any) => void, language: Language }) => {
  const t = useTranslation(language);
  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-6 py-8 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('HOME')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('helpSharing')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-8 overflow-y-auto">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('sharingWithOthers')}</h2>
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-sm space-y-4">
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              To let someone else use this app on their phone, you must share the <strong>{t('publicPreviewLink')}</strong>.
            </p>
            <div className="p-4 bg-white/20 dark:bg-slate-800/40 rounded-2xl border border-white/10 dark:border-slate-700/50 break-all">
              <code className="text-xs text-emerald-700 dark:text-emerald-400 font-mono">
                https://ais-pre-d52ynli52gjou366l72cuu-420759174436.europe-west2.run.app
              </code>
            </div>
            <p className="text-slate-500 dark:text-slate-500 text-xs italic">
              {t('devLinkNote')}
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('usingMultipleDevices')}</h2>
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-sm space-y-4">
            <div className="flex gap-4">
              <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <RotateCcw size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{t('houseIdSync')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t('houseIdSync')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="size-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <QrCode size={20} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{t('qrCodeLabels')}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t('qrCodeLabels')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const SettingsScreen = ({ 
  onNavigate, 
  houseId,
  darkMode,
  onToggleDarkMode,
  language,
  onLanguageChange
}: { 
  onNavigate: (s: Screen, state?: any) => void, 
  houseId: string | null,
  darkMode: boolean,
  onToggleDarkMode: () => void,
  language: Language,
  onLanguageChange: (l: Language) => void
}) => {
  const t = useTranslation(language);
  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('PROFILE')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('appSettings')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 space-y-8 pt-8 overflow-y-auto">
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-slate-800/50 shadow-sm">
          <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-400 mb-2">{t('connectedHouse')}</h3>
          <p className="text-2xl font-black text-emerald-600">{houseId || t('guestMode')}</p>
          <p className="text-xs text-emerald-700/60 dark:text-emerald-500/60 mt-2">{t('houseIdSync')}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('preferences')}</h3>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t('language')}</label>
            <div className="flex p-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/20 dark:border-slate-700/50">
              <button 
                onClick={() => onLanguageChange('en')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white/80 dark:bg-slate-700/80 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
              >
                English
              </button>
              <button 
                onClick={() => onLanguageChange('mr')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${language === 'mr' ? 'bg-white/80 dark:bg-slate-700/80 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
              >
                मराठी
              </button>
            </div>
          </div>

          <button 
            onClick={onToggleDarkMode}
            className="w-full p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl flex items-center justify-between active:scale-[0.98] transition-all border border-white/20 dark:border-slate-800/50 shadow-sm"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('darkMode')}</span>
            <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${darkMode ? 'bg-emerald-600' : 'bg-white/20 dark:bg-slate-800'}`}>
              <motion.div 
                animate={{ x: darkMode ? 24 : 0 }}
                className="absolute left-1 top-1 size-4 bg-white rounded-full shadow-sm"
              />
            </div>
          </button>
          <div className="p-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl flex items-center justify-between opacity-50 border border-white/20 dark:border-slate-800/50 shadow-sm">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('pushNotifications')}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{t('comingSoon')}</span>
          </div>
        </div>

        <div className="pt-10">
          <button 
            onClick={() => onNavigate('PROFILE')}
            className="w-full h-16 bg-emerald-600/90 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95 transition-all backdrop-blur-sm"
          >
            {t('backToProfile')}
          </button>
        </div>
      </main>
    </div>
  );
};

const FeedbackScreen = ({ onNavigate, language }: { onNavigate: (s: Screen, state?: any) => void, language: Language }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const t = useTranslation(language);

  const handleSubmit = async () => {
    if (message.length < 5) return;
    setIsSending(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => onNavigate('PROFILE'), 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex items-center justify-between bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <button onClick={() => onNavigate('PROFILE')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('sendFeedback')}</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 px-6 pt-10 space-y-6 overflow-y-auto">
        {sent ? (
          <div className="text-center space-y-4 pt-20">
            <div className="size-20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-white/20 dark:border-slate-800/50 shadow-sm">
              <MessageSquare size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t('feedbackSuccess')}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t('feedbackSuccess')}</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t('sendFeedback')}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{t('feedbackPlaceholder')}</p>
            </div>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('feedbackPlaceholder')}
              className="w-full h-48 p-4 rounded-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 dark:border-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none shadow-sm"
            />
            
            <button
              onClick={handleSubmit}
              disabled={message.length < 5 || isSending}
              className={`w-full py-4 rounded-2xl font-bold transition-all backdrop-blur-sm ${
                message.length >= 5 && !isSending 
                  ? 'bg-emerald-600/90 text-white shadow-lg shadow-emerald-100 dark:shadow-none active:scale-95' 
                  : 'bg-white/20 dark:bg-slate-800/20 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-white/10 dark:border-slate-800/30'
              }`}
            >
              {isSending ? t('connecting') : t('submitFeedback')}
            </button>
          </>
        )}
      </main>
    </div>
  );
};

const AdminPanelScreen = ({ onNavigate, language }: { onNavigate: (s: Screen, state?: any) => void, language: Language }) => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'FEEDBACK' | 'HOUSES'>('FEEDBACK');
  const t = useTranslation(language);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [feedbackRes, housesRes] = await Promise.all([
        fetch('/api/admin/feedback'),
        fetch('/api/admin/houses')
      ]);
      const feedbackData = await feedbackRes.json();
      const housesData = await housesRes.json();
      setFeedbacks(Array.isArray(feedbackData) ? feedbackData : []);
      setHouses(Array.isArray(housesData) ? housesData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHouse = async (id: string) => {
    if (!window.confirm(t('deleteHouseConfirm', { id }))) return;
    
    try {
      const res = await fetch(`/api/admin/houses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHouses(prev => prev.filter(h => h.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent transition-colors duration-300">
      <header className="px-4 py-6 flex flex-col gap-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border-b border-white/20 dark:border-slate-800/50">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate('PROFILE')} className="size-10 flex items-center justify-center text-slate-900 dark:text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">{t('adminPanelTitle')}</h1>
          <div className="w-10"></div>
        </div>

        <div className="flex p-1 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-white/20 dark:border-slate-700/50">
          <button 
            onClick={() => setActiveTab('FEEDBACK')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'FEEDBACK' ? 'bg-white/80 dark:bg-slate-700/80 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            {t('feedback')} ({feedbacks.length})
          </button>
          <button 
            onClick={() => setActiveTab('HOUSES')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'HOUSES' ? 'bg-white/80 dark:bg-slate-700/80 text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            {t('houses')} ({houses.length})
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 space-y-4 overflow-y-auto pb-32">
        {loading ? (
          <div className="text-center py-20 text-slate-500">{t('loadingData')}</div>
        ) : activeTab === 'FEEDBACK' ? (
          feedbacks.length === 0 ? (
            <div className="text-center py-20 text-slate-500 italic">{t('noFeedbackYet')}</div>
          ) : (
            feedbacks.map((f) => (
              <div key={f.id} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-white/20 dark:border-slate-800/50 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{t('house')}: {f.house_id}</span>
                  <span className="text-[10px] text-slate-400">{new Date(f.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{f.message}</p>
              </div>
            ))
          )
        ) : (
          houses.length === 0 ? (
            <div className="text-center py-20 text-slate-500 italic">{t('noHousesYet')}</div>
          ) : (
            houses.map((h) => (
              <div key={h.id} className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/20 dark:border-slate-800/50 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white">{h.id}</h3>
                  <p className="text-[10px] text-slate-400">{t('createdDate')}: {new Date(h.created_at).toLocaleDateString()}</p>
                </div>
                {h.id !== 'admin' && (
                  <button 
                    onClick={() => deleteHouse(h.id)}
                    className="size-10 flex items-center justify-center text-rose-500 hover:bg-rose-500/10 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))
          )
        )}
      </main>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [boxes, setBoxes] = useState<Box[]>(INITIAL_BOXES);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePrompt, setShowCreatePrompt] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);
  const [manualId, setManualId] = useState('');
  const [newItem, setNewItem] = useState({ name: '', description: '', quantity: 1, imageUrl: '' });
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [houseId, setHouseId] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return (saved as Language) || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Browser history management
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        if (event.state.screen) setCurrentScreen(event.state.screen);
        if (event.state.selectedBoxId !== undefined) setSelectedBoxId(event.state.selectedBoxId);
      } else {
        setCurrentScreen('HOME');
        setSelectedBoxId(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    // Initial state setup
    if (!history.state) {
      history.replaceState({ screen: 'HOME', selectedBoxId: null }, '');
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const hasLoadedBoxes = React.useRef(false);

  const selectedBox = boxes.find(b => b.id === selectedBoxId) || boxes[0];

  const fetchHouse = async () => {
    try {
      const res = await fetch('/api/house/current');
      if (res.ok) {
        const data = await res.json();
        if (data) {
          setHouseId(data.id);
        } else {
          setHouseId(null);
          setIsLoading(false);
        }
      } else {
        setHouseId(null);
        setIsLoading(false);
      }
    } catch (err) {
      setHouseId(null);
      setIsLoading(false);
    }
  };

  const fetchBoxes = async () => {
    try {
      const res = await fetch('/api/boxes');
      if (res.ok) {
        const data = await res.json();
        setBoxes(data);
        hasLoadedBoxes.current = true;
      }
    } catch (err) {
      console.error('Failed to fetch boxes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBoxes = async (data: Box[]) => {
    if (!houseId || !hasLoadedBoxes.current) return;
    try {
      await fetch('/api/boxes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ boxes: data }),
      });
    } catch (err) {
      console.error('Failed to save boxes:', err);
    }
  };

  useEffect(() => {
    fetchHouse();
  }, []);

  useEffect(() => {
    if (houseId) {
      fetchBoxes();
    }
  }, [houseId]);

  useEffect(() => {
    if (houseId) {
      const timer = setTimeout(() => {
        saveBoxes(boxes);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [boxes, houseId]);

  const handleJoinHouse = async (id: string, create: boolean = false) => {
    try {
      const res = await fetch('/api/house/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ houseId: id, create }),
      });
      const data = await res.json();
      if (res.ok) {
        setHouseId(data.houseId);
        navigateTo('HOME');
        return { success: true };
      } else {
        return { success: false, error: data.error, notFound: data.notFound };
      }
    } catch (err) {
      return { success: false, error: 'Failed to join house' };
    }
  };

  const handleLeaveHouse = async () => {
    await fetch('/api/house/logout', { method: 'POST' });
    setHouseId(null);
    setBoxes(INITIAL_BOXES);
    hasLoadedBoxes.current = false;
    navigateTo('HOME');
  };

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navigateTo = (screen: Screen, extraState?: { selectedBoxId?: string | null }) => {
    const newSelectedBoxId = extraState?.selectedBoxId !== undefined ? extraState.selectedBoxId : selectedBoxId;
    
    if (screen !== currentScreen || newSelectedBoxId !== selectedBoxId) {
      history.pushState({ screen, selectedBoxId: newSelectedBoxId }, '');
      setCurrentScreen(screen);
      if (extraState?.selectedBoxId !== undefined) {
        setSelectedBoxId(extraState.selectedBoxId);
      }
    }
  };

  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return;
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 5);
    });
  };

  const handleScan = (decodedId?: string) => {
    const idToUse = decodedId || manualId.trim();
    if (!idToUse) {
      if (!decodedId) alert("Please enter a Box Name/ID to simulate a scan.");
      return;
    }

    const existingBox = boxes.find(b => b.id === idToUse || b.name === idToUse);

    if (existingBox) {
      navigateTo('BOX_DETAILS', { selectedBoxId: existingBox.id });
    } else {
      setScannedId(idToUse);
      setShowCreatePrompt(true);
    }
    setManualId(''); 
  };

  const createNewBox = () => {
    if (!scannedId) return;
    const newBox: Box = {
      id: scannedId,
      name: scannedId,
      items: []
    };
    setBoxes([...boxes, newBox]);
    setShowCreatePrompt(false);
    navigateTo('BOX_DETAILS', { selectedBoxId: newBox.id });
  };

  const handleAddItem = () => {
    if (!newItem.name) return;
    
    if (editingItem) {
      setBoxes(prev => prev.map(box => 
        box.id === selectedBoxId 
          ? { 
              ...box, 
              items: box.items.map(item => 
                item.id === editingItem.id 
                  ? { ...item, name: newItem.name, description: newItem.description, quantity: Number(newItem.quantity) || 1, imageUrl: newItem.imageUrl }
                  : item
              ) 
            }
          : box
      ));
      setEditingItem(null);
    } else {
      const item: Item = {
        id: `item-${Date.now()}`,
        name: newItem.name,
        description: newItem.description,
        quantity: Number(newItem.quantity) || 1,
        category: 'General',
        imageUrl: newItem.imageUrl
      };
      
      setBoxes(prev => prev.map(box => 
        box.id === selectedBoxId 
          ? { ...box, items: [...box.items, item] }
          : box
      ));
    }
    
    setNewItem({ name: '', description: '', quantity: 1, imageUrl: '' });
    navigateTo('BOX_DETAILS');
  };

  const deleteItem = (itemId: string) => {
    setBoxes(prev => prev.map(box => 
      box.id === selectedBoxId 
        ? { ...box, items: box.items.filter(item => item.id !== itemId) }
        : box
    ));
  };

  const startEditingItem = (item: Item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, description: item.description, quantity: item.quantity, imageUrl: item.imageUrl || '' });
    navigateTo('EDIT_ITEM');
  };

  const deleteBox = (id: string) => {
    setBoxes(boxes.filter(b => b.id !== id));
    navigateTo('BOXES');
  };

  const handleQuickAdd = (item: Item) => {
    setBoxes(prev => prev.map(box => {
      if (box.id !== selectedBoxId) return box;
      
      // Check if item already exists by barcode
      const existingItemIndex = box.items.findIndex(i => i.barcode === item.barcode);
      if (existingItemIndex !== -1) {
        const newItems = [...box.items];
        newItems[existingItemIndex] = { 
          ...newItems[existingItemIndex], 
          quantity: newItems[existingItemIndex].quantity + 1 
        };
        return { ...box, items: newItems };
      }
      
      return { ...box, items: [...box.items, item] };
    }));
  };

  const handleQuickRemove = (barcode: string) => {
    setBoxes(prev => prev.map(box => {
      if (box.id !== selectedBoxId) return box;
      
      // Try to find item by barcode first, then name/description as fallback
      const itemIndex = box.items.findIndex(i => i.barcode === barcode || i.name === barcode || i.description === barcode);
      if (itemIndex === -1) return box;
      
      const newItems = [...box.items];
      const item = newItems[itemIndex];
      
      if (item.quantity > 1) {
        newItems[itemIndex] = { ...item, quantity: item.quantity - 1 };
      } else {
        newItems.splice(itemIndex, 1);
      }
      
      return { ...box, items: newItems };
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
        <div className="size-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-100 dark:shadow-none mb-6 animate-bounce">
          <Package size={32} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Loading your inventory...</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Just a moment while we sync your data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-950 min-h-screen relative shadow-2xl overflow-hidden font-sans transition-colors duration-300">
      {/* Glass Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[50%] bg-emerald-400/30 dark:bg-emerald-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[80%] h-[50%] bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[30%] right-[10%] w-[40%] h-[30%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen relative z-10"
        >
          {currentScreen === 'HOME' && <BoxTrackerHomeScreen onNavigate={navigateTo} houseId={houseId} language={language} />}
          {currentScreen === 'JOIN_HOUSE' && <JoinHouseScreen onNavigate={navigateTo} onJoin={handleJoinHouse} language={language} />}
          {currentScreen === 'SCAN' && (
            <ScanScreen 
              onNavigate={navigateTo}
              manualId={manualId}
              setManualId={setManualId}
              handleScan={handleScan}
              showCreatePrompt={showCreatePrompt}
              setShowCreatePrompt={setShowCreatePrompt}
              createNewBox={createNewBox}
              scannedId={scannedId}
              language={language}
            />
          )}
          {currentScreen === 'SEARCH' && (
            <SearchScreen 
              onNavigate={navigateTo}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              boxes={boxes}
              setSelectedBoxId={setSelectedBoxId}
              recentSearches={recentSearches}
              onSearch={addToRecentSearches}
              language={language}
            />
          )}
          {currentScreen === 'BOX_DETAILS' && (
            <BoxDetailsScreen 
              onNavigate={navigateTo}
              selectedBox={selectedBox}
              deleteBox={deleteBox}
              onEditItem={startEditingItem}
              onDeleteItem={deleteItem}
              onQuickAdd={handleQuickAdd}
              onQuickRemove={handleQuickRemove}
              language={language}
            />
          )}
          {(currentScreen === 'ADD_ITEM' || currentScreen === 'EDIT_ITEM') && (
            <AddItemScreen 
              onNavigate={navigateTo}
              newItem={newItem}
              setNewItem={setNewItem}
              handleAddItem={handleAddItem}
              isEditing={currentScreen === 'EDIT_ITEM'}
              language={language}
            />
          )}
          {currentScreen === 'BOXES' && (
            <BoxesScreen 
              onNavigate={navigateTo}
              boxes={boxes}
              setSelectedBoxId={setSelectedBoxId}
              language={language}
            />
          )}
          {currentScreen === 'PROFILE' && (
            <ProfileScreen 
              onNavigate={navigateTo}
              boxes={boxes}
              houseId={houseId}
              onLogout={handleLeaveHouse}
              language={language}
            />
          )}
          {currentScreen === 'HELP' && (
            <HelpScreen onNavigate={navigateTo} language={language} />
          )}
          {currentScreen === 'SETTINGS' && (
            <SettingsScreen 
              onNavigate={navigateTo}
              houseId={houseId}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
              language={language}
              onLanguageChange={setLanguage}
            />
          )}
          {currentScreen === 'FEEDBACK' && (
            <FeedbackScreen onNavigate={navigateTo} language={language} />
          )}
          {currentScreen === 'ADMIN_FEEDBACK' && (
            <AdminPanelScreen onNavigate={navigateTo} language={language} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Navigation */}
      {['HOME', 'SEARCH', 'BOXES', 'PROFILE'].includes(currentScreen) && (
        <nav className="fixed bottom-4 left-4 right-4 max-w-[calc(28rem-2rem)] mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 px-6 pt-3 pb-4 flex items-center justify-between z-20 transition-all duration-300 rounded-3xl shadow-2xl">
          <button 
            onClick={() => navigateTo('HOME')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'HOME' ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <Home size={22} fill={currentScreen === 'HOME' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold">{useTranslation(language)('home')}</span>
          </button>
          
          <button 
            onClick={() => houseId ? navigateTo('SEARCH') : navigateTo('JOIN_HOUSE')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'SEARCH' ? 'text-emerald-600' : houseId ? 'text-slate-400 dark:text-slate-500' : 'text-slate-200 dark:text-slate-800'}`}
          >
            <Search size={22} />
            <span className="text-[10px] font-bold">{useTranslation(language)('search')}</span>
          </button>

          {/* Central Scan Button */}
          <div className="relative -top-8">
            <div className="absolute -inset-1 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-full transition-colors duration-300"></div>
            <button 
              onClick={() => houseId ? navigateTo('SCAN') : navigateTo('JOIN_HOUSE')}
              className={`relative size-14 rounded-full flex items-center justify-center border-4 border-white/40 dark:border-slate-900/40 active:scale-90 transition-all ${houseId ? 'bg-emerald-600/90 text-white shadow-lg shadow-emerald-200 dark:shadow-none backdrop-blur-sm' : 'bg-white/20 dark:bg-slate-800/20 text-slate-400 dark:text-slate-600 border border-white/10 dark:border-slate-800/30'}`}
            >
              <QrCode size={26} />
            </button>
          </div>

          <button 
            onClick={() => houseId ? navigateTo('BOXES') : navigateTo('JOIN_HOUSE')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'BOXES' ? 'text-emerald-600' : houseId ? 'text-slate-400 dark:text-slate-500' : 'text-slate-200 dark:text-slate-800'}`}
          >
            <Package size={22} fill={currentScreen === 'BOXES' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold">{useTranslation(language)('boxes')}</span>
          </button>

          <button 
            onClick={() => navigateTo('PROFILE')}
            className={`flex flex-col items-center gap-1 transition-colors ${currentScreen === 'PROFILE' ? 'text-emerald-600' : 'text-slate-400 dark:text-slate-500'}`}
          >
            <User size={22} fill={currentScreen === 'PROFILE' ? 'currentColor' : 'none'} />
            <span className="text-[10px] font-bold">{useTranslation(language)('profile')}</span>
          </button>
        </nav>
      )}
    </div>
  );
}

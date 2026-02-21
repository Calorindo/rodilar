import { db } from '@/lib/firebase';
import { ref, get, set } from 'firebase/database';
import { Settings } from '@/types/settings';

const SETTINGS_PATH = 'settings';

export const settingsService = {
  async getSettings(): Promise<Settings> {
    try {
      const settingsRef = ref(db, SETTINGS_PATH);
      const snapshot = await get(settingsRef);
      
      if (snapshot.exists()) {
        return snapshot.val() as Settings;
      }
      
      // Retorna configurações padrão se não existir
      const defaultSettings: Settings = {
        whatsappNumber: '5551992155747',
        updatedAt: new Date().toISOString(),
      };
      
      // Salva as configurações padrão
      await set(settingsRef, defaultSettings);
      return defaultSettings;
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      throw error;
    }
  },

  async updateSettings(settings: Partial<Settings>): Promise<void> {
    try {
      const settingsRef = ref(db, SETTINGS_PATH);
      const currentSettings = await this.getSettings();
      
      const updatedSettings = {
        ...currentSettings,
        ...settings,
        updatedAt: new Date().toISOString(),
      };
      
      await set(settingsRef, updatedSettings);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      throw error;
    }
  },

  async getWhatsAppNumber(): Promise<string> {
    try {
      const settings = await this.getSettings();
      return settings.whatsappNumber;
    } catch (error) {
      console.error('Erro ao buscar número do WhatsApp:', error);
      // Retorna número padrão em caso de erro
      return '5551992155747';
    }
  },
};

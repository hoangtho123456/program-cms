import { storage, prefix, ttl } from "@/config";
import user from "@/store/modules/user";
import settings from "@/store/modules/settings";

/**
 * Vuex plugin for save and sync 'settings' and 'user' from vuex modules.
 */
class SyncStorage {
  constructor(option) {
    this.storage = (window && window[storage]);
    this.prefix = option.prefix || prefix;
    this.ttl = option.ttl || ttl;
    this.user = "user";
    this.settings = "settings";
    this.userMutations = this.getModuleOptions(user, "mutations");
    this.settingsMutations = this.getModuleOptions(settings, "mutations");
  }

  /**
   * Vuex subscribe plugin function.
   * @param {Object} store Vuex instance
   */
  subscribe = async (store) => {
    if (!this.checkStorage()) {
      throw new Error('[vuex.SyncStorage] Invalid "Storage" instance given');
    }

    // init and apply user state from storage
    if (this.initUserState(store)) {
      store.commit('SET_ROUTES');
    } else {
      console.warn('[vuex.SyncStorage] No user state in "Storage"');
    }

    // init and apply settings state from storage
    if (this.initSettingsState(store)) {
      console.log("[vuex.SyncStorage] initSettingsState");
    } else {
      console.warn('[vuex.SyncStorage] No user settings in "Storage"');
    }

    store.subscribe((mutation, state) => {
      if (this.userMutations.includes(mutation.type)) {
        this.setToStorage(
          `${this.prefix}${this.user}`,
          JSON.stringify(state.user)
        );
        if (mutation.type === "SET_TOKEN") {
          this.setToStorage(`${this.prefix}ttl`, this.getSeconds(this.ttl));
        }
      }
      if (this.settingsMutations.includes(mutation.type)) {
        this.setToStorage(
          `${this.prefix}${this.settings}`,
          JSON.stringify(state.settings)
        );
      }
    });
  };

  /**
   * Get current seconds + ttl.
   * @param {Number} ttl Session lifetime
   */
  getSeconds = (ttl) => Math.floor(Date.now() / 1000) + (ttl || 0);

  /**
   * Get array of module mutation types.
   */
  getModuleOptions = (module, key) => {
    if (!module || !module[key]) return [];
    return Object.keys(module[key]);
  };

  /**
   * Check LocalStorage to read/write.
   */
  checkStorage() {
    try {
      this.storage.setItem(`${this.prefix}@@`, 1);
      this.storage.removeItem(`${this.prefix}@@`);
    } catch (err) {
      console.error(`[vuex.SyncStorage] Check storage failed: ${err}`);
      return false;
    }
    return true;
  }

  /**
   * Check application version.
   * If the version of the application has changed, then the storage is cleared of the session
   * and common. Required to apply the settings of the new version of the application
   * @param {String} version version of the application
   */
  checkVersion(version) {
    try {
      if (this.getFromStorage(`${this.prefix}version`) === version) {
        return true;
      }

      this.storage.clear();
      this.setToStorage(`${this.prefix}version`, version);
    } catch (err) {
      console.error(`[vuex.SyncStorage] Check version failed: ${err}`);
    }
    return false;
  }

  /**
   * Get user info from storage.
   */
  initUserState(store) {
    const userTTL = parseInt(this.getFromStorage(`${this.prefix}ttl`) || 0, 10);
    if (userTTL < this.getSeconds()) {
      console.warn("[vuex.SyncStorage] Session expired");
      store.commit('SET_USER_INFO', { logout: true });

      return false;
    }

    const userState = this.getFromStorage(`${this.prefix}${this.user}`);
    if (userState) {
      store.commit("SET_USER_INFO", JSON.parse(userState));
      return true;
    }
    return false;
  }

  /**
   * Get settings from storage.
   */
  initSettingsState(store) {
    const settingsState = this.getFromStorage(`${this.prefix}${this.settings}`);
    if (settingsState) {
      store.commit("SET_SETTINGS", JSON.parse(settingsState));
      return true;
    }
    return false;
  }

  /**
   * Get data to storage.
   * @param {String} key
   * @param {String} value
   */
  setToStorage(key, value) {
    try {
      this.storage.setItem(key, value);
    } catch (err) {
      console.error(`[vuex.SyncStorage] setItem storage failed: ${err}`);
      return false;
    }
    return true;
  }

  /**
   * Get data from storage.
   * @param {String} key
   */
  getFromStorage(key) {
    try {
      return this.storage.getItem(key);
    } catch (err) {
      console.error(`[vuex.SyncStorage] getItem storage failed: ${err}`);
    }
    return "";
  }
}

export default function (syncStorageOption) {
  const syncStorage = new SyncStorage(syncStorageOption);
  return syncStorage.subscribe;
}

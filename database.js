/**
 * Simple JSON-based Database for Group Settings
 * ES Module version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, 'database');
const GROUPS_DB = path.join(DB_PATH, 'groups.json');
const USERS_DB = path.join(DB_PATH, 'users.json');
const WARNINGS_DB = path.join(DB_PATH, 'warnings.json');
const MODS_DB = path.join(DB_PATH, 'mods.json');
const PRIVATE_DB = path.join(DB_PATH, 'private.json');
const SETTINGS_DB = path.join(DB_PATH, 'settings.json');
const GROUP_LOCKS_DB = path.join(DB_PATH, 'grouplocks.json');

// Initialize database directory
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// Initialize database files
const initDB = (filePath, defaultData = {}) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
  }
};

initDB(GROUPS_DB, {});
initDB(USERS_DB, {});
initDB(WARNINGS_DB, {});
initDB(MODS_DB, { moderators: [] });
initDB(PRIVATE_DB, {});
initDB(SETTINGS_DB, { autoBio: { enabled: false, index: 0 } });
initDB(GROUP_LOCKS_DB, {});

// Read database
const readDB = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading database: ${error.message}`);
    return {};
  }
};

// Write database
const writeDB = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing database: ${error.message}`);
    return false;
  }
};

// Group Settings
const getGroupSettings = (groupId) => {
  const groups = readDB(GROUPS_DB);
  if (!groups[groupId]) {
    groups[groupId] = { ...config.defaultGroupSettings };
    writeDB(GROUPS_DB, groups);
  }
  return groups[groupId];
};

const updateGroupSettings = (groupId, settings) => {
  const groups = readDB(GROUPS_DB);
  groups[groupId] = { ...groups[groupId], ...settings };
  return writeDB(GROUPS_DB, groups);
};

// Private Chat Settings
const getPrivateSettings = (chatId) => {
  const chats = readDB(PRIVATE_DB);
  if (!chats[chatId]) {
    chats[chatId] = {
      antidelete: false,
      registered: Date.now()
    };
    writeDB(PRIVATE_DB, chats);
  }
  return chats[chatId];
};

const updatePrivateSettings = (chatId, settings) => {
  const chats = readDB(PRIVATE_DB);
  chats[chatId] = { ...chats[chatId], ...settings };
  return writeDB(PRIVATE_DB, chats);
};

// User Data
const getUser = (userId) => {
  const users = readDB(USERS_DB);
  const cleanId = userId.split('@')[0].split(':')[0];
  if (!users[cleanId]) {
    users[cleanId] = {
      registered: Date.now(),
      premium: false,
      banned: false
    };
    writeDB(USERS_DB, users);
  }
  return users[cleanId];
};

const updateUser = (userId, data) => {
  const users = readDB(USERS_DB);
  const cleanId = userId.split('@')[0].split(':')[0];
  users[cleanId] = { ...users[cleanId], ...data };
  return writeDB(USERS_DB, users);
};

// Warnings System
const getWarnings = (groupId, userId) => {
  const warnings = readDB(WARNINGS_DB);
  const cleanUserId = userId.split('@')[0].split(':')[0];
  const key = `${groupId}_${cleanUserId}`;
  return warnings[key] || { count: 0, warnings: [] };
};

const addWarning = (groupId, userId, reason) => {
  const warnings = readDB(WARNINGS_DB);
  const cleanUserId = userId.split('@')[0].split(':')[0];
  const key = `${groupId}_${cleanUserId}`;
  
  if (!warnings[key]) {
    warnings[key] = { count: 0, warnings: [] };
  }
  
  warnings[key].count++;
  warnings[key].warnings.push({
    reason,
    date: Date.now()
  });
  
  writeDB(WARNINGS_DB, warnings);
  return warnings[key];
};

const removeWarning = (groupId, userId) => {
  const warnings = readDB(WARNINGS_DB);
  const cleanUserId = userId.split('@')[0].split(':')[0];
  const key = `${groupId}_${cleanUserId}`;
  
  if (warnings[key] && warnings[key].count > 0) {
    warnings[key].count--;
    warnings[key].warnings.pop();
    writeDB(WARNINGS_DB, warnings);
    return true;
  }
  return false;
};

const clearWarnings = (groupId, userId) => {
  const warnings = readDB(WARNINGS_DB);
  const cleanUserId = userId.split('@')[0].split(':')[0];
  const key = `${groupId}_${cleanUserId}`;
  delete warnings[key];
  return writeDB(WARNINGS_DB, warnings);
};

// Auto-Bio Status
const getAutoBioStatus = () => {
  const settings = readDB(SETTINGS_DB);
  return settings.autoBio || { enabled: false, index: 0 };
};

const saveAutoBioStatus = (status) => {
  const settings = readDB(SETTINGS_DB);
  settings.autoBio = status;
  writeDB(SETTINGS_DB, settings);
};

// Group Lock Status
const getGroupLockStatus = (groupId) => {
  const locks = readDB(GROUP_LOCKS_DB);
  return locks[groupId] || false;
};

const setGroupLockStatus = (groupId, locked) => {
  const locks = readDB(GROUP_LOCKS_DB);
  locks[groupId] = locked;
  writeDB(GROUP_LOCKS_DB, locks);
};

// Moderators System
const getModerators = () => {
  const mods = readDB(MODS_DB);
  return mods.moderators || [];
};

const addModerator = (userId) => {
  const mods = readDB(MODS_DB);
  const cleanId = userId.split('@')[0].split(':')[0];
  if (!mods.moderators) mods.moderators = [];
  if (!mods.moderators.includes(cleanId)) {
    mods.moderators.push(cleanId);
    return writeDB(MODS_DB, mods);
  }
  return false;
};

const removeModerator = (userId) => {
  const mods = readDB(MODS_DB);
  const cleanId = userId.split('@')[0].split(':')[0];
  if (mods.moderators) {
    mods.moderators = mods.moderators.filter(id => id !== cleanId);
    return writeDB(MODS_DB, mods);
  }
  return false;
};

const isModerator = (userId) => {
  const mods = getModerators();
  const cleanId = userId.split('@')[0].split(':')[0];
  return mods.includes(cleanId);
};

// Export all functions
export {
  getGroupSettings,
  updateGroupSettings,
  getPrivateSettings,
  updatePrivateSettings,
  getUser,
  updateUser,
  getWarnings,
  addWarning,
  removeWarning,
  clearWarnings,
  getAutoBioStatus,
  saveAutoBioStatus,
  getGroupLockStatus,
  setGroupLockStatus,
  getModerators,
  addModerator,
  removeModerator,
  isModerator
};
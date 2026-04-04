/**
 * JID Helper Utilities for LID-aware matching
 * Shared by promote, demote, and other commands
 * ES Module version for @kelvdra/baileys
 */

import { jidDecode, jidEncode } from '@kelvdra/baileys';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// LID mapping cache
const lidMappingCache = new Map();

/**
 * Get LID mapping value from files
 * @param {string} user - User identifier
 * @param {string} direction - 'pnToLid' or 'lidToPn'
 * @returns {string|null} Mapped value or null
 */
const getLidMappingValue = (user, direction) => {
  if (!user) return null;
  
  const cacheKey = `${direction}:${user}`;
  if (lidMappingCache.has(cacheKey)) {
    return lidMappingCache.get(cacheKey);
  }
  
  const sessionPath = path.join(__dirname, '..', config.sessionName || 'session');
  const suffix = direction === 'pnToLid' ? '.json' : '_reverse.json';
  const filePath = path.join(sessionPath, `lid-mapping-${user}${suffix}`);
  
  if (!fs.existsSync(filePath)) {
    lidMappingCache.set(cacheKey, null);
    return null;
  }
  
  try {
    const raw = fs.readFileSync(filePath, 'utf8').trim();
    const value = raw ? JSON.parse(raw) : null;
    lidMappingCache.set(cacheKey, value || null);
    return value || null;
  } catch (error) {
    lidMappingCache.set(cacheKey, null);
    return null;
  }
};

/**
 * Normalize JID handling LID conversion
 * @param {string} jid - JID to normalize
 * @returns {string} Normalized JID
 */
const normalizeJidWithLid = (jid) => {
  if (!jid) return jid;
  
  try {
    const decoded = jidDecode(jid);
    if (!decoded?.user) {
      return `${jid.split(':')[0].split('@')[0]}@s.whatsapp.net`;
    }
    
    let user = decoded.user;
    let server = decoded.server === 'c.us' ? 's.whatsapp.net' : decoded.server;
    
    const mapToPn = () => {
      const pnUser = getLidMappingValue(user, 'lidToPn');
      if (pnUser) {
        user = pnUser;
        server = server === 'hosted.lid' ? 'hosted' : 's.whatsapp.net';
        return true;
      }
      return false;
    };
    
    if (server === 'lid' || server === 'hosted.lid') {
      mapToPn();
    } else if (server === 's.whatsapp.net' || server === 'hosted') {
      mapToPn();
    }
    
    if (server === 'hosted') {
      return jidEncode(user, 'hosted');
    }
    return jidEncode(user, 's.whatsapp.net');
  } catch (error) {
    return jid;
  }
};

/**
 * Build comparable JID variants (PN + LID) for matching
 * @param {string} jid - JID to build variants for
 * @returns {string[]} Array of JID variants
 */
const buildComparableIds = (jid) => {
  if (!jid) return [];
  
  try {
    const decoded = jidDecode(jid);
    if (!decoded?.user) {
      return [normalizeJidWithLid(jid)].filter(Boolean);
    }
    
    const variants = new Set();
    const normalizedServer = decoded.server === 'c.us' ? 's.whatsapp.net' : decoded.server;
    
    variants.add(jidEncode(decoded.user, normalizedServer));
    
    const isPnServer = normalizedServer === 's.whatsapp.net' || normalizedServer === 'hosted';
    const isLidServer = normalizedServer === 'lid' || normalizedServer === 'hosted.lid';
    
    if (isPnServer) {
      const lidUser = getLidMappingValue(decoded.user, 'pnToLid');
      if (lidUser) {
        const lidServer = normalizedServer === 'hosted' ? 'hosted.lid' : 'lid';
        variants.add(jidEncode(lidUser, lidServer));
      }
    } else if (isLidServer) {
      const pnUser = getLidMappingValue(decoded.user, 'lidToPn');
      if (pnUser) {
        const pnServer = normalizedServer === 'hosted.lid' ? 'hosted' : 's.whatsapp.net';
        variants.add(jidEncode(pnUser, pnServer));
      }
    }
    
    return Array.from(variants);
  } catch (error) {
    return [jid];
  }
};

/**
 * Find participant by either PN JID or LID JID
 * @param {Array} participants - Array of participants from group metadata
 * @param {string|string[]} userIds - User ID(s) to find
 * @returns {Object|null} Found participant or null
 */
const findParticipant = (participants = [], userIds) => {
  const targets = (Array.isArray(userIds) ? userIds : [userIds])
    .filter(Boolean)
    .flatMap(id => buildComparableIds(id));
  
  if (!targets.length) return null;
  
  return participants.find(participant => {
    if (!participant) return false;
    
    const participantIds = [
      participant.id,
      participant.lid,
      participant.userJid
    ]
      .filter(Boolean)
      .flatMap(id => buildComparableIds(id));
    
    return participantIds.some(id => targets.includes(id));
  }) || null;
};

/**
 * Extract phone number from JID
 * @param {string} jid - JID to extract from
 * @returns {string|null} Phone number or null
 */
const extractPhoneNumber = (jid) => {
  if (!jid) return null;
  
  try {
    const normalized = normalizeJidWithLid(jid);
    const match = normalized.match(/^(\d+)@/);
    return match ? match[1] : null;
  } catch (error) {
    const match = jid.match(/^(\d+)@/);
    return match ? match[1] : null;
  }
};

/**
 * Compare if two JIDs refer to the same user
 * @param {string} jid1 - First JID
 * @param {string} jid2 - Second JID
 * @returns {boolean} True if same user
 */
const isSameUser = (jid1, jid2) => {
  if (!jid1 || !jid2) return false;
  
  const ids1 = buildComparableIds(jid1);
  const ids2 = buildComparableIds(jid2);
  
  return ids1.some(id1 => ids2.includes(id1));
};

/**
 * Clear LID mapping cache
 */
const clearLidCache = () => {
  lidMappingCache.clear();
};

/**
 * Get cache stats
 * @returns {Object} Cache statistics
 */
const getCacheStats = () => {
  return {
    size: lidMappingCache.size,
    keys: Array.from(lidMappingCache.keys())
  };
};

// Export all functions
export {
  findParticipant,
  buildComparableIds,
  normalizeJidWithLid,
  getLidMappingValue,
  extractPhoneNumber,
  isSameUser,
  clearLidCache,
  getCacheStats
};
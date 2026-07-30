// Replaces the window.storage API that's only available inside Claude's
// artifact preview with a real, standalone equivalent backed by the
// browser's localStorage - same method names and return shapes, so
// WHWTracker.jsx (copied straight from the Claude artifact) works unchanged.
//
// Note: localStorage is per-browser/per-device, not synced across devices
// like the artifact's storage was. That's expected for a plain static site;
// if cross-device sync is ever wanted later, this is the file to swap out.

const PREFIX = "whw-ptracker:";

function namespacedKey(key) {
  return PREFIX + key;
}

if (typeof window !== "undefined" && !window.storage) {
  window.storage = {
    async get(key, shared = false) {
      try {
        const raw = localStorage.getItem(namespacedKey(key));
        if (raw === null) return null;
        return { key, value: raw, shared: !!shared };
      } catch (e) {
        return null;
      }
    },

    async set(key, value, shared = false) {
      try {
        localStorage.setItem(namespacedKey(key), value);
        return { key, value, shared: !!shared };
      } catch (e) {
        return null;
      }
    },

    async delete(key, shared = false) {
      try {
        const existed = localStorage.getItem(namespacedKey(key)) !== null;
        localStorage.removeItem(namespacedKey(key));
        return { key, deleted: existed, shared: !!shared };
      } catch (e) {
        return null;
      }
    },

    async list(prefix = "", shared = false) {
      try {
        const fullPrefix = namespacedKey(prefix);
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith(fullPrefix)) keys.push(k.slice(PREFIX.length));
        }
        return { keys, prefix, shared: !!shared };
      } catch (e) {
        return null;
      }
    },
  };
}

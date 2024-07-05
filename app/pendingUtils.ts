import { LocalStorageKey } from "./localstorage";

export interface Pending {
  label: string;
  value: number;
  isPayed: boolean;
  id: string;
}

export const addPendingEntry = (pending: Pending) => {
  const rawPending = localStorage.getItem(LocalStorageKey.FIXED_COSTS);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  parsedPending.push({ ...pending, isPayed: false });
  localStorage.setItem(
    LocalStorageKey.FIXED_COSTS,
    JSON.stringify(parsedPending)
  );
  window.dispatchEvent(new StorageEvent("storage"));
};

export const deletePendingEntry = (uid: string) => {
  const rawPending = localStorage.getItem(LocalStorageKey.FIXED_COSTS);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  localStorage.setItem(
    LocalStorageKey.FIXED_COSTS,
    JSON.stringify(parsedPending.filter((entry) => entry.id !== uid))
  );
  window.dispatchEvent(new StorageEvent("storage"));
};

export const clearPendingEntry = (uid: string) => {
  const rawPending = localStorage.getItem(LocalStorageKey.FIXED_COSTS);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  localStorage.setItem(
    LocalStorageKey.FIXED_COSTS,
    JSON.stringify(
      parsedPending.map((entry) => ({
        ...entry,
        isPayed: entry.id === uid ? !entry.isPayed : entry.isPayed,
      }))
    )
  );
  window.dispatchEvent(new StorageEvent("storage"));
};

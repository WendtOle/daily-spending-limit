import { LocalStorageKey } from "./localstorage";

export interface Pending {
  label: string;
  value: number;
  isCleared: boolean;
  clearingDay: number;
  repeatsEveryMonth: boolean;
  id: string;
}

export const addPendingEntry = (pending: Omit<Pending, "isCleared">) => {
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  parsedPending.push({ ...pending, isCleared: false });
  localStorage.setItem(LocalStorageKey.PENDING, JSON.stringify(parsedPending));
  window.dispatchEvent(new StorageEvent("storage"));
  purgeOutdatedPendingEntries();
};

export const deletePendingEntry = (uid: string) => {
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  localStorage.setItem(
    LocalStorageKey.PENDING,
    JSON.stringify(parsedPending.filter((entry) => entry.id !== uid))
  );
  window.dispatchEvent(new StorageEvent("storage"));
  purgeOutdatedPendingEntries();
};

export const clearPendingEntry = (uid: string) => {
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  localStorage.setItem(
    LocalStorageKey.PENDING,
    JSON.stringify(
      parsedPending.map((entry) => ({
        ...entry,
        isCleared: entry.id === uid ? true : entry.isCleared,
      }))
    )
  );
  window.dispatchEvent(new StorageEvent("storage"));
  purgeOutdatedPendingEntries();
};

export const purgeOutdatedPendingEntries = () => {
  const rawPending = localStorage.getItem(LocalStorageKey.PENDING);
  const parsedPending: Pending[] = rawPending ? JSON.parse(rawPending) : [];
  const today = new Date().getDate();
  const updatedPending = parsedPending.filter(
    (entry) => entry.clearingDay > today || entry.repeatsEveryMonth
  );
  if (parsedPending.length === updatedPending.length) return;
  localStorage.setItem(LocalStorageKey.PENDING, JSON.stringify(updatedPending));
  window.dispatchEvent(new StorageEvent("storage"));
};

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HintDismissedStore {
	showHints: boolean,
	dismiss: () => void,
}

export const hintDissmissedStore = create<HintDismissedStore>()(
	persist((set) => ({
		showHints: true,
		dismiss: () => set(() => ({ showHints: false }))
	}),
		{
			name: "hint-dismissed"
		}
	))

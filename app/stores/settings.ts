import { create } from "zustand"
import { persist } from "zustand/middleware"

interface State {
	isAdvancedModeEnabled: boolean;
}
interface Actions {
	toggleAdvancedMode: () => void;
}
export const useSettingsStore = create<State & Actions>()(
	persist((set) => ({
		isAdvancedModeEnabled: false,
		toggleAdvancedMode: () => set(state => ({ isAdvancedModeEnabled: !state.isAdvancedModeEnabled }))
	}), { name: "settings" }))


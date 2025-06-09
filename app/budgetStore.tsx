import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateId } from "./generateId";

export interface Pending {
	label: string;
	value: number;
	isPayed: boolean;
	id: string;
}

export interface Budget {
	name: string,
	currentBudget: number | undefined,
	startBudget: number | undefined,
	offset: number | undefined,
	pendingEntries: Pending[]
}
interface BudgetsStore {
	budgets: Record<string, Budget>,
	currBudgetId: string,
	setBudget: (budget: Partial<Budget>) => void,
	setPendingEntries: (setter: (pending: Pending[]) => Pending[]) => void,
	addBudget: () => void,
	removeBudget: (id: string) => void,
	selectBudget: (id: string) => void,
}

const defaultBudgetId = "default-budget-id"
const defaultBudget: Budget = {
	name: "Default",
	currentBudget: 635,
	startBudget: 1000,
	offset: undefined,
	pendingEntries: []
}

export const useBudgetsStore = create<BudgetsStore>()(
	persist((set) => ({
		budgets: {
			[defaultBudgetId]: defaultBudget,
		},
		currBudgetId: defaultBudgetId,
		setBudget: (budget: Partial<Budget>) => {
			return set(state => {
				const newState = { ...state.budgets, [state.currBudgetId]: { ...state.budgets[state.currBudgetId], ...budget } }
				return { budgets: newState }
			})
		},
		addBudget: () => set(state => {
			const id = generateId()
			return {
				budgets: { ...state.budgets, [id]: defaultBudget },
				currBudgetId: id
			}
		}),
		setPendingEntries: (setter: (before: Pending[]) => Pending[]) => set(state => {
			const existing = state.budgets[state.currBudgetId].pendingEntries
			const budgets = { ...state.budgets, [state.currBudgetId]: { ...state.budgets[state.currBudgetId], pendingEntries: setter(existing) } }
			return { budgets }
		}
		),
		removeBudget: (idToDelete: string) => set(state => {
			const filtered = Object.entries(state.budgets).reduce((acc, [id, budget]) => {
				if (idToDelete === id) {
					return acc
				}
				return { ...acc, [id]: budget }
			}, {} as Record<string, Budget>)
			if (idToDelete === state.currBudgetId) {
				return { budgets: filtered, currBudgetId: Object.keys(filtered)[0] }
			}
			return { budgets: filtered }
		}),
		selectBudget: (id) => set(state => ({ currBudgetId: id }))
	}),
		{
			name: "budgets"
		}
	))

export const useBudgetStore = () => {
	const budget = useBudgetsStore(state => state.budgets[state.currBudgetId])
	const setPendingEntries = useBudgetsStore(state => state.setPendingEntries)

	const { startBudget, currentBudget, offset: budgetOffset, pendingEntries: nullablePendingEntries } = budget
	const pendingEntries = nullablePendingEntries ?? []

	const payedFixedCosts = pendingEntries
		.filter((entry) => entry.isPayed)
		.reduce((acc, entry) => acc + entry.value, 0);
	const pendingFixedCosts = pendingEntries
		.filter((entry) => !entry.isPayed)
		.reduce((acc, entry) => acc + entry.value, 0);

	const addPendingEntry = (pending: Pending) => {
		setPendingEntries(existing => ([...existing, pending]))
	}
	const deletePendingEntry = (toDelete: string) => {
		setPendingEntries(existing => existing.filter(({ id }) => id !== toDelete))
	}
	const togglePendingEntry = (toToggle: string) => {
		setPendingEntries(existing => existing.map(entry => {
			if (entry.id !== toToggle) {
				return entry
			}
			return { ...entry, isPayed: !entry.isPayed }
		}))
	}
	return {
		startBudget, currentBudget, budgetOffset: budgetOffset ?? 0, pendingEntries, payedFixedCosts, pendingFixedCosts, addPendingEntry, deletePendingEntry, togglePendingEntry
	}
}

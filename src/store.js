import { createSlice, configureStore, current } from "@reduxjs/toolkit";

const cokeSlice = createSlice({
  name: "coke",
  initialState: {
    activeIngredientId: 100,
    ingredients: [
      { id: 100, name: "Coke Part 1" },
      { id: 101, name: "Coke Part 2" },
      { id: 102, name: "Diet Coke Part 1" },
      { id: 103, name: "Diet Coke Part 2" },
      { id: 104, name: "Fanta" },
      { id: 105, name: "Sprite" },
      { id: 106, name: "Powerade" },
      { id: 107, name: "Lemon" },
    ],
    assignedIngredients: [],
    slots: [],
  },
  reducers: {
    loadIngredients: (state) => {
      state.slots = [
        { slotId: "S1", ingredient: null },
        { slotId: "S2", ingredient: null },
        { slotId: "S3", ingredient: null },
        { slotId: "S4", ingredient: null },
        { slotId: "S5", ingredient: null },
        { slotId: "S6", ingredient: null },
        { slotId: "S7", ingredient: null },
        { slotId: "S8", ingredient: null },
      ];
    },
    assign: (state, action) => {
      const updatedSlots = current(state).slots.map((slot) => {
        if (slot.slotId !== action.payload.slotId) {
          return slot;
        }

        const ing = current(state).ingredients.find(
          (i) => i.id === current(state).activeIngredientId
        );

        state.assignedIngredients = [...state.assignedIngredients, ing];

        return {
          ...action.payload,
          ingredient: ing.name,
        };
      });

      state.slots = updatedSlots;
      state.ingredients = current(state).ingredients.filter(
        (i) => i.id !== current(state).activeIngredientId
      );
      state.activeIngredientId = current(state).ingredients[0].id;
      return;
    },
    unassign: (state, action) => {
      const updatedSlots = current(state).slots.map((slot) => {
        if (slot.slotId !== action.payload.slotId) {
          return slot;
        }

        return {
          ...action.payload,
          ingredient: null,
        };
      });

      const ing = current(state).assignedIngredients.find(
        (i) => i.name === action.payload.ingredient
      );

      state.slots = updatedSlots;
      state.ingredients = [...current(state).ingredients, ing];
      const updatedIngs = current(state).assignedIngredients.filter(
        (i) => i?.id !== ing?.id
      );
      state.assignedIngredients = updatedIngs;
      return;
    },
    selected: (state, action) => {
      state.activeIngredientId = action.payload;
    },
  },
});

export const { assign, loadIngredients, selected, unassign } = cokeSlice.actions;

const store = configureStore({
  reducer: cokeSlice.reducer,
});

store.dispatch(cokeSlice.actions.loadIngredients())
// store.subscribe(() => console.log(store.getState()));

export default store;

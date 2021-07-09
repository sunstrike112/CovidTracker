import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCocktail: [],
  isLoading: false,
  searchInput: '',
};

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    toggleLoading(state, action) {
      state.isLoading = !state.isLoading;
    },
    addToCart(state, action) {
      if (!state.selectedCocktail) {
        let cart = {
          idDrink: action.payload.idDrink,
          quantity: 1,
          strDrinkThumb: action.payload.strDrinkThumb,
          strDrink: action.payload.strDrink,
        };
        state.selectedCocktail.push(cart);
      } else {
        let isDuplicateDrink = false;
        state.selectedCocktail.map((item, key) => {
          if (item.idDrink == action.payload.idDrink) {
            state.selectedCocktail[key].quantity++;
            isDuplicateDrink = true;
          }
        });
        if (!isDuplicateDrink) {
          let cart = {
            idDrink: action.payload.idDrink,
            quantity: 1,
            strDrinkThumb: action.payload.strDrinkThumb,
            strDrink: action.payload.strDrink,
          };
          state.selectedCocktail.push(cart);
        }
      }
    },
    removeFromCart(state, action) {
      const filteredCocktail = state.selectedCocktail.filter(
        (item) => item.idDrink !== action.payload
      );
      state.selectedCocktail = filteredCocktail;
    },
    increaseQuantity(state, action) {
      state.selectedCocktail.map((item, key) => {
        if (item.idDrink == action.payload)
          state.selectedCocktail[key].quantity++;
      });
    },
    decreaseQuantity(state, action) {
      state.selectedCocktail.map((item, key) => {
        if (item.idDrink == action.payload)
          state.selectedCocktail[key].quantity--;
      });
      const filteredCocktail = state.selectedCocktail.filter(
        (item) => item.quantity > 0
      );
      state.selectedCocktail = filteredCocktail;
    },
    saveSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    logOut(state, action) {
      return initialState;
    },
  },
});

const { actions, reducer } = globalSlice;
export { actions as GlobalActions, reducer as GlobalReducer };

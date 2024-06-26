import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { ReduxState } from "../store";
import { CartItemType } from "../../types/index";

export interface CartItemState {
  cartItems: Array<CartItemType>;
  qty: number;
  total: number;
  isLoading: boolean;
}

const url = "/api/addcartitems";

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    try {
      const resp = await axios.get(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);

const initialState: CartItemState = {
  cartItems: [],
  qty: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      state.cartItems = [action.payload, ...state.cartItems];
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.prodId !== itemId
      );
    },
    increase: (state, action: PayloadAction<number>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItem: any = state.cartItems.find(
        (item: { prodId: number }) => item.prodId === action.payload
      );
      cartItem.qty = cartItem.qty + 1;
    },
    decrease: (state, { payload }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartItem: any = state.cartItems.find(
        (item: { prodId: number }) => item.prodId === payload
      );
      cartItem.qty = cartItem?.qty - 1;
    },
    calculateTotals: (state) => {
      let qty = 0;
      let total = 0;
      state.cartItems.forEach((item: { qty: number; price: number }) => {
        qty += item.qty;
        total += item.qty * item.price;
      });
      state.qty = qty;
      state.total = total;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCartItems.fulfilled,
        (state, action: PayloadAction<Array<CartItemType>>) => {
          state.isLoading = false;
          state.cartItems = action.payload;
        }
      )
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const selectAllCartItems = (state: ReduxState) => state.cartItems;

export const {
  addToCart,
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { InventoryProps, InventoryState } from "../typings";

export const setupInventoryReducer: CaseReducer<
  InventoryState,
  PayloadAction<{
    playerInventory: InventoryProps;
    rightInventory: InventoryProps;
  }>
> = (state, action) => {
  state.playerInventory = {
    ...action.payload.playerInventory,
    items: Array.from(
      {
        ...action.payload.playerInventory.items,
        length: action.payload.playerInventory.slots,
      },
      (item, index) => item || { slot: index + 1 }
    ),
  };
  state.rightInventory = {
    ...action.payload.rightInventory,
    items: Array.from(
      {
        ...action.payload.rightInventory.items,
        length: action.payload.rightInventory.slots,
      },
      (item, index) => item || { slot: index + 1 }
    ),
  };
};

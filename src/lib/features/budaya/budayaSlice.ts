import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BudayaService from "./budayaService";
import { AddBudaya } from "@/utils/types/addBudaya";
import { Budaya } from "@/utils/types/budaya";

export interface BudayaState {
  budaya: Budaya | null;
  status: string;
  error: string | null;
  image: any[] | null;
}

const initialState: BudayaState = {
  budaya: null,
  status: "",
  error: null,
  image: [],
};

export const addBudaya = createAsyncThunk(
  "budaya/add",
  async (budaya: AddBudaya, thunkAPI) => {
    try {
      const payload = await BudayaService.addBudaya(budaya);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBudaya = createAsyncThunk(
  "budaya/delete",
  async (id: string, thunkAPI) => {
    try {
      const payload = await BudayaService.deleteBudaya(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBudaya = createAsyncThunk(
  "budaya/update",
  async ({ id, budaya }: { id: string; budaya: AddBudaya }, thunkAPI) => {
    try {
      const payload = await BudayaService.updateBudaya(id, budaya);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findOneBudaya = createAsyncThunk(
  "budaya/findOne",
  async (id: string, thunkAPI) => {
    try {
      const payload = await BudayaService.findOneBudaya(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findAllBudaya = createAsyncThunk(
  "budaya/findAll",
  async (_, thunkAPI) => {
    try {
      const payload = await BudayaService.fetchAllBudaya();
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const budayaSlice = createSlice({
  name: "budaya",
  initialState,
  reducers: {
    setDatabudaya: (state, action) => {
      state.budaya = { ...state.budaya, ...action.payload };
    },
    emtpyDatabudaya: (state) => {
      state.budaya = null;
    },
    setFetchImage: (state, action) => {
      state.image = action.payload;
    },
    addImage: (state, action) => {
      if (state.image !== null) {
        state.image.push(action.payload);
      }
    },
    updateImage: (state, action) => {
      const { index, newValue } = action.payload;
      if (state.image !== null) {
        state.image[index] = newValue;
      }
    },
    deleteImage: (state, action) => {
      const index = action.payload;
      if (state.image !== null) {
        state.image.splice(index, 1);
      }
    },
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBudaya.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addBudaya.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(addBudaya.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(deleteBudaya.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteBudaya.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteBudaya.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(updateBudaya.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateBudaya.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updateBudaya.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(findOneBudaya.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findOneBudaya.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(findOneBudaya.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(findAllBudaya.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findAllBudaya.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
  },
});

export const {
  setDatabudaya,
  emtpyDatabudaya,
  addImage,
  updateImage,
  setLoading,
  setFetchImage,
  deleteImage,
} = budayaSlice.actions;
export const budayaReducer = budayaSlice.reducer;

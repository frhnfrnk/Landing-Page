import { Umkm } from "@/utils/types/umkm";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import umkmService from "./umkmService";
import { AddUmkm } from "@/utils/types/addUmkm";

export interface UmkmState {
  umkm: Umkm | null;
  status: string;
  error: string | null;
  image: any[] | null;
}

const initialState: UmkmState = {
  umkm: null,
  status: "",
  error: null,
  image: [],
};

export const addUmkm = createAsyncThunk(
  "umkm/add",
  async (umkm: AddUmkm, thunkAPI) => {
    try {
      const payload = await umkmService.addUmkm(umkm);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUmkm = createAsyncThunk(
  "umkm/delete",
  async (id: string, thunkAPI) => {
    try {
      const payload = await umkmService.deleteUmkm(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUmkm = createAsyncThunk(
  "umkm/update",
  async ({ id, umkm }: { id: string; umkm: AddUmkm }, thunkAPI) => {
    try {
      const payload = await umkmService.updateUmkm(id, umkm);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findOneUmkm = createAsyncThunk(
  "umkm/findOne",
  async (id: string, thunkAPI) => {
    try {
      const payload = await umkmService.findOneUmkm(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findAllUmkm = createAsyncThunk(
  "umkm/findAll",
  async (_, thunkAPI) => {
    try {
      const payload = await umkmService.fetchAllUmkm();
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const umkmSlice = createSlice({
  name: "umkm",
  initialState,
  reducers: {
    setDataUmkm: (state, action) => {
      state.umkm = { ...state.umkm, ...action.payload };
    },
    emtpyDataUmkm: (state) => {
      state.umkm = null;
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
    setLoading: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addUmkm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addUmkm.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(addUmkm.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(deleteUmkm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteUmkm.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteUmkm.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(updateUmkm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUmkm.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updateUmkm.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(findOneUmkm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findOneUmkm.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(findOneUmkm.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(findAllUmkm.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findAllUmkm.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
  },
});

export const {
  setDataUmkm,
  emtpyDataUmkm,
  addImage,
  updateImage,
  setLoading,
  setFetchImage,
} = umkmSlice.actions;
export const umkmReducer = umkmSlice.reducer;

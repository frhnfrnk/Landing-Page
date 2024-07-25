import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Peternakan } from "@/utils/types/peternakan";
import { AddPeternakan } from "@/utils/types/addPeternakan";
import peternakanService from "./peternakanService";

export interface PeternakanState {
  peternakan: Peternakan | null;
  status: string;
  error: string | null;
  image: any[] | null;
}

const initialState: PeternakanState = {
  peternakan: null,
  status: "",
  error: null,
  image: [],
};

export const addPeternakan = createAsyncThunk(
  "peternakan/add",
  async (peternakan: AddPeternakan, thunkAPI) => {
    try {
      const payload = await peternakanService.addPeternakan(peternakan);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findOnePeternakan = createAsyncThunk(
  "peternakan/findOne",
  async (id: string, thunkAPI) => {
    try {
      const payload = await peternakanService.findOnePeternakan(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findAllPeternakan = createAsyncThunk(
  "peternakan/findAll",
  async (_, thunkAPI) => {
    try {
      const payload = await peternakanService.fetchAllPeternakan();
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const peternakanSlice = createSlice({
  name: "peternakan",
  initialState,
  reducers: {
    setDataPeternakan: (state, action) => {
      state.peternakan = { ...state.peternakan, ...action.payload };
    },
    emtpyDataPeternakan: (state) => {
      state.peternakan = null;
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
    deleteImage: (state, action) => {
      const index = action.payload;
      if (state.image !== null) {
        state.image.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPeternakan.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addPeternakan.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(addPeternakan.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(findOnePeternakan.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findOnePeternakan.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(findOnePeternakan.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(findAllPeternakan.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findAllPeternakan.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
  },
});

export const {
  setDataPeternakan,
  emtpyDataPeternakan,
  addImage,
  updateImage,
  setLoading,
  setFetchImage,
  deleteImage,
} = peternakanSlice.actions;
export const peternakanReducer = peternakanSlice.reducer;

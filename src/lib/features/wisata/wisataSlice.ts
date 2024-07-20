import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Wisata } from "@/utils/types/wisata";
import { AddWisata } from "@/utils/types/addWisata";
import wisataService from "./wisataService";

export interface WisataState {
  wisata: Wisata | null;
  status: string;
  error: string | null;
  image: any[] | null;
}

const initialState: WisataState = {
  wisata: null,
  status: "",
  error: null,
  image: [],
};

export const addWisata = createAsyncThunk(
  "wisata/add",
  async (wisata: AddWisata, thunkAPI) => {
    try {
      const payload = await wisataService.addWisata(wisata);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteWisata = createAsyncThunk(
  "wisata/delete",
  async (id: string, thunkAPI) => {
    try {
      const payload = await wisataService.deleteWisata(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateWisata = createAsyncThunk(
  "wisata/update",
  async ({ id, wisata }: { id: string; wisata: AddWisata }, thunkAPI) => {
    try {
      const payload = await wisataService.updateWisata(id, wisata);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findOneWisata = createAsyncThunk(
  "wisata/findOne",
  async (id: string, thunkAPI) => {
    try {
      const payload = await wisataService.findOneWisata(id);
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const findAllWisata = createAsyncThunk(
  "wisata/findAll",
  async (_, thunkAPI) => {
    try {
      const payload = await wisataService.fetchAllWisata();
      return payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const wisataSlice = createSlice({
  name: "wisata",
  initialState,
  reducers: {
    setDatawisata: (state, action) => {
      state.wisata = { ...state.wisata, ...action.payload };
    },
    emtpyDatawisata: (state) => {
      state.wisata = null;
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
    builder.addCase(addWisata.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addWisata.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(addWisata.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(deleteWisata.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteWisata.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(deleteWisata.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(updateWisata.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateWisata.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(updateWisata.rejected, (state, action) => {
      state.status = "failed";
    });
    builder.addCase(findOneWisata.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findOneWisata.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(findOneWisata.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(findAllWisata.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(findAllWisata.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
  },
});

export const {
  setDatawisata,
  emtpyDatawisata,
  addImage,
  updateImage,
  setLoading,
  setFetchImage,
  deleteImage,
} = wisataSlice.actions;
export const wisataReducer = wisataSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { Item } from "@/interfaces";
import { Web5 } from "@web5/api";
import { capitalizeFirstLetter, trimInputSpaces } from "@/utils";
import { toast } from "@/components/toast";
import axios from "axios";
import { CREATE_RECORD } from "@/querys/graphql";
import { useMutation } from "@apollo/client";

export interface MarketplaceState {
  web5Instance: Web5 | null;
  records: any[];
  loading: boolean;
  isLoading: boolean;
  error: string | null | undefined;
  user: undefined;
}

const initialState: MarketplaceState = {
  web5Instance: null,
  records: [],
  loading: false,
  error: null,
  isLoading: false,
  user: undefined,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setRecords: (state, action: PayloadAction<any>) => {
      state.records = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLocalStorage: (state, action: PayloadAction<undefined>) => {
      state.user = action.payload;
    },
  },
});

// export const initWeb5 = (): AppThunk => async (dispatch) => {
//   try {
//     dispatch(setLoading(true));

//     const { web5, did } = await Web5.connect({ sync: "5s" });

//     if (web5 && did) {
//       // dispatch(setWeb5Instance(web5));
//       dispatch(setUserDid(did));
//       dispatch(setLoading(false));

//       console.log("Web5 initialized");
//     }
//   } catch (error) {
//     console.log(error);
//     dispatch(setLoading(false));
//   }
// };

export const getRecords = (): AppThunk => async (dispatch) => {
  try {
    // const { web5, did } = await Web5.connect({ sync: "5s" });

    dispatch(setLoading(true));
    // const { records } = await web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       schema: "https://schema.org/Record",
    //       dataFormat: "application/json",
    //     },
    //   },
    // });

    // if (records) {
    //   let allRecordData = [];

    //   for (const record of records) {
    //     let { record: individualRecord } = await web5.dwn.records.read({
    //       message: {
    //         filter: {
    //           recordId: record.id,
    //         },
    //       },
    //     });

    //     const data = await individualRecord.data.json();
    //     console.log("data", data);

    //     allRecordData.push(data);
    //   }
    //   dispatch(setRecords(allRecordData));

    const response = await axios.get("/api/record");
    if (response.status === 200) {
      const data = response.data;
      dispatch(setRecords(data));
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setLoading(false));
  }
};

export const createRecord =
  ({ name, description, imageUrl, collection, price }: Item): AppThunk =>
  async (dispatch) => {
    const { did } = await Web5.connect({ sync: "5s" });
    const [createCollection, { loading, error }] = useMutation(CREATE_RECORD);

    console.log("loading", loading);
    console.log("error", error);

    const trimmedName = trimInputSpaces(name || "");
    const trimmedDescription = trimInputSpaces(description || "");
    const trimmedImage = trimInputSpaces(imageUrl || "");
    const trimmedCollection = trimInputSpaces(collection || "");
    const trimmedPrice = trimInputSpaces(price || "");

    if (
      !trimmedName ||
      !trimmedDescription ||
      !trimmedImage ||
      !trimmedCollection ||
      !trimmedPrice
    ) {
      return toast({
        message: "Please fill out all fields",
        position: "top",
      });
    }

    dispatch(setLoading(true));

    try {
      dispatch(setLoading(true));

      const collectionData = {
        collection: trimmedCollection,
        slug: trimmedCollection,
        description: "",
        owner: did,
        creator: did,
        bannerImage: "",
        profileImage: "",
        items: [
          {
            name: trimmedName,
            price: trimmedPrice,
            description: trimmedDescription,
            imageUrl: trimmedImage,
            owner: did,
            collection: trimmedCollection,
          },
        ],
      };

      await createCollection({
        variables: { collection: collectionData },
      });

      toast({ message: "Created", position: "top" });
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      toast({ message: "Failed", position: "top" });
      dispatch(setLoading(false));
    }
  };

export const getLocalStorage = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    // Retrieve the user JSON string from local storage
    const user = localStorage.getItem("user");

    // If a user JSON string is found, parse it into an object
    if (user) {
      const userObject = JSON.parse(user);
      dispatch(setLocalStorage(userObject));
    }

    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error setting user from local storage:", error);
    dispatch(setLoading(false));
  }
};

export const { setRecords, setLoading, setError, setLocalStorage } =
  marketplaceSlice.actions;

export const selectMarketplaceState = (state: RootState) => state.marketplace;

export default marketplaceSlice.reducer;

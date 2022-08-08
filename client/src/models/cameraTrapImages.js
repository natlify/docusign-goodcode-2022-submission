import Api from "../api/zapeneApi";
import { supabase } from "../utils/supabase";
import _ from "lodash";
const initialState = {
  list: [],
};

export const ctImages = {
  state: initialState, // initial state
  reducers: {
    setList(state, payload) {
      return { ...state, list: payload };
    },
  },
  effects: (dispatch) => ({
    async fetchDataFromSources({ folderId }, rootState) {
      const responseData = await Api.get(
        `/api/media-valet/folder/${folderId}/assets`,
      );
      const {
        payload: { assets: mvImageList },
      } = responseData;

      const { data: imagesFromDB } = await supabase
        .from("camera_trap_assets")
        .select("*")
        .order("created_at");

      const imageKeyMap = _.keyBy(imagesFromDB, (image) => image.asset_id);
      const combinedImageList = mvImageList.map((img) => {
        let verificationStatus = "NONE",
          isSensitive = false,
          lastUpdateAt = img.record.modifiedAt;
        if (imageKeyMap[img.id]) {
          const { status, is_sensitive, updated_at } = imageKeyMap[img.id];
          verificationStatus = status;
          isSensitive = is_sensitive;
          lastUpdateAt = updated_at;
        }
        return {
          ...img,
          verificationStatus,
          isSensitive,
          lastUpdateAt,
        };
      });
      dispatch.ctImages.setList(combinedImageList);
    },
    async incrementAsync(payload, rootState) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    },
  }),
};

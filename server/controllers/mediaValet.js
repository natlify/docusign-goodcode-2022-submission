import * as mediaValet from "../services/@media-valet.js";

const CAM_52663_FOLDER = "7d256341-06e2-4f2b-8d29-0d4ffc1856f5";
export default class mediaValetController {
  static fetchAllImages = async (req) => {
    const { bearer_token } = req.body;
    const { data } = await mediaValet.fetchAllImagesFromCategory({
      token: bearer_token,
      folderID: req.params.folderId || CAM_52663_FOLDER,
    });
    return data;
  };

  static fetchCategoryDetails = async (req) => {
    const { bearer_token } = req.body;

    const { data } = await mediaValet.fetchCategory({
      token: bearer_token,
      folderID: req.params.folderId || CAM_52663_FOLDER,
    });
    return data;
  };
}

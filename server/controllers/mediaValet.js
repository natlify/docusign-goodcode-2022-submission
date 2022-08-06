import * as mediaValet from "../services/@media-valet.js";

export default class mediaValetController {
  static fetchAllImages = async (req) => {
    const { bearer_token } = req.body;
    const response = await mediaValet.fetchCategory({ token: bearer_token });
    return response.data;
  };

  static fetchCategoryDetails = async (req) => {
    const { bearer_token } = req.body;
    const CAM_52663_FOLDER = "7d256341-06e2-4f2b-8d29-0d4ffc1856f5";

    const { data } = await mediaValet.fetchCategory({
      token: bearer_token,
      folderID: req.params.folderId || CAM_52663_FOLDER,
    });
    return data;
  };
}

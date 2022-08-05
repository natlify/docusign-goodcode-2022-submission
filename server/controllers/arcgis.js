import * as esri from "../services/@esri.js";

export default class arcGISController {
  static fetchByCameraId = async (req) => {
    const cameraData = await esri.querySurvey123ByCamera(req.params.cameraId);
    if (!cameraData)
      throw new Error("No matching Camera details found. Please check your ID");
    return cameraData;
  };
}

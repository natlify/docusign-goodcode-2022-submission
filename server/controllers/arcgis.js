import * as esri from "../services/@esri.js";

export default class arcGISController {
  static fetchByCameraId = async (req) => {
    const cameraData = await esri.querySurvey123ByCamera(req.params.cameraId);
    return cameraData.geometry;
  };
}

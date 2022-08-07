import imageToBase64 from "image-to-base64";
import ejs from "ejs";
import util from "util";
import fs from "fs";

const writeFile = util.promisify(fs.writeFile);

export const convertToBase64 = async (url) => {
  const response = await imageToBase64(url);
  return response;
};

export const getRenderedHtml = async (data = {}) => {
  try {
    const htmlString = await ejs
      .renderFile(
        "docTemplates/Sentinels-CTIMDV.ejs",
        {
          imageTitle: "CAM_52663_IMG_0214",
          fileType: "JPG",
          fileSize: "5.4MB",
          colorMode: "sRGB",
          orientation: "Landscape",
          uploadedDate: "06/07/2022",
          cameraImageBase64: await convertToBase64(
            "https://mvsfservicefabricusva.blob.core.windows.net/medialibrary-03cba27e25e74bc6bb54bc2691d52d1b-r/7c12fcebbcde486c8f2a874c52ae67d7/7c12fcebbcde486c8f2a874c52ae67d7/Thumb/IMG_0211.jpg?sv=2017-04-17&sr=b&si=202207201809&sig=RY6Z3zQmRDQj96W6nimkXy%2BtMuKxv%2FtQ5WlxQdScIdM%3D&st=1237-02-01T18%3A37%3A24Z&se=2032-08-05T12%3A12%3A06Z",
          ),
          geoLocationImageBase64: await convertToBase64(
            "https://mvsfservicefabricusva.blob.core.windows.net/medialibrary-03cba27e25e74bc6bb54bc2691d52d1b-r/7c12fcebbcde486c8f2a874c52ae67d7/7c12fcebbcde486c8f2a874c52ae67d7/Thumb/IMG_0211.jpg?sv=2017-04-17&sr=b&si=202207201809&sig=RY6Z3zQmRDQj96W6nimkXy%2BtMuKxv%2FtQ5WlxQdScIdM%3D&st=1237-02-01T18%3A37%3A24Z&se=2032-08-05T12%3A12%3A06Z",
          ),
          latitude: "297482340",
          longitude: "297482340",
          areaDeployed: "Dar es Salaam",
        },
        {},
      )
      .then((output) => output);
    await writeFile("index.html", htmlString, "utf8");
    return htmlString;
  } catch (error) {
    console.log(error);
  }
};

import imageToBase64 from "image-to-base64";
import ejs from "ejs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import fileSize from "filesize";
import dayjs from "dayjs";
import pdf from "html-pdf";


export const convertToBase64 = async (url) => {
  const response = await imageToBase64(url)
  return response
}

export const getRenderedHtml = async (data) => {
  try {
    const { mediaValetData, survey123Data } = data;
    const htmlString = await ejs
      .renderFile(
        path.resolve(__dirname, "../docTemplates/Sentinels-CTIMDV.ejs"),
        {
          imageTitle: mediaValetData.title,
          fileType: mediaValetData.file.fileType,
          fileSize: fileSize(mediaValetData.file.sizeInBytes, { exponent: 2 }),
          colorMode: mediaValetData.file.colorMode,
          orientation: mediaValetData.file.orientation,
          uploadedDate: dayjs(mediaValetData.file.uploadedAt).format(
            "DD/MM/YYYY",
          ),
          cameraImageBase64: await convertToBase64(mediaValetData.media.large),
          geoLocationImageBase64: await convertToBase64(
            "https://mvsfservicefabricusva.blob.core.windows.net/medialibrary-03cba27e25e74bc6bb54bc2691d52d1b-r/7c12fcebbcde486c8f2a874c52ae67d7/7c12fcebbcde486c8f2a874c52ae67d7/Thumb/IMG_0211.jpg?sv=2017-04-17&sr=b&si=202207201809&sig=RY6Z3zQmRDQj96W6nimkXy%2BtMuKxv%2FtQ5WlxQdScIdM%3D&st=1237-02-01T18%3A37%3A24Z&se=2032-08-05T12%3A12%3A06Z",
          ),
          latitude: survey123Data.geometry.x,
          longitude: survey123Data.geometry.y,
          areaDeployed: survey123Data.attributes.name_of_the_area_deployed,
          camSettings: survey123Data.attributes.camera_settings,
        },
        {},
      )
      .then((output) => output);
    // await writeFile("index.html", htmlString, "utf8")
    var options = {
      width: "26.0cm",
      height: "32.7cm",
      border: "0",
    };

    const pdfData = await createPDF(htmlString, options);

    return pdfData;
  } catch (error) {
    console.log(error)
  }
}

const createPDF = (html, options) =>
  new Promise((resolve, reject) => {
    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err !== null) {
        reject(err)
      } else {
        resolve(buffer)
      }
      return buffer
    })
  })

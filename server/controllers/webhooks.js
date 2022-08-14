import { supabase } from "../services/@supabase.js";
import _ from "lodash";
import {
  addKeyWords,
  updateAltText,
  updateAttributes,
} from "../services/@media-valet.js";

export default class webHooksController {
  static handleDocusignConnectEvents = async (req) => {
    const { body } = req;
    const { data, event, bearer_token } = body;
    console.log(JSON.stringify(data, null, 4))
    if (event === "envelope-completed") {
      await supabase
        .from("camera_trap_assets")
        .update({ status: "APPROVED" })
        .match({ docusign_envelope_id: data.envelopeId });
      const { envelopeSummary } = data;
      /** Extract longitude, latitude from custom Fields into keyValue Pairs */
      const customDataAsObj = _.reduce(
        envelopeSummary.customFields.textCustomFields,
        (prev, item) => {
          return { ...prev, [item.name]: item.value };
        },
        {},
      );
      /** Extract keywords, alt from the  signedTab Data*/
      const validatedDataFromVerifier = envelopeSummary.recipients.signers[0];
      const { tabs } = validatedDataFromVerifier;
      const metaDataAsObj = _.reduce(
        tabs.textTabs,
        (prev, item) => {
          return { ...prev, [item.tabLabel]: item.value };
        },
        {},
      );
      const assetId = customDataAsObj.CameraImageId;
      try {
        await updateAltText({
          assetId,
          token: bearer_token,
          altText: metaDataAsObj["z-alt-text"],
        })

        const originalKeyWords = tabs.textTabs
          .filter((ele) => ele.tabLabel === "z-keywords-text")[0]
          .originalValue.split(",")
          .map((str) => str.trim())
        const newKeyWords = metaDataAsObj["z-keywords-text"]
          .split(",")
          .map((str) => str.trim())
        const difference = newKeyWords.filter(
          (x) => !originalKeyWords.includes(x),
        ) // to add
        // eslint-disable-next-line no-unused-vars
        const complement = originalKeyWords.filter(
          (x) => !newKeyWords.includes(x),
        ) // to remove

        await addKeyWords({
          token: bearer_token,
          assetId,
          keyWordList: difference,
        })

        await updateAttributes({
          assetId,
          token: bearer_token,
          lat: -6.823193,
          long: 39.250878,
          isSensitive: false,
        })
        return { customDataAsObj }
      } catch (error) {
        throw new Error(error.message);
      }
    }

    // Insert into notifications table for streaming
  };
}

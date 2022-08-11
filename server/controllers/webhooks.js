import sampleEvent from "../../common/data/sample-event-notification.json" assert { type: "json" };
import { supabase } from "../services/@supabase.js";
import _ from "lodash";

export default class webHooksController {
  static handleDocusignConnectEvents = async (req) => {
    const { body } = req;
    // const body = sampleEvent;
    const { data, event } = body;
    console.log(body);
    if (event === "envelope-completed") {
      const { data: updateData } = await supabase
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
      return metaDataAsObj;
    }

    // Insert into notifications table for streaming
  };;
}

// console.log(await webHooksController.handleDocusignConnectEvents());

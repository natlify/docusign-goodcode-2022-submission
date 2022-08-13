import Api from "../api/zapeneApi";
import { supabase } from "../utils/supabase";
import _ from "lodash";
import { showNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons"
import { closeAllModals } from "@mantine/modals"
const initialState = {
  list: [],
}

export const ctImages = {
  state: initialState, // initial state
  reducers: {
    setList(state, payload) {
      return { ...state, list: payload }
    },
  },
  effects: (dispatch) => ({
    async fetchDataFromSources(payload, rootState) {
      const folderId = rootState.settings.mediaValetDirectoryID
      const responseData = await Api.get(
        `/media-valet/folder/${folderId}/assets`,
      )
      const {
        payload: { assets: mvImageList },
      } = responseData

      const { data: imagesFromDB } = await supabase
        .from("camera_trap_assets")
        .select("*")
        .order("created_at")

      const imageKeyMap = _.keyBy(imagesFromDB, (image) => image.asset_id)
      const combinedImageList = mvImageList.map((img) => {
        let verificationStatus = "NONE",
          isSensitive = false,
          lastUpdateAt = img.record.modifiedAt
        if (imageKeyMap[img.id]) {
          const { status, is_sensitive, updated_at } = imageKeyMap[img.id]
          verificationStatus = status
          isSensitive = is_sensitive
          lastUpdateAt = updated_at
        }
        return {
          ...img,
          verificationStatus,
          isSensitive,
          lastUpdateAt,
        }
      })
      dispatch.ctImages.setList(combinedImageList)
    },
    async incrementAsync(payload, rootState) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      dispatch.count.increment(payload)
    },

    async triggerDocuSignDocumentFlow(
      { imageData, reviewers = [], isSensitive = false },
      rootState,
    ) {
      const { user } = rootState

      /** extract Camera name from the title */
      // For NOW HardCode it as the images don't follow the naming convention
      const CAMERA_NAME_ID = "CAM_52663"

      /** STEP 2 MAke the API Call to Survey123 to get the data */
      const survey123MetaData = await Api.get(
        `/arcgis/survey123/camera/${CAMERA_NAME_ID}`,
      )

      /** STEP 3 Combine both the Data and make API call to our backend */
      const redirectResult = await Api.post(`/camera-trap/triggerFlow`, {
        recipients: {
          signerEmail: user.email, // should be read from the userDetails
          signerFullName: user.fullName || "Verifier Joe",
          reviewers, // reviewers will be empty for normal flow (non-sensitive)
        },
        signerClientId: "3400",
        isSensitive,
        mediaValetData: imageData,
        survey123Data: survey123MetaData,
      })

      showNotification({
        title: "Document Generated",
        message: "DocuSign Envelope Generated",
        icon: <IconCheck size={15} />,
        color: "green",
      })

      /** STEP 4 Insert into supabase for tracking statuses */
      await supabase.from("camera_trap_assets").upsert([
        {
          asset_id: imageData.id,
          title: imageData.title,
          status: "IN_REVIEW",
          is_sensitive: isSensitive,
          docusign_envelope_id: redirectResult.envelopeId,
        },
      ])

      closeAllModals()
      return redirectResult.redirectUrl
    },
  }),
}

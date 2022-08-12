import { Container, LoadingOverlay, SimpleGrid, Title } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { IconBug, IconFilePencil, IconPencil } from "@tabler/icons"
import { useEffect } from "react"
import ImageCard from "../components/ImageCard"
import { useDispatch, useSelector } from "react-redux"
import Loading from "../components/Loading"
import { openModal } from "@mantine/modals"
import SensitiveModal from "../components/SensitiveModal"

const ImageGallery = () => {
  const imageData = useSelector((root) => root.ctImages.list)
  const isLoading = useSelector(
    (root) => root.loading.effects.ctImages.fetchDataFromSources,
  )
  const showDocuSignClick = useSelector((root) => !root.user.acceptedClick)
  const handleVerifyFlow = async (
    imageData,
    isSensitive = false,
    reviewers = [],
  ) => {
    const redirectUrl = await dispatch.ctImages.triggerDocuSignDocumentFlow({
      imageData,
      isSensitive,
      reviewers,
    })
    window.location = redirectUrl
  }

  const openNextFlowModal = (imageData) =>
    openModal({
      title: <Title order={5}>🔒 Secure Images With</Title>,
      children: (
        <SensitiveModal
          onConfirmHandler={({ isSensitive, reviewers }) =>
            handleVerifyFlow(imageData, isSensitive, reviewers)
          }
        />
      ),
    })

  useEffect(() => {
    // eslint-disable-next-line no-undef
    docuSignClick.Clickwrap.render(
      {
        environment: "https://demo.docusign.net",
        accountId: "77c8b115-51ee-4f06-9979-ca9e73968e8e",
        clickwrapId: "a2a6a91f-131e-4d48-b15a-0bb7bfdd0d96",
        clientUserId: "ZAP_WEB_CLIENT_996",
        documentData: {
          fullName: "Arjith",
          email: "arjith496@gmail.com",
          company: "Zapene.app",
          title: "CTO",
        },
      },
      "#ds-clickwrap",
    )
  }, [])

  // useEffect(() => {
  //   const sleep = async () => {
  //     let sec
  //     sec = 10
  //     await new Promise((resolve) => setTimeout(resolve, sec * 1000))
  //     showNotification({
  //       title: "Document Verified & Signed",
  //       message: "arjith@thinkjs.club verified your correction for IMG_0211",
  //       icon: <IconFilePencil size={15} />,
  //       color: "green",
  //       autoClose: false,
  //     })
  //     sec = 8
  //     await new Promise((resolve) => setTimeout(resolve, sec * 1000))
  //     showNotification({
  //       title: "Document Verified & Signed",
  //       message: "arjith@thinkjs.club verified your correction for IMG_0211",
  //       icon: <IconFilePencil size={15} />,
  //       color: "green",
  //       autoClose: false,
  //     })
  //     sec = 12
  //     await new Promise((resolve) => setTimeout(resolve, sec * 1000))
  //     showNotification({
  //       title: "Document Verified & Signed",
  //       message: "arjith496@gmail.com verified your correction for IMG_0211",
  //       icon: <IconFilePencil size={15} />,
  //       color: "green",
  //       autoClose: false,
  //     })
  //     sec = 12
  //     await new Promise((resolve) => setTimeout(resolve, sec * 1000))
  //     showNotification({
  //       title: "Document Verified & Signed",
  //       message:
  //         "jayantha.natarajan@gmail.com verified your correction for IMG_0211",
  //       icon: <IconFilePencil size={15} />,
  //       color: "green",
  //       autoClose: false,
  //     })
  //   }
  //   sleep()
  // }, [])

  const items = imageData.map((item, index) => (
    <ImageCard
      key={item.id}
      data={item}
      index={index}
      onSensitiveClick={() => openNextFlowModal(item)}
      onTriggerClick={handleVerifyFlow}
    />
  ))
  const visible = useSelector(
    (root) => root.loading.effects.ctImages.triggerDocuSignDocumentFlow,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const getTasks = async () => {
      try {
        // setTasks(data);
        await dispatch.ctImages.fetchDataFromSources({
          folderId: "7d256341-06e2-4f2b-8d29-0d4ffc1856f5",
        })
        // throw new Error("Sample Error Message");
      } catch (error) {
        showNotification({
          title: "Something went wrong!",
          message: "Failed to fetch tasks",
          icon: <IconBug size={15} />,
          color: "red",
        })
      }
    }
    getTasks()
  }, [])
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
      <Container>
        <LoadingOverlay visible={visible} overlayBlur={2} />
        <SimpleGrid spacing={50} cols={3}>
          {items}
        </SimpleGrid>
      </Container>
    </>
  )
}

export default ImageGallery

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
        await dispatch.ctImages.fetchDataFromSources();
      } catch (error) {
        showNotification({
          title: "Something went wrong!",
          message: "Failed to fetch tasks",
          icon: <IconBug size={15} />,
          color: "red",
        });
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

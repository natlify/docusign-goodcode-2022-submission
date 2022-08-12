import { useEffect } from "react"
import { Container, Title } from "@mantine/core"
import { PageLayout } from "../layouts/PageLayout"
import Loading from "../components/Loading"
import { useDispatch } from "react-redux"

const SignOut = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      dispatch.user.logout()
    }, 1000)
  }, [])

  return (
    <Container>
      <PageLayout>
        <Container size={620} my={40}>
          <Title
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Signing Out
          </Title>
          <Loading />
        </Container>
      </PageLayout>
    </Container>
  )
}

export default SignOut

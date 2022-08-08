import { Loader, Stack } from "@mantine/core"


const Loading = () => {
    return (<Stack align={"center"} justify={"center"}>
        <Loader variant="bars" />
    </Stack>)
}


export default Loading
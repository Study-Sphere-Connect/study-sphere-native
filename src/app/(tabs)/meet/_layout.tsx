import { Stack } from "expo-router"

const MeetStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Meet" }} />
        </Stack>
    )
}

export default MeetStack
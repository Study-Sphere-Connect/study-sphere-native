import { Stack } from "expo-router"

const MeetStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Meet" }} />
            <Stack.Screen name="prejoin" options={{headerShown:false}} />
        </Stack>
    )
}

export default MeetStack
import { Stack } from "expo-router"

const ConversationsStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Conversations" }} />
        </Stack>
    )
}

export default ConversationsStack
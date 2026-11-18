import { useMutation } from "@tanstack/react-query";

import { getRequestToken, validateLogin, createSession, getAccountDetails } from "@/api/api";

async function loginUser({ username, password }) {
    const token = await getRequestToken();
    if (!token?.success) {
        throw new Error("Failed to fetch request token.");
    }

    const auth = await validateLogin({
        username,
        password,
        request_token: token.request_token,
    });
    if (!auth?.success) {
        throw new Error("Invalid credentials.");
    }

    const session = await createSession({
        request_token: token.request_token,
    });
    if (!session?.success) {
        throw new Error("Failed to create session.");
    }

    const account = await getAccountDetails(session?.session_id);

    return {
        sessionId: session?.session_id,
        account,
    };
}

export function useLogin() {
    return useMutation({
        mutationFn: loginUser,
    });
}

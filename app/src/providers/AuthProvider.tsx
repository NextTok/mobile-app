import { useStorageState } from "@app/hooks/useStorageState";
import { useLogin } from "@app/react-query/mutations/useLogin";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useCallback,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import env from "@app/env";
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

type AuthContextValue = {
  signIn: (handle: string) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  const { mutateAsync } = useLogin();

  const signIn = useCallback(
    async (handle: string) => {
      try {
        const { url } = await mutateAsync({ handle });

        const result = await WebBrowser.openAuthSessionAsync(
          url,
        );

        if (result.type === "success") {
            const queryParams = new URLSearchParams(new URL(result.url).search);
            const success = queryParams.get("success") === "true";
            
            if (success) {
                const did = queryParams.get("did");

                setSession(did);

                router.replace('/(app)/(tabs)')
            }
            else {
                setSession(null);
            }
        }
      } catch (error) {
        setSession(null);
        console.log(error);
      }
    },
    [mutateAsync]
  );

  const signOut = useCallback(() => {
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

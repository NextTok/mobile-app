import { useStorageState } from "@app/hooks/useStorageState";
import { useLogin } from "@app/react-query/mutations/useLogin";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import * as WebBrowser from "expo-web-browser";
import { router } from "expo-router";
import { useLogout } from "@app/react-query/mutations/useLogout";
import { useUserInfo } from "@app/react-query/queries/useUserInfo";
import { ProfileViewDetailed } from "@niknak/app-sdk";

WebBrowser.maybeCompleteAuthSession();

type AuthContextValue = {
  signIn: (handle: string) => Promise<void>;
  signOut: () => void;
  did?: string | null;
  isLoading: boolean;
  profile: ProfileViewDetailed | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped in a <AuthProvider />");
  }

  return value;
}

export function useUser() {
  const value = useContext(AuthContext);

  if (!value || !value.profile) {
    throw new Error("useAuth must be wrapped in a <AuthProvider />");
  }

  return value.profile
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoadingDid, did], setDid] = useStorageState("did");
  const [[isLoadingHandle], setHandle] = useStorageState("handle");

  const { mutateAsync: login } = useLogin();
  const { mutateAsync: logout } = useLogout();
  const { refetch: getProfile, data: profile } = useUserInfo();

  const signIn = useCallback(
    async (handle: string) => {
      try {
        setHandle(handle);

        const { url } = await login({ handle });

        const result = await WebBrowser.openAuthSessionAsync(url);

        if (result.type === "success") {
          const queryParams = new URLSearchParams(new URL(result.url).search);
          const success = queryParams.get("success") === "true";

          if (success) {
            const did = queryParams.get("did");

            setDid(did);

            await getProfile();
          } else {
            setDid(null);
          }
        }
      } catch (error) {
        setDid(null);
        console.log(error);
      }
    },
    [login]
  );

  const signOut = useCallback(async () => {
    setDid(null);
    router.replace("/sign-in");

    await logout();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isLoadingDid && did) {
        try {
          await getProfile();

        } catch (error) {
          await signOut();
        }
      }
    })();
  }, [isLoadingDid]);

  useEffect(() => {
    if (profile && did) {
      setHandle(profile.handle);

      router.replace("/(app)/(tabs)");
    }
  }, [profile, did])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        did,
        isLoading: isLoadingDid || isLoadingHandle,
        profile: profile ?? null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

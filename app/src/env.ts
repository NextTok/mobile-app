import Constants from "expo-constants";
import { Platform } from "react-native";

function getEnvVar(key: string) {
  const env = Constants.expoConfig?.extra?.env;

  if (env) {
    return env[key];
  } else {
    console.error(`${key} not found.`);
    return '';
  }
}

export const APP_SERVER_URL = getEnvVar("APP_SERVER_URL") as string;
export const APP_ENV = getEnvVar("APP_ENV") as string;
export const DETOX_RUNNING = getEnvVar("DETOX_RUNNING") as string;
export const FORCE_INTRO = getEnvVar("FORCE_INTRO") as string;
export const APP_SERVER_PORT = getEnvVar("APP_SERVER_PORT") as string;


const env = {
  APP_SERVER_URL: APP_ENV === "development" && Platform.OS === "web" ? `http://localhost:${APP_SERVER_PORT ?? "8000"}` : APP_SERVER_URL,
  APP_ENV,
  DETOX_RUNNING: DETOX_RUNNING === "true" && APP_ENV === "development",
  FORCE_INTRO: FORCE_INTRO === "true" && APP_ENV === "development",
  APP_SERVER_PORT
};

export default env;
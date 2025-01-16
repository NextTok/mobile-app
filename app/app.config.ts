import { ExpoConfig, ConfigContext } from "@expo/config";
import ip from "ip";
import dotenv from "dotenv";

dotenv.config();

const {
  APP_ENV = "development",
  APP_SERVER_URL,
  DETOX_RUNNING,
  FORCE_INTRO,
  STORIES_BETA = "false",
  APP_SERVER_PORT = "8000",
} = process.env;

function getAppServerUrl() {
  if (APP_ENV === "development") {
    if (APP_SERVER_URL) return APP_SERVER_URL;

    return `http://${ip.address("public", "ipv4")}:${APP_SERVER_PORT}`;
  }

  return APP_SERVER_URL;
}

function getEnvVars() {
  return {
    APP_SERVER_URL: getAppServerUrl(),
    APP_ENV,
    DETOX_RUNNING,
    FORCE_INTRO,
    STORIES_BETA,
    APP_SERVER_PORT,
  };
}

const packageJson = require("./package.json");

function getFinalConfig(context: ConfigContext): { expo: ExpoConfig } {
  const envVars = getEnvVars();

  const bundleIdentifier =
    APP_ENV === "production" ? "com.niknak.app" : "com.niknak-dev.app";

  const androidPackage = "com.niknak.app";

  const slug = APP_ENV === "production" ? "niknak" : "niknak-dev";

  const name = APP_ENV === "production" ? "NikNak" : "NikNak Dev";

  const projectId =
    APP_ENV === "production"
      ? "54454ddb-a6e9-4cd0-826c-e957f1881a96"
      : "d9ae2efa-9de0-444b-906e-531b2224db38";

  const icon = APP_ENV === "production" ? "./assets/images/icon.png" : "./assets/images/icon-dev.png"

  return {
    expo: {
      ...context,
      name: name,
      owner: "niknak",
      slug,
      version: packageJson.version,
      orientation: "portrait",
      icon: icon,
      scheme: "niknak",
      userInterfaceStyle: "light",
      newArchEnabled: true,
      splash: {
        image: "./assets/images/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
      platforms: ["ios", "android", "web"],
      updates: {
        enabled: true,
        url: `https://u.expo.dev/${projectId}`,
        checkAutomatically: "ON_ERROR_RECOVERY",
      },
      assetBundlePatterns: ["**/*"],
      web: {
        output: "single",
        bundler: "metro",
      },
      ios: {
        supportsTablet: true,
        bundleIdentifier,
        buildNumber: packageJson.version,
        // googleServicesFile:
        //   process.env.GOOGLE_SERVICES_FILE || "./GoogleService-Info.plist",
        // associatedDomains: ["applinks:nknk.app"],
      },
      android: {
        package: androidPackage,
        adaptiveIcon: {
          foregroundImage: "./assets/images/icon.png",
          backgroundColor: "#ffffff",
        },
        // googleServicesFile:
        //   process.env.ANDROID_GOOGLE_SERVICES_FILES || "./google-services.json",
        intentFilters: [
          {
            action: "VIEW",
            data: [
              {
                scheme: "https",
                host: "nknk.app",
              },
              {
                scheme: "niknak",
              },
            ],
            category: ["BROWSABLE", "DEFAULT"],
          },
        ],
        versionCode: 5,
      },
      runtimeVersion: {
        policy: "appVersion",
      },
      experiments: {
        tsconfigPaths: true,
        typedRoutes: true,
      },
      extra: {
        eas: {
          projectId,
        },
        env: envVars,
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],
        ["expo-video", {}]
      ],
    },
  };
}

export default getFinalConfig;

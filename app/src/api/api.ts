import env from '@app/env';
import { Configuration, DefaultApi } from '@niknak/app-sdk';
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const unauthenticatedApiClient = axios.create({
    baseURL: env.APP_SERVER_URL
  });

const authenticatedApiClient = axios.create({
  baseURL: env.APP_SERVER_URL
});

authenticatedApiClient.interceptors.request.use(async (config) => {
  const did = await SecureStore.getItemAsync("did");

  if (!did) {
    throw new Error("Not authenticated");
  }

  config.headers.Authorization = `Bearer ${did}`;

  return config;
});

export const niknakApi = {
    unauthenticated: new DefaultApi(new Configuration(), "", unauthenticatedApiClient),
    authenticated: new DefaultApi(new Configuration(), "", authenticatedApiClient),
}
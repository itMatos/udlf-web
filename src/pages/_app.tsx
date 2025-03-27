import {
  AppCacheProvider,
  EmotionCacheProviderProps,
} from "@mui/material-nextjs/v15-pagesRouter";
import { JSX, ReactNode } from "react";

export default function MyApp(
  props: JSX.IntrinsicAttributes &
    EmotionCacheProviderProps & { children?: ReactNode | undefined }
) {
  return <AppCacheProvider {...props}></AppCacheProvider>;
}

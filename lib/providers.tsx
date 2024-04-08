"use client";

/* Core */
import { Provider } from "react-redux";
/* Instruments */
import { store } from "@/features/store";

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>;
};

import React from "react";
import Toast from "awesome-toast-component";
import { IToast } from "@/interfaces";

export const toast = ({ message, position }: IToast) => {
  return new Toast(message, {
    position,
  });
};

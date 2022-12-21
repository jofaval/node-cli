// Vendors
import React, { FC, ReactNode } from "react";
// Constants
import {} from "./constants/first-try.constants";
// Utils
import {} from "./utils/first-try.utils";
// Styles
import { FirstTryContainer, FirstTryWrapper } from "./first-try.styled";
import styles from "./first-try.module.scss";

export type FirstTryProps = {
  children: ReactNode;
};

const FirstTry: FC<FirstTryProps> = ({ children }) => {
  return (
    <FirstTryContainer>
      <FirstTryWrapper>{children}</FirstTryWrapper>
    </FirstTryContainer>
  );
};

export default FirstTry;

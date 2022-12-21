// Vendors
import React, { FC, ReactNode } from "react";
// Constants
import {} from "./constants/second-try.constants";
// Utils
import {} from "./utils/second-try.utils";
// Styles
import { SecondTryContainer, SecondTryWrapper } from "./second-try.styled";
import styles from "./second-try.module.scss";

export type SecondTryProps = {
  children: ReactNode;
};

const SecondTry: FC<SecondTryProps> = ({ children }) => {
  return (
    <SecondTryContainer>
      <SecondTryWrapper>{children}</SecondTryWrapper>
    </SecondTryContainer>
  );
};
SecondTry.displayName = "SecondTry";

export default SecondTry;

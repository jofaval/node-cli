// Vendors
import React, { FC, ReactNode } from "react";
// Constants
import {} from "./constants/kebab-case.constants";
// Utils
import {} from "./utils/kebab-case.utils";
// Styles
import { PascalCaseContainer, PascalCaseWrapper } from "./kebab-case.styled";
import styles from "./kebab-case.module.scss";

export type PascalCaseProps = {
  children: ReactNode;
};

const PascalCase: FC<PascalCaseProps> = ({ children }) => {
  return (
    <PascalCaseContainer>
      <PascalCaseWrapper>{children}</PascalCaseWrapper>
    </PascalCaseContainer>
  );
};
PascalCase.displayName = "PascalCase";

export default PascalCase;

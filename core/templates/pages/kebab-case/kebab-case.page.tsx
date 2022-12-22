// Errors
import { ErrorBoundary } from "react-error-boundary";
// Styles
import { PascalCasePagWrapper } from "./kebab-case.page.styled";
import styles from "./kebab-case.page.module.scss";

const PascalCasePageError: React.FC = () => {
  return <section></section>;
};

const PascalCasePage: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={<PascalCasePageError />}>
      <PascalCasePagWrapper>Hello World!</PascalCasePagWrapper>;
    </ErrorBoundary>
  );
};

export default PascalCasePage;

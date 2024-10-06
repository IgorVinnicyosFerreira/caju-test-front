import { PropsWithChildren } from "react";
import * as Styled from "./styles";

type Props = {
  isOpen: boolean;
};

const Dialog: React.FC<PropsWithChildren<Props>> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <Styled.DialogOverlay
      role='dialog'
      aria-modal='true'
      aria-labelledby='dialog-title'
      aria-describedby='dialog-description'
    >
      <Styled.Dialog>{children}</Styled.Dialog>
    </Styled.DialogOverlay>
  );
};

export default Dialog;

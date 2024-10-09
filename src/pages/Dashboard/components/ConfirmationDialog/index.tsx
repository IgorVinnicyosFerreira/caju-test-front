import Dialog from "~/components/Dialog";
import * as Styled from "./styles";
import { ConfirmationDialogConfig } from "~/types/dialog";
import { SpinnerLoader } from "~/components/SpinnerLoader";

const ConfirmationDialog: React.FC<ConfirmationDialogConfig> = ({
  title,
  description,
  isOpen,
  isLoading,
  onClose,
  onAccept,
}) => {
  return (
    <Dialog isOpen={isOpen}>
      <Styled.Content data-testid="confirmation-dialog">
        <Styled.Title id='dialog-title'>{title}</Styled.Title>
        <Styled.Description id='dialog-description'>
          {description}
        </Styled.Description>
        <Styled.DeclineButton onClick={onClose} disabled={isLoading}>Cancelar</Styled.DeclineButton>
        <Styled.ConfirmationButton data-testid="accept-dialog" onClick={onAccept} disabled={isLoading}>
          {isLoading ? <SpinnerLoader /> : "Confirmar"}
        </Styled.ConfirmationButton>
      </Styled.Content>
    </Dialog>
  );
};

export default ConfirmationDialog;

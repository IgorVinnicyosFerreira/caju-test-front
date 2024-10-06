import Dialog from "~/components/Dialog";
import * as Styled from "./styles";
import { ConfirmationDialogConfig } from '~/types/dialog';

const ConfirmationDialog: React.FC<ConfirmationDialogConfig> = ({
  title,
  description,
  isOpen,
  onClose,
  onAccept
}) => {
  return (
    <Dialog isOpen={isOpen}>
      <Styled.Content>
        <Styled.Title id='dialog-title'>{title}</Styled.Title>
        <Styled.Description id='dialog-description'>
          {description}
        </Styled.Description>
        <Styled.DeclineButton onClick={onClose}>Cancelar</Styled.DeclineButton>
        <Styled.ConfirmationButton onClick={onAccept}>Confirmar</Styled.ConfirmationButton>
      </Styled.Content>
    </Dialog>
  );
};

export default ConfirmationDialog;

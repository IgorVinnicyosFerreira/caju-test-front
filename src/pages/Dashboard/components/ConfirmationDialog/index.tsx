import Dialog from "~/components/Dialog";
import * as Styled from "./styles";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
};

const ConfirmationDialog: React.FC<Props> = ({
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

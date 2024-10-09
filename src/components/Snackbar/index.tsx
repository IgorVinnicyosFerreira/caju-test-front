import * as Styled from "./styles";
import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import SnackbarTypes from "~/constants/snackbarTypes";
type Props = {
  message: string;
  type: SnackbarTypes;
  isVisible?: boolean;
};

const Snackbar: React.FC<Props> = ({ message, type, isVisible }) => {
  const iconByType = {
    [SnackbarTypes.SUCCESS]: HiCheckCircle,
    [SnackbarTypes.ERROR]: HiExclamationCircle 
  };

  const Icon = iconByType[type];

  return (
    <Styled.Snackbar
      data-testid="snackbar"
      className={`${isVisible ? 'show' : ''}`}
      type={type}
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
      aria-hidden={!message}
    >
      <Icon data-testid={`snackbar-icon-${type}`} size={24}/>
      {message}
    </Styled.Snackbar>
  );
};

export default Snackbar;

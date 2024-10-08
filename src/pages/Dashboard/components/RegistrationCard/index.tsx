import { ButtonSmall } from "~/components/Buttons";
import * as Styled from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
  HiOutlineDocument 
} from "react-icons/hi";
import { Admission } from "~/types/admission";
import AdmissionStatus from "~/constants/admissionStatus";
import { IconButton } from '~/components/Buttons/IconButton';

type ActionFunction = (admission: Admission) => void;

type Props = {
  data: Admission;
  onReproveClick?: ActionFunction;
  onApproveClick?: ActionFunction;
  onReviewClick?: ActionFunction;
  onDeleteClick?: ActionFunction;
};

const RegistrationCard: React.FC<Props> = ({
  data,
  onReproveClick,
  onApproveClick,
  onReviewClick,
  onDeleteClick
}) => {
  const isInReview = data.status === AdmissionStatus.REVIEW;

  return (
    <Styled.Card data-testid="registration-card" name={data.employeeName} >
      <Styled.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineDocument  />
        <span>{data.cpf}</span>
      </Styled.IconAndText>
      <Styled.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </Styled.IconAndText>
      <Styled.Actions>
        {isInReview ? (
          <>
            <ButtonSmall
              data-testid="reprove-button"
              bgcolor='rgb(255, 145, 154)'
              onClick={() => onReproveClick && onReproveClick(data)}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              data-testid="approve-button"
              bgcolor='rgb(155, 229, 155)'
              onClick={() => onApproveClick && onApproveClick(data)}
            >
              Aprovar
            </ButtonSmall>
          </>
        ) : (
          <ButtonSmall
            data-testid="review-button"
            bgcolor='#ff8858'
            onClick={() => onReviewClick && onReviewClick(data)}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <IconButton data-testid="delete-button" color={'#000000'} onClick={() => onDeleteClick && onDeleteClick(data)}>
          <HiOutlineTrash />
        </IconButton>
      </Styled.Actions>
    </Styled.Card>
  );
};

export default RegistrationCard;

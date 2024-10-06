import * as Styled from "./styles";
import RegistrationCard from "../RegistrationCard";
import SkeletonLoader from "./SkeletonLoader";
import AdmissionStatus from "~/constants/admissionStatus";
import { useMemo, useState } from "react";
import { Admission } from "~/types/admission";
import ConfirmationDialog from "../ConfirmationDialog";
import { ConfirmationDialogConfig } from "~/types/dialog";
import { maskCPF } from "~/utils/masks";

const allColumns = [
  { status: AdmissionStatus.REVIEW, title: "Pronto para revisar" },
  { status: AdmissionStatus.APPROVED, title: "Aprovado" },
  { status: AdmissionStatus.REPROVED, title: "Reprovado" },
];

type Props = {
  registrations?: Admission[];
  isLoading?: boolean;
};

const Collumns: React.FC<Props> = ({ registrations, isLoading }) => {
  const [confirmationDialogConfig, setConfirmationDialogConfig] =
    useState<ConfirmationDialogConfig>({
      isOpen: false,
      title: "",
      description: "",
      onClose: () => {},
      onAccept: () => {},
    });

  const approvedAdmissions = useMemo(
    () =>
      registrations?.filter(
        (admission) => admission.status === AdmissionStatus.APPROVED
      ),
    [registrations]
  );

  const reprovedAdmissions = useMemo(
    () =>
      registrations?.filter(
        (admission) => admission.status === AdmissionStatus.REPROVED
      ),
    [registrations]
  );

  const reviewAdmissions = useMemo(
    () =>
      registrations?.filter(
        (admission) => admission.status === AdmissionStatus.REVIEW
      ),
    [registrations]
  );

  const admissionsByStatus = {
    [AdmissionStatus.REVIEW]: reviewAdmissions,
    [AdmissionStatus.REPROVED]: reprovedAdmissions,
    [AdmissionStatus.APPROVED]: approvedAdmissions,
  };

  const showReproveDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Reprovar admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será reprovada.`,
      onAccept: () => {},
    });
  };

  const showApproveDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Aprovar admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será aprovada.`,
      onAccept: () => {},
    });
  };

  const showDeleteDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Excluir admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será excluída.`,
      onAccept: () => {},
    });
  };

  const showReviewDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Revisar admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será movida para revisão.`,
      onAccept: () => {},
    });
  };

  return (
    <Styled.Container>
      <ConfirmationDialog
        {...confirmationDialogConfig}
        onClose={() =>
          setConfirmationDialogConfig((prev) => ({ ...prev, isOpen: false }))
        }
      />
      {allColumns.map((collum) => {
        return (
          <Styled.Column status={collum.status} key={collum.title}>
            <>
              <Styled.TitleColumn status={collum.status}>
                {collum.title}
              </Styled.TitleColumn>
              <Styled.CollumContent>
                {isLoading ? (
                  <SkeletonLoader />
                ) : (
                  admissionsByStatus[collum.status]?.map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        onReproveClick={showReproveDialog}
                        onApproveClick={showApproveDialog}
                        onReviewClick={showReviewDialog}
                        onDeleteClick={showDeleteDialog}
                      />
                    );
                  })
                )}
              </Styled.CollumContent>
            </>
          </Styled.Column>
        );
      })}
    </Styled.Container>
  );
};
export default Collumns;

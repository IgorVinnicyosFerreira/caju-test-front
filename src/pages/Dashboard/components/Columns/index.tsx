import * as Styled from "./styles";
import RegistrationCard from "../RegistrationCard";
import SkeletonLoader from "./SkeletonLoader";
import AdmissionStatus from "~/constants/admissionStatus";
import { useMemo, useState } from "react";
import { Admission } from "~/types/admission";
import ConfirmationDialog from "../ConfirmationDialog";
import { ConfirmationDialogConfig } from "~/types/dialog";
import { maskCPF } from "~/utils/masks";
import AdmissionsServiceFactory from '~/factories/services/admissionsServiceFactory';
import { useQueryClient } from '@tanstack/react-query';
import { ADMISSIONS_CACHE_KEY } from '~/constants/cacheKeys';
import { useSnackbar } from '~/contexts/snackbarContext';
import SnackbarTypes from '~/constants/snackbarTypes';

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
      isLoading: false,
      title: "",
      description: "",
      onClose: () => {},
      onAccept: () => {},
    });

  const { showSnackbar } = useSnackbar();

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

  const queryClient = useQueryClient();

  const admissionsService = AdmissionsServiceFactory.make();

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
      onAccept: () => handleOnChangeAdmissionStatus(admission.id, AdmissionStatus.REPROVED),
    });
  };

  const showApproveDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Aprovar admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será aprovada.`,
      onAccept: () => handleOnChangeAdmissionStatus(admission.id, AdmissionStatus.APPROVED),
    });
  };

  const showDeleteDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Excluir admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será excluída.`,
      onAccept: () => handleDeleteAdimissionStatus(admission.id),
    });
  };

  const showReviewDialog = (admission: Admission) => {
    setConfirmationDialogConfig({
      isOpen: true,
      title: "Revisar admissão",
      description: `Ao confirmar a adimissão do funcionário ${
        admission.employeeName
      }, CPF ${maskCPF(admission.cpf)}, será movida para revisão.`,
      onAccept: () => handleOnChangeAdmissionStatus(admission.id, AdmissionStatus.REVIEW),
    });
  };


  const closeConfirmationDialog = () => {
    setConfirmationDialogConfig((prev) => ({ ...prev, isOpen: false, isLoading: false }));
  }

  const handleOnChangeAdmissionStatus = async (id: string, status: AdmissionStatus) => {
    try {
      setConfirmationDialogConfig((prev) => ({ ...prev, isLoading: true }));
      await admissionsService.updateAdmissionStatus({ id, status });
      await queryClient.invalidateQueries({
        queryKey: [ADMISSIONS_CACHE_KEY]
      });

      showSnackbar('Status da admissão atualizado com sucesso!', SnackbarTypes.SUCCESS);
    } catch (error) {
      showSnackbar('Falha ao atualizar status da adimissão, tente novamente!', SnackbarTypes.ERROR);
    } finally {
      closeConfirmationDialog();
    }
  }

  const handleDeleteAdimissionStatus = async (id: string) => {
    try {
      setConfirmationDialogConfig((prev) => ({ ...prev, isLoading: true }));
      await admissionsService.delete({ id });
      await queryClient.invalidateQueries({
        queryKey: [ADMISSIONS_CACHE_KEY]
      })
      showSnackbar('Admissão excluida com sucesso!', SnackbarTypes.SUCCESS);
    } catch (error) {
      showSnackbar('Falha ao excluir admissão, tente novamente!', SnackbarTypes.ERROR);
    } finally {
      closeConfirmationDialog();
    }
  }

  return (
    <Styled.Container>
      <ConfirmationDialog
        {...confirmationDialogConfig}
        onClose={closeConfirmationDialog}
      />
      {allColumns.map((collum) => {
        return (
          <Styled.Column data-testid="admission-column" status={collum.status} key={collum.title}>
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

import * as Styled from "./styles";
import RegistrationCard from "../RegistrationCard";
import SkeletonLoader from "./SkeletonLoader";
import AdmissionStatus from "~/constants/admissionStatus";
import { useMemo } from "react";
import { Admission } from "~/types/admission";

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

  return (
    <Styled.Container>
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

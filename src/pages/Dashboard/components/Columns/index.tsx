import * as Styled from "./styles";
import RegistrationCard from "../RegistrationCard";
import SkeletonLoader from "./SkeletonLoader";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: any[];
  isLoading?: boolean;
};
const Collumns: React.FC<Props> = ({ registrations, isLoading }) => {
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
                  registrations?.map((registration) => {
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

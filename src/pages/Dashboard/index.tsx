import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Collumns from './components/Columns';
import * as Styled from './styles';
import { SearchBar } from './components/Searchbar';
import AdmissionsServiceFactory from '../../factories/services/admissionsServiceFactory';

const DashboardPage = () => {
  const [cpf, setCpf] = useState<string>();

  const admissionsService = AdmissionsServiceFactory.make();

  const {data: admissions } = useQuery({
    queryKey: ['registrations', cpf],
    queryFn: async () => {
      const admissions = await admissionsService.listAdmissions({
        filters: {
          cpf
        }
      });

      return admissions;
    }
  });

  const handleOnCPFSearch = (cpf: string) => {
    setCpf(cpf)
  }

  return (
    <Styled.Container>
      <SearchBar onCPFSearch={handleOnCPFSearch} />
      <Collumns registrations={admissions} />
    </Styled.Container>
  );
};
export default DashboardPage;

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Collumns from './components/Columns';
import * as Styled from './styles';
import { SearchBar } from './components/Searchbar';
import AdmissionsServiceFactory from '../../factories/services/admissionsServiceFactory';

const DashboardPage = () => {
  const [cpf, setCpf] = useState<string>();

  const admissionsService = AdmissionsServiceFactory.make();

  const {data: admissions, isLoading,  refetch } = useQuery({
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

  const handleRefresh = () => {
    refetch();
  }

  return (
    <Styled.Container>
      <SearchBar onCPFSearch={handleOnCPFSearch} onRefreshClick={handleRefresh} />
      <Collumns registrations={admissions} isLoading={isLoading}  />
    </Styled.Container>
  );
};
export default DashboardPage;

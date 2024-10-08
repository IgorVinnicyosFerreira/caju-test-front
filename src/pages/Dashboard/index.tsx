import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Collumns from './components/Columns';
import * as Styled from './styles';
import { SearchBar } from './components/Searchbar';
import AdmissionsServiceFactory from '~/factories/services/admissionsServiceFactory';
import { ADMISSIONS_CACHE_KEY } from '~/constants/cacheKeys';
import { useSnackbar } from '~/contexts/snackbarContext';
import SnackbarTypes from '~/constants/snackbarTypes';
import { Admission } from '~/types/admission';

const DashboardPage = () => {
  const [cpf, setCpf] = useState<string>();
  const { showSnackbar } = useSnackbar();

  const admissionsService = AdmissionsServiceFactory.make();

  const {data: admissions, isLoading, refetch, isError } = useQuery({
    queryKey: [ADMISSIONS_CACHE_KEY, cpf],
    queryFn: async () => {
      const admissions = await admissionsService.list({
        filters: {
          cpf
        }
      });

      return admissions;
    }
  });

  useEffect(() => {
    if (isError) {
      showSnackbar('Falha ao tentar carregar as admissões, tente novamente!', SnackbarTypes.ERROR);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError])

  const handleOnCPFSearch = (cpf: string) => {
    setCpf(cpf)
  }

  const handleRefresh = () => {
    refetch();
  }

  return (
    <Styled.Container>
      <SearchBar onCPFSearch={handleOnCPFSearch} onRefreshClick={handleRefresh} />
      <Collumns registrations={admissions as Admission[]} isLoading={isLoading} />
    </Styled.Container>
  );
};
export default DashboardPage;

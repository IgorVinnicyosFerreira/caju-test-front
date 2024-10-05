import Collumns from './components/Columns';
import * as Styled from './styles';
import { SearchBar } from './components/Searchbar';
import { useQuery } from '@tanstack/react-query';
import AdmissionsServiceFactory from '../../factories/services/admissionsServiceFactory';

const DashboardPage = () => {
  const admissionsService = AdmissionsServiceFactory.make();

  const {data: admissions } = useQuery({
    queryKey: ['registrations'],
    queryFn: async () => {
      const admissions = await admissionsService.listAdmissions();

      return admissions;
    }
  });

  return (
    <Styled.Container>
      <SearchBar />
      <Collumns registrations={admissions} />
    </Styled.Container>
  );
};
export default DashboardPage;

import { fetchUsersPurchases } from '../fetch-users-purchases';
import { ContentList } from '@/app/components/content-list';

const PurchasesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  return (
    <ContentList
      searchParams={searchParams}
      fetchData={({ pagination }) => fetchUsersPurchases({ pagination })}
      title="Purchases"
      basePath="/purchases"
      errorMessage="Error fetching your purchases"
    />
  );
};

export default PurchasesPage;

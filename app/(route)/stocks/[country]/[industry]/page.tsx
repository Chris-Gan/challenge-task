import { getListings } from '@/app/_actions';
import GridListing from '@/app/_components/GridListing';
import InteractivePanel from '@/app/_components/InteractivePanel';
import {
  getFilterPayloadArray,
  getIndustryId,
  reassignParams,
} from '@/app/_helper';
export default async function Stocks({
  params,
  searchParams,
}: {
  params: { country: string; industry: string; filter: string };
  searchParams: { page?: number };
}) {
  const { country, industry, filter } = params;
  const { page } = searchParams;

  const {
    country: modifiedCountry,
    industry: modifiedIndustry,
    filter: modifiedFilter,
  } = reassignParams(country, industry, filter);
  const correspondingIndustryId = getIndustryId(modifiedIndustry as string);
  const filterPayload = getFilterPayloadArray(modifiedFilter as string);

  const initialData = await getListings(
    modifiedCountry,
    correspondingIndustryId,
    filterPayload,
    page,
  );
  return (
    <>
      <InteractivePanel numOfFirms={initialData?.meta?.total_records ?? 0} />
      <GridListing data={initialData} />
    </>
  );
}

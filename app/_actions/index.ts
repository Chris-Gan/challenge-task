'use server';

import { Company } from '../_types/mockedCompanies';
import {
  GetListingsPayload,
  NestedCondition,
  ResponseInterface,
  TripleItemCondition,
} from '../_types/services';

export const getCompanies = async (
  endpoint: string,
  search: string,
): Promise<Company[]> => {
  const response = await fetch(endpoint);
  const mockCompanies = (await response.json()) as Company[];

  const modifiedMockedCompanies = mockCompanies.map((company) => ({
    ...company,
    flagImage: `https://flagcdn.com/w640/${company.countryCode.toLowerCase()}.png`,
  }));

  return modifiedMockedCompanies
    .filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase()),
    )
    .slice(0, 5);
};

export const getListings = async (
  country?: string,
  industryId?: number,
  filter?: TripleItemCondition,
  pageNumber: number = 1,
  size: number = 100,
): Promise<ResponseInterface> => {
  const offset =
    pageNumber === undefined || pageNumber === 1 ? 0 : (pageNumber - 1) * size;
  const rulesPayload: GetListingsPayload = [
    ['primary_flag', '=', true],
    ['grid_visible_flag', '=', true],
    ['market_cap', 'is_not_null'],
    ['is_fund', '=', false],
  ];

  if (country) {
    const countryCondition: NestedCondition = [
      'aor',
      [['country_name', 'in', [country]]] as unknown as TripleItemCondition[][],
    ];
    rulesPayload.push(countryCondition);
  }

  if (industryId) {
    const industryCondition: NestedCondition = [
      'aor',
      [
        ['primary_industry_id', 'in', [String(industryId)]],
      ] as unknown as TripleItemCondition[][],
    ];
    rulesPayload.push(industryCondition);
  }

  if (filter) {
    rulesPayload.push(filter);
  }

  const postRequestPayload = {
    id: 1,
    no_result_if_limit: false,
    offset: offset,
    size: size,
    state: 'read',
    rules: JSON.stringify(rulesPayload),
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SWS_BASE_URL}api/grid/filter?include=grid,score`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-control': 'no-cache',
      },
      body: JSON.stringify(postRequestPayload),
    },
  );

  const data = (await response.json()) as ResponseInterface;
  return data;
};

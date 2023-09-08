import {
  countryOptions,
  industryOptions,
  initialCountryOption,
  initialIndustryOption,
  initialPerformanceOption,
  performanceFilterOptions,
} from '../_assets/customisedInputs';
import { snowflakeLables } from '../_assets/snowflakes';
import {
  ModifiedParams,
  ScoreData,
  TripleItemCondition,
} from '../_types/services';

export const generateInitialCountryOption = (urlCountry?: string) => {
  if (!urlCountry) return initialCountryOption;

  const foundCountryOption = countryOptions.find(
    (country) => country.value === urlCountry,
  );

  return foundCountryOption ?? initialCountryOption;
};

export const generateInitialIndustryOption = (urlIndustry?: string) => {
  if (!urlIndustry) return initialIndustryOption;

  const foundIndustryOption = industryOptions.find(
    (industry) => industry.value === urlIndustry,
  );

  return foundIndustryOption ?? initialIndustryOption;
};

export const generateInitialFilterOption = (urlFilter?: string) => {
  if (!urlFilter) return initialPerformanceOption;
  const foundFilterOption = performanceFilterOptions.find(
    (filter) => filter.value === urlFilter,
  );

  return foundFilterOption ?? initialPerformanceOption;
};

export const reassignParams = (
  urlCountry: string,
  urlIndustry: string,
  urlFilter: string,
) => {
  const knownIndustries = industryOptions.map((option) => option.value);
  const knownFilters = performanceFilterOptions.map((option) => option.value);

  const modifiedParams: ModifiedParams = {
    country: urlCountry,
    industry: undefined,
    filter: undefined,
  };

  // Check and assign industry
  if (knownIndustries.includes(urlIndustry)) {
    modifiedParams.industry = urlIndustry;
  } else if (knownIndustries.includes(urlFilter)) {
    modifiedParams.industry = urlFilter;
  }

  // Check and assign filter
  if (knownFilters.includes(urlIndustry) && !modifiedParams.industry) {
    // Only assign to filter if industry is not already set by urlIndustry
    modifiedParams.filter = urlIndustry;
  } else if (knownFilters.includes(urlFilter)) {
    modifiedParams.filter = urlFilter;
  }

  return modifiedParams;
};

export const generateRedirectPath = (
  country: string,
  industry: string,
  performanceIndicator: string,
) => {
  if (industry !== '') {
    return `/stocks/${country}/${industry}/${performanceIndicator}`;
  }
  return `/stocks/${country}/${performanceIndicator}`;
};

export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

export const getBorderColor = (total: number) => {
  switch (true) {
    case total < 10:
      return '#FF3A28';
    case total < 12:
      return '#FF6A20';
    case total < 14:
      return '#ED851E';
    case total < 16:
      return '#E7A31D';
    default:
      return '#E4F80A';
  }
};

export const getChartColor = (total: number) => {
  switch (true) {
    case total < 10:
      return '#C73F36';
    case total < 12:
      return '#C76030';
    case total < 14:
      return '#C7792D';
    case total < 16:
      return '#C08C23';
    default:
      return '#B8C920';
  }
};

export const generateChartData = (score: ScoreData) => {
  return snowflakeLables.map(
    (label) => score[label.toLowerCase() as keyof ScoreData],
  );
};

export const getIndustryId = (industryName: string) => {
  return industryOptions.find((item) => item.value === industryName)?.id;
};

export const getFilterPayloadArray: (filter: string) => TripleItemCondition = (
  filter: string,
) => {
  switch (filter) {
    case 'market-cap-large':
      return ['order_by', 'market_cap', 'desc'];
    case 'market-cap-small':
      return ['order_by', 'market_cap', 'asc'];
    case 'top-gainers':
      return ['order_by', 'market_cap_movement_1d', 'desc'];
    case 'biggest-losers':
      return ['order_by', 'market_cap_movement_1d', 'asc'];
    case 'growth':
      return ['order_by', 'future_three_year_growth', 'desc'];
    case 'dividend-yield-high':
      return ['order_by', 'current_dividend', 'desc'];
    default:
      return ['order_by', 'market_cap', 'desc'];
  }
};

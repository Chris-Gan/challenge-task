import mockedData from './mockedResponse.json';
import GridListing from './_components/GridListing';
import { ResponseInterface } from './_types/services';

export default function Home() {
  return (
    <>
      <GridListing data={mockedData as ResponseInterface} />
    </>
  );
}

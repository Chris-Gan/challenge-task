import React, { FC } from 'react';

interface Props {
  firmAbbreviation: string;
  industry: string;
  firmName: string;
}
const CardHeader: FC<Props> = ({ firmAbbreviation, industry, firmName }) => {
  return (
    <>
      <div className='relative flex  justify-between text-[0.8rem] items-center text-sws_blue mb-2'>
        <button>{firmAbbreviation}</button>
        <button>{industry}</button>
      </div>
      <h3 className='text-white self-start text-[1.2rem] w-full font-semibold max-w-full whitespace-nowrap overflow-hidden overflow-ellipsis'>
        {firmName}
      </h3>
    </>
  );
};

export default CardHeader;

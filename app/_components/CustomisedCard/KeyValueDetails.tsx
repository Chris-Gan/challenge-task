import React from 'react';

interface Props {
  label: string;
  value?: string | number;
  containerStyle?: string[];
  valueStyle?: string[];
  defaultValueStyle?: boolean;
}

const KeyValueDetails: React.FC<Props> = ({
  label,
  value,
  containerStyle = [],
  valueStyle = [],
  defaultValueStyle = false,
}) => {
  const isNumeric = typeof value === 'number';
  const isFalsy = value === undefined || value === null;
  const isPositive = isNumeric && value > 0;
  const isNegative = isNumeric && value < 0;

  const computedValueStyle = () => {
    if (isFalsy) return 'text-gray-500';
    if (isPositive) return 'text-green-400';
    if (isNegative) return 'text-red-600';
    return 'text-white';
  };

  const computedValueOutput = () => {
    if (isFalsy) return 'n/a';
    if (isNumeric) {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value;
  };

  return (
    <div className={`flex flex-col ${containerStyle.join(' ')}`}>
      <div className='text-[0.8rem] text-gray-500 font-bold'>{label}</div>
      <div
        className={`text-[0.9rem] font-bold ${
          defaultValueStyle && computedValueStyle()
        } ${valueStyle.join(' ')}`}
      >
        {computedValueOutput()}
      </div>
    </div>
  );
};

export default KeyValueDetails;

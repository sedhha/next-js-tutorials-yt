import React from 'react';

type Props = {};

export default function NextOld({}: Props) {
  return (
    <div>
      {' '}
      Next Environment Variable: {process.env.NEXT_PUBLIC_ANALYTICS_ID}
    </div>
  );
}

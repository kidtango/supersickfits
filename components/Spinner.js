import React from 'react';
import { PropagateLoader } from 'react-spinners';
import styled from 'styled-components';

const SweetLoading = styled.div`
  display: inline-grid;
  position: fixed;
`;

const Spinner = () => {
  return (
    <SweetLoading>
      <PropagateLoader sizeUnit={'px'} size={10} color={'#F10000'} />
    </SweetLoading>
  );
};

export default Spinner;

import styled, { keyframes } from 'styled-components';
import T from 'prop-types';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  margin: 60px auto;
  border: ${({ size }) => (size === 'medium' ? '0.4rem' : '0.2rem')} solid
    rgba(124, 142, 210, 0.6);
  border-top: ${({ size }) => (size === 'medium' ? '0.4rem' : '0.2rem')} solid
    #475a9e;
  border-radius: 50%;
  width: ${({ size }) => (size === 'medium' ? '5rem' : '2.5rem')};
  height: ${({ size }) => (size === 'medium' ? '5rem' : '2.5rem')};
  animation: ${spin} 0.6s linear infinite;
`;

Spinner.propTypes = {
  size: T.string,
};

export default Spinner;

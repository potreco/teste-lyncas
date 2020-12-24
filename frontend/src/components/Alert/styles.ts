import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: 'success' | 'error' | 'info';
}

export const Container = styled.div<ContainerProps>`
  text-align: center;
  margin-top: 30px;
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;

  ${props =>
    props.type === 'info' &&
    css`
      background-color: #cfe2ff;
      border-color: #b6d4fe;

      span {
        color: #084298;
      }
    `}

  ${props =>
    props.type === 'error' &&
    css`
      background-color: #e2e3e5;
      border-color: #d3d6d8;

      span {
        color: #41464b;
      }
    `}

      ${props =>
    props.type === 'success' &&
    css`
      background-color: #d1e7dd;
      border-color: #badbcc;

      span {
        color: #0f5132;
      }
    `}
`;

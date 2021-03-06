import styled, { css } from 'styled-components';

interface ContainerProps {
  themeMode: 'light' | 'dark';
}

export const Container = styled.div<ContainerProps>`
  position: absolute;
  right: 0;
  width: 45px;
  height: 15px;
  background-color: ${props =>
    props.theme.mode === 'light' ? 'var(--gray-line)' : 'var(--white)'};
  border-radius: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    position: absolute;
    left: -6%;
    ${props =>
      props.themeMode === 'dark' &&
      css`
        transform: translateX(100%);
      `};
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--blue-dark);
    transition: transform 0.4s;
  }
`;

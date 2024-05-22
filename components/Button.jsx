import styled from 'styled-components'

const Button = styled.button`
  font: inherit;
  appearance: none;
  background: linear-gradient(transparent 0%, var(--theme-primary) 0%) no-repeat;
  background-size: 100% 0;
  background-position: bottom;
  transition: background-size 150ms, color 150ms, border-color 150ms;
  text-decoration: none;

  padding: 0.3em 0.7em;
  border: 1px solid;
  cursor: pointer;

  color: ${({ $buttonColor }) => $buttonColor || 'var(--theme-primary)'};
  border-color: ${({ $buttonColor }) => $buttonColor || 'var(--theme-primary)'};

  &:hover {
    color: ${({ $buttonHoverColor }) =>
      $buttonHoverColor || 'var(--theme-primary)'};
    border-color: ${({ $buttonHoverColor }) =>
      $buttonHoverColor || 'var(--theme-primary)'};
    background-size: 100% 100%;
  }

  &:focus {
    outline: 2px solid;
    outline-offset: 1px;
  }
`
export default Button

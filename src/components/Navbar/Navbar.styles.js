import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  font-size: 1.8rem;
  top: 0;
  left: 0;
  /* background-color: ; */
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 2rem;
  color: var(--color-font-primary);

  /* Classes for Active Links */

  & .button {
    padding: 2rem 1rem;
    text-decoration: none;

    cursor: pointer;
    &:hover {
      background-color: var(--color-hover-bg);
      border-radius: 10px;
    }
  }
`;

export { NavbarContainer };

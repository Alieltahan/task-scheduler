import styled from 'styled-components';

const NavbarContainer = styled.div`
  position: fixed;
  font-size: 1.8rem;
  top: 0;
  left: 0;
  background: linear-gradient(
    50deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 2rem;
  color: var(--color-font-primary);

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

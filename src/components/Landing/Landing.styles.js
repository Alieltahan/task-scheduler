import styled from 'styled-components';

export const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: center;
  & .header {
    word-spacing: 8.5px;
    font-size: var(--font-size-header);
  }
  & .subheader {
    font-size: var(--font-size-secondary);
  }
`;

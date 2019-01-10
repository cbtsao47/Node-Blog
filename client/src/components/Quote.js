import React from "react";
import styled from "styled-components";
const StyledContainer = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.5);
  padding: 1rem;
  margin: 1rem;
  font-size: 1.6rem;
  text-align: justify;
`;
const StyledQuote = styled.h2`
  font-size: 1.6rem;
`;
const Quote = props => {
  return (
    <StyledContainer>
      <StyledQuote>{props.quote}</StyledQuote>
    </StyledContainer>
  );
};
export default Quote;

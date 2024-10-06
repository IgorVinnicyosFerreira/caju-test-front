import styled from 'styled-components';
import Button from '~/components/Buttons';

export const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr 1fr; 
  column-gap: 8px;
  row-gap: 12px;
`;

export const Title = styled.h2`
  grid-column: 1 / -1;
  margin: 0;
  font-size: 20px;
  line-height: 150%;
  font-weight: 700;
`;

export const Description = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  font-size: 14px;
  line-height: 130%;
`;

export const ConfirmationButton = styled(Button)`
  height: 42px;
  border-radius: 22px;
  background: linear-gradient(258deg, rgba(255, 117, 0, 1) 8%, rgba(232, 5, 55, 1) 53%);
`;


export const DeclineButton = styled(Button)`
  height: 42px;
  border-radius: 22px;
  background: transparent;
  color: #000;
  box-shadow: none;
  justify-self: right;
  padding: 8px;
`;
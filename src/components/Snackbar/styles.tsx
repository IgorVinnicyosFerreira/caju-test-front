import styled from "styled-components";
import SnackbarTypes from '~/constants/snackbarTypes';

type SnackbarProps = {
  type: SnackbarTypes;
};


const snackbarBackgroundByType = {
  [SnackbarTypes.SUCCESS]: '#64a98c',
  [SnackbarTypes.ERROR]: '#e80537'
}

export const Snackbar = styled.div<SnackbarProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  position: fixed;
  bottom: -100px;
  right: 24px;
  padding: 16px;
  border-radius: 32px;
  color: white;
  z-index: 1000;
  background: ${props => snackbarBackgroundByType[props.type]};

  font-size: 14px;

  transition: bottom 0.8s ease;

  &.show {
    bottom: 100px;
  }
`;

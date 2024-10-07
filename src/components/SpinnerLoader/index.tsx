import styled from 'styled-components';

type Props = {
  size?: 'small' | 'large'
}

const sizePxMap = {
  small: {
    width: '20px',
    height: '20px',
    border: '3px'
  },
  large: {
    width: '80px',
    height: '80px',
    border: '10px'
  }
}

export const SpinnerLoader = styled.div<Props>`
  border-radius: 50%;
  animation: spin 1s linear infinite;

  ${props => props &&`
    width: ${sizePxMap[props.size || 'small'].width};
    height: ${sizePxMap[props.size || 'small'].height};
    border: ${sizePxMap[props.size || 'small'].border} solid #f3f3f3;
    border-top: ${sizePxMap[props.size || 'small'].border} solid #64a98c;
  `}

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
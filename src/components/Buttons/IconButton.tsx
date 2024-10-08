import styled from "styled-components";

type IconButtonProps = {
  children?: React.ReactNode;
  color?: string;
  outlined?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;


export const _IconButtonStyled = styled.button<IconButtonProps>`
  cursor: pointer;
  border: ${props => props.outlined ? '2px solid #64a98c' : 'none'};
  width: fit-content;
  padding: 4px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  svg {
    color: ${props => props.color ? props.color : '#64a98c'};
  }
`;

export const IconButton = (props: IconButtonProps) => {
  return (
    <_IconButtonStyled {...props} outlined={props.outlined ? 1 : 0}>
      {props.children}
    </_IconButtonStyled>
  );
};

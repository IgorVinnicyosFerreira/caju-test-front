import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import validateCPF from '~/utils/validateCPF';
import onlyNumbers from '~/utils/onlyNumbers';
import * as Styled from "./styles";
import { maskCPF } from '~/utils/masks';

type Props = {
  onCPFSearch?: (cpf: string) => void;
}

export const SearchBar: React.FC<Props> = ({ onCPFSearch }) => {
  const history = useHistory();
  const [cpfInput, setCpfInput] = useState<string>('');
  const [cpfErrorMessage, setCpfErrorMessage] = useState<string>('');

  useEffect(() => {
    if (cpfInput.length !== 14) return;

    const isValidCPF = validateCPF(cpfInput);

    if (!isValidCPF) {
      setCpfErrorMessage('CPF inválido');
      return;
    }

    const unmaskedCpf = onlyNumbers(cpfInput);

    onCPFSearch && onCPFSearch(unmaskedCpf);
  }, [cpfInput])

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const handleOnChangeCPF = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpf = event.target.value;
    const maskedCPF = maskCPF(cpf);
    setCpfInput(maskedCPF);

    const cleanedCpfField = cpf === '';
    if (cleanedCpfField) {
      onCPFSearch && onCPFSearch('');
    }
  }
  
  return (
    <Styled.Container>
      <TextField value={cpfInput} maxLength={14}  placeholder="Digite um CPF válido" onChange={handleOnChangeCPF} error={cpfErrorMessage}/>
      <Styled.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </Styled.Actions>
    </Styled.Container>
  );
};

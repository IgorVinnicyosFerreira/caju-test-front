import TextField from "~/components/TextField";
import * as Styled from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import useForm from "~/hooks/useForm";
import isValidCpf from "~/utils/validateCPF";
import { useState } from "react";
import { maskCPF } from '~/utils/masks';
import AdmissionsServiceFactory from '~/factories/services/admissionsServiceFactory';
import sanitize from '~/utils/sanitize';
import onlyNumbers from '~/utils/onlyNumbers';
import { useSnackbar } from '~/contexts/snackbarContext';
import SnackbarTypes from '~/constants/snackbarTypes';
import { SpinnerLoader } from '~/components/SpinnerLoader';

type NewUserFormData = {
  name: string;
  email: string;
  cpf: string;
  admissionDate: string;
};

type ValidationErrors = Record<keyof NewUserFormData, string | undefined>;

const NewUserPage = () => {
  const { values, handleChange, handleSubmit } = useForm<NewUserFormData>({
    name: "",
    email: "",
    cpf: "",
    admissionDate: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();
  const { showSnackbar } = useSnackbar();
  const history = useHistory();
  const admissionsService = AdmissionsServiceFactory.make();

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const onChangeCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
    const maskedCPF = maskCPF(event.target.value);

    event.target.value = maskedCPF;
    handleChange(event)
  }

  const validateName = (name: string) => {
    const trimmedName = name?.trim();

    if (!trimmedName) {
      return "Nome é obrigatório";
    } else {
      const firstCharIsANumber = /^\d/.test(trimmedName);
      const hasLessThanTwoChars = trimmedName.length < 2;
      const namePartsArr = trimmedName.split(" ");

      if (firstCharIsANumber) {
        return "O Nome não deve começar com números";
      } else if (hasLessThanTwoChars) {
        return "O Nome deve conter ao menos duas letras";
      } else if (namePartsArr.length < 2) {
        return "O Nome deve ser composto";
      }
    }
  };

  const validateEmail = (email: string) => {
    const trimmedEmail = email?.trim();

    if (!trimmedEmail) {
      return "Email é obrigatório";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        return "Email inválido";
      }
    }
  };

  const validateCpf = (cpf: string) => {
    const trimmedCpf = cpf?.trim();

    if (!trimmedCpf) {
      return "CPF é obrigatório";
    } else {
      const isValid = isValidCpf(cpf);

      if (!isValid) {
        return "CPF inválido";
      }
    }
  };

  const validateAdmissionDate = (date: string) => {
    const trimmedDate = date?.trim();

    if (!trimmedDate) {
      return "Data de admissão é obrigatório";
    }
  };

  const validateFields = () => {
    const nameErrors = validateName(values.name);
    const emailErrors = validateEmail(values.email);
    const cpfErrors = validateCpf(values.cpf);
    const admissionDateErrors = validateAdmissionDate(values.admissionDate);

    const hasValidationError: boolean = !!(
      nameErrors ||
      emailErrors ||
      cpfErrors ||
      admissionDateErrors
    );

    setValidationErrors({
      name: nameErrors,
      email: emailErrors,
      cpf: cpfErrors,
      admissionDate: admissionDateErrors,
    });

    return !hasValidationError;
  };

  const onSubmit = async () => {
    const isValidForm = validateFields();
    if (!isValidForm) return;

    try {
      setIsLoading(true);
      const name = sanitize(values.name);
      const cpf = onlyNumbers(
        sanitize(values.cpf)
      );
      const email = sanitize(values.email);
      const admissionDate = sanitize(values.admissionDate);

      await admissionsService.create({
        name,
        cpf,
        email,
        admissionDate
      });

      showSnackbar('Usuário cadastrado com sucesso!', SnackbarTypes.SUCCESS);
      goToHome();
    } catch (error) {
      showSnackbar('Falha ao criar usuário, tente novamente!', SnackbarTypes.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Styled.Container>
      <Styled.Card>
        <IconButton data-testid="go-to-dash" onClick={() => goToHome()} outlined aria-label='back'>
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <form onSubmit={(event) => handleSubmit(event, onSubmit)}>
          <TextField
            name='name'
            placeholder='Nome'
            label='Nome'
            value={values.name}
            onChange={handleChange}
            error={validationErrors?.name}
            disabled={isLoading}
          />
          <TextField
            name='email'
            placeholder='Email'
            label='Email'
            type='email'
            value={values.email}
            onChange={handleChange}
            error={validationErrors?.email}
            disabled={isLoading}
          />
          <TextField
            name='cpf'
            placeholder='CPF'
            label='CPF'
            value={values.cpf}
            onChange={onChangeCpf}
            maxLength={14}
            error={validationErrors?.cpf}
            disabled={isLoading}
          />
          <TextField
            name='admissionDate'
            label='Data de admissão'
            type='date'
            value={values.admissionDate}
            onChange={handleChange}
            error={validationErrors?.admissionDate}
            disabled={isLoading}
          />
          <Button data-testid="submit-form" type='submit' disabled={isLoading}>
            {isLoading ? <SpinnerLoader /> : 'Cadastrar'}
          </Button>
        </form>
      </Styled.Card>
    </Styled.Container>
  );
};

export default NewUserPage;

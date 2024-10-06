import AdmissionStatus from '~/constants/admissionStatus'

export type Admission =    {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: AdmissionStatus;
  cpf: string;
}
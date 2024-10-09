import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import RegistrationCard from '../index';
import AdmissionStatus from '~/constants/admissionStatus';

const mockAdmission = {
  id: '1',
  employeeName: 'Igor Ferreira',
  email: 'dev.igor.ferreira@gmail.com',
  cpf: '56768059009',
  admissionDate: '2024-01-01',
  status: AdmissionStatus.REVIEW,
};

describe('RegistrationCard', () => {
  const onReproveClick = jest.fn();
  const onApproveClick = jest.fn();
  const onReviewClick = jest.fn();
  const onDeleteClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <RegistrationCard
        data={mockAdmission}
        onReproveClick={onReproveClick}
        onApproveClick={onApproveClick}
        onReviewClick={onReviewClick}
        onDeleteClick={onDeleteClick}
      />
    );
  });

  it('should render employee information correctly', () => {
    expect(screen.getByText(mockAdmission.employeeName)).toBeInTheDocument();
    expect(screen.getByText(mockAdmission.email)).toBeInTheDocument();
    expect(screen.getByText(mockAdmission.admissionDate)).toBeInTheDocument();
  });

  it('should render buttons correctly when status is REVIEW', () => {
    expect(screen.getByTestId('reprove-button')).toBeInTheDocument();
    expect(screen.getByTestId('approve-button')).toBeInTheDocument();
    expect(screen.queryByTestId('review-button')).not.toBeInTheDocument();
  });

  it('should render Revisar novamente button when status is APPROVED', () => {
    cleanup();

    const modifiedAdmission = { ...mockAdmission, status: AdmissionStatus.APPROVED };
    render(
      <RegistrationCard
        data={modifiedAdmission}
        onReproveClick={onReproveClick}
        onApproveClick={onApproveClick}
        onReviewClick={onReviewClick}
        onDeleteClick={onDeleteClick}
      />
    );

    expect(screen.getByTestId('review-button')).toBeInTheDocument();
    expect(screen.queryByTestId('reprove-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('approve-button')).not.toBeInTheDocument();
  });

  it('should render Revisar novamente button when status is REPROVED', () => {
    cleanup();

    const modifiedAdmission = { ...mockAdmission, status: AdmissionStatus.REPROVED };
    render(
      <RegistrationCard
        data={modifiedAdmission}
        onReproveClick={onReproveClick}
        onApproveClick={onApproveClick}
        onReviewClick={onReviewClick}
        onDeleteClick={onDeleteClick}
      />
    );

    expect(screen.getByTestId('review-button')).toBeInTheDocument();
    expect(screen.queryByTestId('reprove-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('approve-button')).not.toBeInTheDocument();
  });

  it('should call onReproveClick when Reprovar button is clicked', () => {
    fireEvent.click(screen.getByTestId('reprove-button'));
    expect(onReproveClick).toHaveBeenCalledWith(mockAdmission);
  });

  it('should call onApproveClick when Aprovar button is clicked', () => {
    fireEvent.click(screen.getByTestId('approve-button'));
    expect(onApproveClick).toHaveBeenCalledWith(mockAdmission);
  });

  it('should call onDeleteClick when delete button is clicked', () => {
    fireEvent.click(screen.getByTestId('delete-button'));
    expect(onDeleteClick).toHaveBeenCalledWith(mockAdmission);
  });

  it('should call onReviewClick when Revisar novamente button is clicked', () => {
    const modifiedAdmission = { ...mockAdmission, status: AdmissionStatus.REPROVED };
    render(
      <RegistrationCard
        data={modifiedAdmission}
        onReproveClick={onReproveClick}
        onApproveClick={onApproveClick}
        onReviewClick={onReviewClick}
        onDeleteClick={onDeleteClick}
      />
    );

    fireEvent.click(screen.getByTestId('review-button'));
    expect(onReviewClick).toHaveBeenCalledWith(modifiedAdmission);
  });
});

export type ConfirmationDialogConfig = {
  title: string;
  description: string;
  isOpen: boolean;
  isLoading?: boolean;
  onAccept: () => void;
  onClose?: () => void;
}
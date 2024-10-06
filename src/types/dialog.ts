export type ConfirmationDialogConfig = {
  title: string;
  description: string;
  isOpen: boolean;
  onAccept: () => void;
  onClose?: () => void;
}
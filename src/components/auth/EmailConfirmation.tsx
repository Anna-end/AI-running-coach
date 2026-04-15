import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose} from "../ui/dialog";
interface Props {
  onOpen: (open: boolean) => void,
  open : boolean
}
export const EmailConfirmPopup = ({onOpen, open}: Props) => {
  return (
 <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            📧 Письмо отправлено
          </DialogTitle>
          <DialogDescription className="text-center">
            Направили письмо подтверждения вам на электронную почту
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="sm:justify-center">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
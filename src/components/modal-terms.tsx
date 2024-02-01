import { Button } from '@/components/ui/button'
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export default function ModalTerms() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 underline italic cursor-pointer">
            Ler as condições
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Condições de participação</DialogTitle>
            <DialogDescription className="text-left leading-relaxed">
              <p>🚫Proibido Flood;</p>
              <p>🚫Proibido falar sobre política;</p>
              <p>🚫Proibido ser desrespeitoso com o coleguinha;</p>
              <p>🚫Proibido qualquer tipo de material ofensivo ou obsceno;</p>
              <p>🚫Proibido divulgação e/ou venda de produtos;</p>
              <p>🚫Proibido atividade ilegal, ex: venda/troca de contas.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
            </div>
          </div>
          <DialogFooter className="flex  gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button size={'lg'}>Fechar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

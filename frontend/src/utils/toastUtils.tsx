import { useIonToast, ToastOptions } from "@ionic/react"
import { FC, ReactNode } from "react"

let presentFunction: ((options: ToastOptions) => void) | undefined
let dismissFunction: (() => void) | undefined

export const ToastProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [present] = useIonToast()
  presentFunction = present as (options: ToastOptions) => void
  return <>{children}</>
}

export const presentToast = (options: ToastOptions) => {
  presentFunction?.(options)
}

export const dismissToast = () => {
  dismissFunction?.()
}

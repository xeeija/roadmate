import { PredefinedColors, TextFieldTypes } from "@ionic/core"
import {
  InputChangeEventDetail,
  InputCustomEvent,
  IonInput,
  IonItem,
  IonTextarea,
  TextareaChangeEventDetail,
  TextareaCustomEvent,
} from "@ionic/react"
import { useField } from "formik"
import { FC, ReactNode } from "react"

interface Props {
  name: string
  type?: TextFieldTypes
  label?: string
  placeholder?: string
  multiline?: boolean
  color?: PredefinedColors
  lines?: "inset" | "full" | "none"
  className?: string
  clearInput?: boolean
  onChange?: (
    ev: InputCustomEvent<InputChangeEventDetail> | TextareaCustomEvent<TextareaChangeEventDetail>
  ) => void
  children?: ReactNode
  iconPosition?: "start" | "end"
}

export const Input: FC<Props> = ({
  name,
  type = "text",
  multiline,
  label,
  placeholder,
  lines = "inset",
  className,
  clearInput = false,
  color = "light",
  onChange,
  iconPosition = "end",
  children,
}) => {
  const [field, { touched, error }] = useField(name)

  const InputComponent = multiline ? IonTextarea : IonInput

  return (
    <>
      <IonItem color={color} lines={lines}>
        <InputComponent
          className={className ?? "color-text"}
          type={type}
          {...field}
          id={`${name}Input`}
          label={label}
          labelPlacement="floating"
          placeholder={placeholder}
          clearInput={clearInput}
          onIonChange={(ev) => {
            field.onChange(ev)

            if (onChange) {
              onChange(ev)
            }
          }}
          onIonBlur={field.onBlur}
          style={{
            display: "flex",
            flexDirection: iconPosition === "end" ? "row-reverse" : "row",
          }}
        >
          {children}
        </InputComponent>
      </IonItem>
      {touched && error && <p className="error-message">{error}</p>}
    </>
  )
}

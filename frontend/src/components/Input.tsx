import { IonInput, IonItem, IonTextarea } from "@ionic/react"
import { useField } from "formik"
import { FC } from "react"

export type TextFieldTypes =
  | "date"
  | "email"
  | "number"
  | "password"
  | "search"
  | "tel"
  | "text"
  | "url"
  | "time"
  | "week"
  | "month"
  | "datetime-local"

export type ThemeColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "light"
  | "medium"
  | "dark"

interface Props {
  name: string
  type?: TextFieldTypes
  label?: string
  placeholder?: string
  multiline?: boolean
  color?: ThemeColors
  lines?: "inset" | "full" | "none"
  className?: string
  clearInput?: boolean
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
          onIonChange={field.onChange}
          onIonBlur={field.onBlur}
        />
      </IonItem>
      {touched && error && <p className="error-message">{error}</p>}
    </>
  )
}

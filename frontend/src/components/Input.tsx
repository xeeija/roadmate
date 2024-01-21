import {
  InputInputEventDetail,
  IonInputCustomEvent,
  IonTextareaCustomEvent,
  PredefinedColors,
  TextFieldTypes,
  TextareaInputEventDetail,
} from "@ionic/core"
import {
  InputChangeEventDetail,
  InputCustomEvent,
  IonIcon,
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
  onChange?: (ev: InputChangeEvent) => void
  onInput?: (ev: InputInputEvent) => void
  onFocus?: (ev: InputFocusEvent) => void
  debounce?: number
  children?: ReactNode
  iconPosition?: "start" | "end"
  autoGrow?: boolean
  icon?: string
}

export type InputChangeEvent =
  | InputCustomEvent<InputChangeEventDetail>
  | TextareaCustomEvent<TextareaChangeEventDetail>

export type InputInputEvent =
  | IonTextareaCustomEvent<TextareaInputEventDetail>
  | IonInputCustomEvent<InputInputEventDetail>

export type InputFocusEvent = IonTextareaCustomEvent<FocusEvent> | IonInputCustomEvent<FocusEvent>

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
  onInput,
  onFocus,
  iconPosition = "end",
  autoGrow = true,
  children,
  icon,
  debounce = 500,
}) => {
  const [field, { touched, error }] = useField(name)

  const InputComponent = multiline ? IonTextarea : IonInput

  return (
    <>
      <IonItem color={color} lines={lines}>
        {icon && <IonIcon icon={icon} className="customIcon" />}
        <InputComponent
          className={className ?? "color-text"}
          type={type}
          {...field}
          id={`${name}Input`}
          label={label}
          labelPlacement="floating"
          placeholder={placeholder}
          clearInput={clearInput}
          debounce={debounce}
          onIonChange={(ev) => {
            field.onChange(ev)

            if (onChange) {
              onChange(ev)
            }
          }}
          onIonInput={(ev) => {
            if (onInput) {
              onInput(ev)
            }
          }}
          onIonFocus={(ev) => {
            if (onFocus) {
              onFocus(ev)
            }
          }}
          onIonBlur={field.onBlur}
          style={{
            display: "flex",
            flexDirection: iconPosition === "end" ? "row-reverse" : "row",
          }}
          {...(multiline && {
            autoGrow: autoGrow,
          })}
        >
          {children}
        </InputComponent>
      </IonItem>
      {touched && error && <p className="error-message">{error}</p>}
    </>
  )
}

import { InputField2 } from "./InputField";
import { SecondaryTextWhite2 } from "./SecondaryText";

export function NamedFormField({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) {
  return (
    <>
      <SecondaryTextWhite2>{title}</SecondaryTextWhite2>
      <InputField2
        type="text"
        placeholder={title}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

import { CenterH, CenterW } from "../components/Center";
import { ContentWindow } from "../components/ContentWindow";
import { DefaultForm } from "../components/DefaultForm";
import { DefaultLayout } from "../components/DefaultLayout";
import { ElevatedButton } from "../components/ElevatedButton";
import { InputField } from "../components/InputField";
import { Loading } from "../components/Loading";
import { PrimaryTextWhite } from "../components/PrimaryText";
import { useOnboard } from "../hooks/onboard";
import { _ensureUserLoggedIn } from "../components/LoginState";

export const path = "/onboard";

export function Page() {
  const { loading, name, surname, setName, setSurname, onboard } = useOnboard();

  const handleOnboard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onboard();
  };

  return _ensureUserLoggedIn({
    render: () => (
      <DefaultLayout loggedIn={false}>
        <CenterH>
          {loading ? (
            <Loading />
          ) : (
            <ContentWindow w={724}>
              <div className="w-[724px] px-20 flex flex-col items-center">
                <PrimaryTextWhite>Регистрация</PrimaryTextWhite>
                <DefaultForm onSubmit={handleOnboard}>
                  <InputField
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <InputField
                    type="text"
                    placeholder="Фамилия"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                  <CenterW>
                    <ElevatedButton type="submit" onClick={undefined}>
                      Зарегистрироваться
                    </ElevatedButton>
                  </CenterW>
                </DefaultForm>
              </div>
            </ContentWindow>
          )}
        </CenterH>
      </DefaultLayout>
    ),
  });
}

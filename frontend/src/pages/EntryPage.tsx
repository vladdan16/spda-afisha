import { useEntry } from "../hooks/entry";
import { _ensureUserNotLoggedIn } from "../components/LoginState";
import { Loading } from "../components/Loading";
import { CenterH, CenterW } from "../components/Center";
import { DefaultLayout } from "../components/DefaultLayout";
import { ElevatedButton } from "../components/ElevatedButton";
import { SecondaryTextWhite } from "../components/SecondaryText";
import { PrimaryTextWhite } from "../components/PrimaryText";
import { ContentWindow } from "../components/ContentWindow";
import { DefaultForm } from "../components/DefaultForm";
import { InputField } from "../components/InputField";
import { InkWellButton } from "../components/InkWellButton";

export const path = "/entry";

export function Page() {
  const {
    loading,
    isRegistered,
    email,
    password,
    setEmail,
    setPassword,
    toggleRegistration,
    enter,
  } = useEntry();

  const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    enter();
  };

  return _ensureUserNotLoggedIn({
    render: () => (
      <DefaultLayout loggedIn={false}>
        <CenterH>
          {loading ? (
            <Loading />
          ) : (
            <ContentWindow w={724}>
              <PrimaryTextWhite>
                {isRegistered ? "Вход" : "Регистрация"}
              </PrimaryTextWhite>
              <DefaultForm onSubmit={handleAuth}>
                <InputField
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <CenterW>
                  <ElevatedButton type="submit" onClick={undefined}>
                    {isRegistered ? "Войти" : "Зарегистрироваться"}
                  </ElevatedButton>
                </CenterW>
              </DefaultForm>
              <SecondaryTextWhite>или</SecondaryTextWhite>
              <InkWellButton onClick={toggleRegistration} type="button">
                {isRegistered ? "зарегистрироваться" : "войти"}
              </InkWellButton>
            </ContentWindow>
          )}
        </CenterH>
      </DefaultLayout>
    ),
  });
}

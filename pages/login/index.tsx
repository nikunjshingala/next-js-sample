import BasicContainer from '@components/basic-container';
import { strings } from '@utils/strings';
import { useEffect, useReducer } from 'react';
import get from 'lodash-es/get';
import isEmpty from 'lodash-es/isEmpty';
import { useAuth } from 'hooks/useAuth';
import Loader from '@components/molesuos/Loader';
import { useRouter } from 'next/router';
import { ROUTE_NAMES } from '@utils/routes';
import { useStorage } from '@utils/Storage.client';
import { STORAGE_KEYS } from '@utils/keys';
import { setCookies } from 'cookies-next';

const Login = () => {
  const { setItem } = useStorage();
  const { handleLogin, submitLogin } = useAuth();
  const router = useRouter();
  const [inputs, updateInputs] = useReducer(
    (prev: Object, next: any) => {
      return { ...prev, ...next };
    },
    {
      email: '',
      password: '',
      isDisabled: true,
      errorMessage: null
    }
  );

  const handleDisableField = () => {
    let disabled = true;
    if (!isEmpty(inputs?.email) && !isEmpty(inputs?.password)) {
      disabled = false;
    }
    
    updateInputs({
      isDisabled: disabled,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = get(e, 'target.value', null);
    const name = get(e, 'target.name', null);

    if (name === 'email') {
      updateInputs({ email: value });
    } else if (name === 'password') {
      updateInputs({ password: value });
    }

    handleDisableField();
  };

  const handleSubmit = () => {
    if (!inputs?.isDisabled) {
      handleLogin({
        email: inputs?.email,
        password: inputs?.password,
      });
    }
  };

  useEffect(() => {
    if (submitLogin.isSuccess) {
      const data = submitLogin?.data;
      setCookies('access_token', data?.token);
      setItem(STORAGE_KEYS.AUTH_DATA, data);
      router.push(ROUTE_NAMES.DASHBOARD);
    }
  }, [submitLogin?.isSuccess])
  return (
    <>
      {submitLogin?.isLoading && <Loader />}
      <BasicContainer>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-5 text-center">
              {strings.admin_login}
            </h2>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                {strings.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-gray-400 p-2 w-full rounded-md"
                placeholder={strings.ent_email}
                value={inputs?.email}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                {strings.password}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-gray-400 p-2 w-full rounded-md"
                placeholder={strings.ent_pass}
                value={inputs?.password}
                onChange={(e) => handleInputChange(e)}
                required
              />
            </div>
            {submitLogin?.isFailed && (
              <div className='mb-3'>
                <span className='text-red-600'>{submitLogin?.data?.message}</span>
              </div>
            )}
            
            <div className="text-center">
              <button
                type="submit"
                disabled={inputs?.isDisabled}
                onClick={handleSubmit}
                className="bg-blue-500 enabled:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
              >
                {strings.login}
              </button>
            </div>
          </div>
        </div>
      </BasicContainer>
    </>
  );
};

export default Login;

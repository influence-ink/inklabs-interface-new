import { useState, useEffect, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { FormButton, FormTitle, Input, Divider } from '.';
import { passwordToHash, containsSpecialChars } from '../../../utils';
import { AuthContext } from '../../../contexts';

export const CreateId = ({
  onNext,
  onSignIn,
  error,
}: {
  onNext: (_: any) => void;
  onSignIn: () => void;
  error: string;
}) => {
  const [username, setUsername] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [displayError, setDisplayError] = useState<boolean>(false);
  const { authVacancy, userVacancy } = useContext(AuthContext);
  const [IdError, setIdError] = useState<string>('');
  const [isIdValid, setIdValidation] = useState<boolean>(true);
  const [EmailError, setEmailError] = useState<string>('');
  const [isEmailValid, setEmailValidation] = useState<boolean>(true);
  const [PasswordError, setPasswordError] = useState<string>('');
  const [isPasswordValid, setPasswordValidation] = useState<boolean>(true);
  // useEffect(() => {
  //   if (account !== null) {
  //     setEmail(account.email);
  //     setPassword(account.password);
  //     setUsername(account.ink_id);
  //     setFirstname((account.display_name || '').split(' ')[0]);
  //     setLastname((account.display_name || '').split(' ')[1]);
  //   }
  // }, [account]);
  const validation = () => {
    return (
      username === '' ||
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      password === '' ||
      password !== confirm ||
      !isEmailValid ||
      !isIdValid ||
      !isPasswordValid
    );
  };
  const handleClick = () => {
    onNext({ email, password: passwordToHash(password), display_name: `${firstname} ${lastname}`, ink_id: username });
  };
  useEffect(() => {
    if (error !== '') {
      setDisplayError(true);
      setTimeout(() => setDisplayError(false), 3000);
    }
  }, [error]);
  const handleUsernameChange = async (inkId: string) => {
    setUsername(inkId);
  };
  const handleEmailChange = async (email: string) => {
    setEmail(email);
  };
  useEffect(() => {
    const userVacancyWrapper = async () => {
      if (username === '') return;
      const res = await userVacancy({ ink_id: username });
      if (res.status) {
        setIdError(res.error);
        setIdValidation(false);
      } else setIdValidation(true);
    };
    userVacancyWrapper();
  }, [username, userVacancy]);
  useEffect(() => {
    const authVacancyWrapper = async () => {
      if (email === '') return;
      const res = await authVacancy({ email });
      if (res.status) {
        setEmailError(res.error);
        setEmailValidation(false);
      } else setEmailValidation(true);
    };
    authVacancyWrapper();
  }, [email, authVacancy]);
  useEffect(() => {
    if (password !== '') {
      if (password.length < 8 || !containsSpecialChars(password)) {
        setPasswordError('Password must be at least 8 characters long and include at least 1 number and symbol.');
        setPasswordValidation(false);
      } else {
        setPasswordValidation(true);
      }
    }
  }, [password, authVacancy]);
  return (
    <>
      <FormTitle>
        CREaTE <br />
        INK ID
      </FormTitle>
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        gap="15px"
      >
        {displayError && (
          <Typography color="red" fontSize={15} textAlign="center">
            {error}
          </Typography>
        )}
        <Typography variant="subtitle2" fontWeight="bold">
          Enter Your Desired INK ID
        </Typography>
        <Input
          placeholder="username"
          value={username}
          onChange={(ev) => handleUsernameChange(ev.target.value)}
          onKeyUp={(e) => {
            if (!validation() && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
          }}
        />
        {!isIdValid && (
          <Typography color="red" fontSize={15} textAlign="center">
            {IdError}
          </Typography>
        )}
        <Divider />
        <Input
          placeholder="first name"
          value={firstname}
          onChange={(ev) => setFirstname(ev.target.value)}
          onKeyUp={(e) => {
            if (!validation() && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
          }}
        />
        <Input
          placeholder="last name"
          value={lastname}
          onChange={(ev) => setLastname(ev.target.value)}
          onKeyUp={(e) => {
            if (!validation() && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
          }}
        />
        <Input
          placeholder="email"
          value={email}
          onChange={(ev) => handleEmailChange(ev.target.value)}
          onKeyUp={(e) => {
            if (!validation() && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
          }}
        />
        {!isEmailValid && (
          <Typography color="red" fontSize={15} textAlign="center">
            {EmailError}
          </Typography>
        )}
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          onKeyUp={(e) => {
            if (!validation() && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
          }}
        />
        {!isPasswordValid && (
          <Typography color="red" fontSize={15} textAlign="center">
            {PasswordError}
          </Typography>
        )}
        <Input
          type="password"
          placeholder="confirm password"
          value={confirm}
          onChange={(ev) => setConfirm(ev.target.value)}
          onKeyUp={(e) => {
            if (!validation() && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
          }}
        />
        {password !== confirm && (
          <Typography color="red" fontSize={15}>
            Passwords do not match.
          </Typography>
        )}
        <Box my={1} width="100%">
          <FormButton onClick={handleClick} disabled={validation()}>
            create ink id
          </FormButton>
        </Box>
        <Typography variant="subtitle2" fontWeight="bold" py={0}>
          ALREADY HAVE AN INK ID?
        </Typography>
        <Typography
          variant="subtitle1"
          color="#2984FF"
          sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
          onClick={onSignIn}
        >
          Sign-in
        </Typography>
      </Box>
    </>
  );
};

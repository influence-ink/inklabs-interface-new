import { useState, useContext, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { FormButton, FormTitle, Input, Divider } from '.';
import { AuthContext } from '../../../contexts';
import Loading from '../../../assets/img/loading.gif';

export const CreateAccount = ({
  onNext,
  onPrev,
  account,
}: {
  account: any;
  onNext: () => void;
  onPrev: (_?: string) => void;
}) => {
  const { signUp, referrerLookup } = useContext(AuthContext);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [referrer, setReferrer] = useState<string>('');
  const [isReferrerValid, setReferrerValidation] = useState<boolean>(true);
  const [ReferrerError, setReferrerError] = useState<string>('');
  const handleClick = useCallback(async () => {
    setLoadingStatus(true);
    const data = await signUp({ ...account, referrer_id: referrer });
    setLoadingStatus(false);
    if (data.status !== 0) {
      onPrev(data.error);
    }
  }, [setLoadingStatus, account, onPrev, referrer, signUp]);
  const handleReferrerChange = async (referrer: string) => {
    setReferrer(referrer);
    if ((await referrerLookup({ referrer_id: referrer })).status) {
      setReferrerError((await referrerLookup({ referrer_id: referrer })).error);
      setReferrerValidation(false);
    } else setReferrerValidation(true);
  };
  return (
    <>
      <FormTitle>
        CREaTE <br />
        aCCOUNT
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
        <Divider />
        <Box my={8} display="flex" flexDirection="column" alignItems="center" gap="20px" width="100%">
          <Typography variant="subtitle2" fontWeight="bold" fontSize={16}>
            Who Sent You?
          </Typography>
          <Input
            placeholder="enter ink id"
            value={referrer}
            onChange={(ev) => handleReferrerChange(ev.target.value)}
            onKeyUp={(e) => {
              if (referrer !== '' && (e.key === 'Enter' || e.keyCode === 13)) handleClick();
            }}
          />
          {!isReferrerValid && (
            <Typography color="red" fontSize={15}>
              {ReferrerError}
            </Typography>
          )}
          <FormButton onClick={handleClick} disabled={referrer === '' || loadingStatus || !isReferrerValid}>
            enter{loadingStatus && <img src={Loading} alt="" width={'22px'} style={{ marginLeft: '10px' }} />}
          </FormButton>
        </Box>
        <Divider />
        <Typography variant="subtitle2" fontWeight="bold" py={0} mt={2}>
          ALREADY HAVE AN INK ID?
        </Typography>
        <Typography
          variant="subtitle1"
          color="#2984FF"
          sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
          onClick={() => onPrev()}
        >
          Sign-in
        </Typography>
      </Box>
    </>
  );
};

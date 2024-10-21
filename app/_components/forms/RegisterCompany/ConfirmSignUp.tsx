import { Button, InputAdornment, TextField } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'
import {
  confirmSignUpAction,
  resendSignUpCodeAction,
} from '@/_actions/register'
import { useAlert } from '@/_hooks'
import { useContext } from 'react'
import { RegisterCompanyContext } from '@/_contexts'

interface ConfirmSignUpProps {
  email: string
  close: () => void
}

const ConfirmSignUp = ({ email, close }: ConfirmSignUpProps) => {
  const { alert } = useAlert()
  const { confirmationCode, setConfirmationCode } = useContext(
    RegisterCompanyContext
  )

  const handleResendCode = async () => {
    const response = await resendSignUpCodeAction(email)
    if (response.success) {
      return alert({
        id: 'resend-code',
        severity: 'success',
        message: 'Confirmation code re-sent successfully!',
      })
    }
    alert({
      id: 'resend-code-fail',
      severity: 'error',
      message: 'Failed to resend confirmation code!',
    })
  }

  const handleConfirmSignUp = async () => {
    const response = await confirmSignUpAction({
      username: email,
      confirmationCode,
    })
    if (response.success) {
      close()
      return alert({
        id: 'sign-up-success',
        severity: 'success',
        message: 'Company registered successfully!',
      })
    }
    alert({
      id: 'sign-up-fail',
      severity: 'error',
      message: 'Failed to register company!',
    })
  }

  return (
    <div className="flex flex-col gap-3 animate-textFocus">
      <TextField
        autoFocus
        label="Confirmation Code"
        variant="outlined"
        value={confirmationCode}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setConfirmationCode(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <div className="flex justify-end space-x-4">
        <Button color="primary" variant="outlined" onClick={handleResendCode}>
          Resend Code
        </Button>
        <Button
          className="text-white"
          color="success"
          variant="contained"
          onClick={handleConfirmSignUp}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}

export default ConfirmSignUp
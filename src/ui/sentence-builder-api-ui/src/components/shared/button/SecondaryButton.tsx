import {styled} from "@mui/material"
import PrimaryButton from "./PrimaryButton"

const SecondaryButton = styled(PrimaryButton)({
    color: 'var(--color-black)',
    background: 'var(--color-white)',
    '&:hover': {
        borderColor: 'var(--color-white)',
        background: 'transparent',
        color: 'var(--color-white)'
    }
})

export default SecondaryButton
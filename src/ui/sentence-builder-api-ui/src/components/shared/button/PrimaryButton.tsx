import {Button, styled} from "@mui/material";

const PrimaryButton = styled(Button)({
    height: '1.5rem',
    color: 'var(--color-yellow-red)',
    background: 'var(--color-flame)',
    border: '2px solid transparent',
    transition: '.3s linear',
    '&:hover': {
        borderColor: 'var(--color-oggb)',
        background: 'var(--color-yellow-red)',
        color: 'var(--color-flame)'
    }
})

export default PrimaryButton
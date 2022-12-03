import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert ref={ref} variant="filled" {...props} />;
});

const InstantMessageSuccess = ({ message, setState }) => {

	const [open, setOpen] = useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
		setState(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success">{message}</Alert>
		</Snackbar>
	)
}

export default InstantMessageSuccess
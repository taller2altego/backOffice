import * as React from 'react';
import { useState, useEffect } from 'react';

import { TableRow, TableHead, TableContainer, TableCell, Table, TableBody, Paper, Button, Typography } from '@mui/material';

import { reqVars } from '../../utils/requerimentVars';

export default function HistoryQuotes({ navigate, ...props }) {
	const [appliedQuote, setAppliedQuote] = useState([]);
	const [historyQuotes, setHistoryQuotes] = useState([]);

	useEffect(() => {
		reqVars().then((res) => {
			const data = res.data.data;

			const parsedData = data
				.map(item => {
					const accumulatedPercentageToChange = Object
						.keys(item)
						.filter(itemKey => Array.isArray(item[itemKey]) && item[itemKey][0].percentageToChange)
						.map(itemKey => {
							return item[itemKey].reduce((acum, curr) => acum + curr.percentageToChange, 0);
						})
						.reduce((acum, curr) => acum + curr, 0);

					const accumulatedExtraFee = Object
						.keys(item)
						.filter(itemKey => Array.isArray(item[itemKey]) && item[itemKey][0].extraFee)
						.map(itemKey => {
							return item[itemKey].reduce((acum, curr) => acum + curr.extraFee, 0);
						})
						.reduce((acum, curr) => acum + curr, 0);

					return { id: item.id, price: item.price, applied: item.applied, accumulatedPercentageToChange, accumulatedExtraFee };
				});

			const { applied, history } = parsedData.reduce((acum, curr) => {

				if (curr.applied) {
					return { ...acum, applied: curr };
				} else {
					return { ...acum, history: [...acum.history, curr] };
				}
			}, { applied: {}, history: [] });

			setAppliedQuote(applied);
			setHistoryQuotes(history);

		})
	}, []);

	const goToDetails = id => () => {
		navigate(`/detail-quotes/${id}`, { state: { id } });
	};

	return (
		<div style={{ height: "92vh", width: "100%" }}>

			<Typography variant="h5" component="div">
				Tarifa aplicada
			</Typography>

			< TableContainer component={Paper} >
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell> id </TableCell>
							<TableCell> precio base </TableCell>
							<TableCell> porcentaje de cambio total </TableCell>
							<TableCell> precio extra total </TableCell>
							<TableCell>Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableCell>{appliedQuote['id']}</TableCell>
						<TableCell>{appliedQuote['price']}</TableCell>
						<TableCell>{appliedQuote['accumulatedPercentageToChange']}</TableCell>
						<TableCell>{appliedQuote['accumulatedExtraFee']}</TableCell>
						<TableCell>
							<Button>Detalle</Button>
						</TableCell>
					</TableBody>
				</Table>
			</TableContainer >

			<Typography variant="h5" component="div">
				Historial de tarifas
			</Typography>


			< TableContainer component={Paper} >
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell> id </TableCell>
							<TableCell> precio base </TableCell>
							<TableCell> porcentaje de cambio total </TableCell>
							<TableCell> precio extra total </TableCell>
							<TableCell>Acciones</TableCell>
						</TableRow>
					</TableHead>
					{historyQuotes.map(quote => (
						<TableBody>
							<TableCell>{quote['id']}</TableCell>
							<TableCell>{quote['price']}</TableCell>
							<TableCell>{quote['accumulatedPercentageToChange']}</TableCell>
							<TableCell>{quote['accumulatedExtraFee']}</TableCell>
							<TableCell>
								<Button onClick={goToDetails(quote['id'])}>Detalle</Button>
							</TableCell>
						</TableBody>
					))}
				</Table>
			</TableContainer >
		</div>
	);
}

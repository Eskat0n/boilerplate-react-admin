import React from "react";
import { Page } from "@codeparts/boilerplate-react-admin";
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@material-ui/core";

export const TableDemoPage = () => {
    return (
        <Page title="Table">
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Order number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Page>
    );
};

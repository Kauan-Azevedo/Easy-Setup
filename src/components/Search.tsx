import React, { useState } from "react";
import { iResult } from "../interfaces/iResult";
import { Box, Button, CircularProgress, TextField } from "@mui/material";


export function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.currentTarget.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch(
            `https://api.mercadolibre.com/sites/MLB/search?q=${searchTerm}`
        );
        const data = await response.json();
        setResults(data.results);
        setIsLoading(false);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField type="text" value={searchTerm} onChange={handleChange} label="Pesquisar..."/>
                <Button type="submit" variant="contained">Buscar</Button>
            </form>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <ul>
                    {/* nao me mate gabriel */}
                    {results.map((result: iResult) => (
                        <li key={result.id}>
                            <img src={result.thumbnail} alt={result.title} />
                            <p>{result.title}</p>
                            <p>{result.price}</p>
                            <a href={result.permalink}>Ver mais</a>
                        </li>
                    ))}
                </ul>
            )}
        </Box>
    );
}

import React, { useState } from "react";
import { iResult } from "../interfaces/iResult";
import {
    Button,
    CircularProgress,
    Container,
    TextField,
    Card,
    CardContent,
    CardActions,
    Link
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        <Container maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    label={<SearchIcon />}
                />
                <Button type="submit" variant="contained">
                    Buscar
                </Button>
            </form>

            {isLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <ul>
                        {results.map((result: iResult) => (
                            <Card key={result.id}>
                                <CardContent>
                                    <img
                                        src={result.thumbnail}
                                        alt={result.title}
                                    />
                                    <p>{result.title}</p>
                                    <p>{result.price}</p>
                                </CardContent>
                                <CardActions>
                                <Button variant="contained" color="success">
                                    <Link href={result.permalink} target="_blank" color="#fff" underline="none">
                                        Ver mais
                                    </Link>
                                </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </ul>
                </>
            )}
        </Container>
    );
}

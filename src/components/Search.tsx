import React, { useState } from "react";
import { iResult } from "../interfaces/iResult";

export function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleChange} />
                <button type="submit">Buscar</button>
            </form>
            {isLoading ? (
                <p>Carregando...</p>
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
        </div>
    );
}

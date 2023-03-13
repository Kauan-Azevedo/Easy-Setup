import React, { useState } from "react";

export function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                    {results.map((result) => (
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

// Nesse código, criamos um componente de função chamado Search que tem dois estados: searchTerm e results. O estado searchTerm representa o termo de busca digitado pelo usuário, enquanto results representa os resultados da busca.
// Também criamos dois métodos: handleChange e handleSubmit. O método handleChange é responsável por atualizar o estado searchTerm quando o usuário digita algo no campo de busca. O método handleSubmit é responsável por fazer a busca na API do Mercado Livre quando o usuário clica no botão "Buscar".
// Ao fazer a busca na API do Mercado Livre, usamos o método fetch para fazer uma requisição assíncrona e obter os resultados. Em seguida, atualizamos o estado results com os resultados da busca.
// Por fim, no retorno do componente, temos um formulário com um campo de texto e um botão de busca. Também temos uma lista que exibe os resultados da busca.
// Passo 3: Renderização do componente principal
// Agora, vamos criar um componente principal chamado App que irá renderizar o componente Search. Para isso, vamos editar o arquivo src/App.js:

import React, { useState } from "react";

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
                    {results.map((result: any) => (
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

// Response
// {
//   "site_id": "MLB",
//   "country_default_time_zone": "GMT-03:00",
//   "query": "${searchTerm}",
//   "paging": {},
//   "results": [
//     {
//       "id": "MLB2783994563",
//       "title": "Gel Termo Ativo Medida Pimenta Negra Fluido Massagem Redutor",
//       "condition": "new",
//       "thumbnail_id": "605954-MLB45304866928_032021",
//       "catalog_product_id": "MLB19542967",
//       "listing_type_id": "gold_special",
//       "permalink": "https://www.mercadolivre.com.br/gel-termo-ativo-medida-pimenta-negra-fluido-massagem-redutor/p/MLB19542967",
//       "buying_mode": "buy_it_now",
//       "site_id": "MLB",
//       "category_id": "MLB1262",
//       "domain_id": "MLB-BODY_SKIN_CARE_PRODUCTS",
//       "thumbnail": "http://http2.mlstatic.com/D_605954-MLB45304866928_032021-I.jpg",
//       "currency_id": "BRL",
//       "order_backend": 1,
//       "price": 41.84,
//       "original_price": 44.99,
//       "sale_price": null,
//       "sold_quantity": 50,
//       "available_quantity": 1,
//       "official_store_id": null,
//       "use_thumbnail_id": true,
//       "accepts_mercadopago": true,
//       "tags": [],
//       "shipping": {},
//       "stop_time": "2042-08-28T04:00:00.000Z",
//       "seller": {},
//       "seller_address": {},
//       "address": {},
//       "attributes": [],
//       "installments": {},
//       "winner_item_id": null,
//       "catalog_listing": true,
//       "discounts": null,
//       "promotions": [
//       ],
//       "inventory_id": "KLYO14817"
//       },
// }

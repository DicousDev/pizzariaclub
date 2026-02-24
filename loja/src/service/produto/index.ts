import type { ProdutoModel } from "../../model/produto";

const url = `http://localhost:8080/produtos`;

export const useProdutoService = () => {

    const getProdutos = async (): Promise<ProdutoModel[]> => {
        const data = await fetch(`${url}?size=100&page=0`).then(response => response.json())
        return data.content;
    }

    return {
        getProdutos
    }
}
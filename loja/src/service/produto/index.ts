import type { AxiosResponse } from "axios";
import { httpClient } from "../../http";
import type { ProdutoModel } from "../../model/produto";
import type { Page } from "../../model/page";

export const useProdutoService = () => {

    const getProdutos = async (): Promise<ProdutoModel[]> => {
        const response: AxiosResponse<Page<ProdutoModel>> = await httpClient.get(`produtos?size=100&page=0`)
        return response.data.content;
    }

    return {
        getProdutos
    }
}
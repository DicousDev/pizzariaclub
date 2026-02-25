import { createContext, type Dispatch, type SetStateAction } from "react";
import type { ProdutoModel } from "../../model/produto";

export interface CarrinhoContext {
  carrinho: ProdutoModel[];
  setCarrinho: Dispatch<SetStateAction<ProdutoModel[]>>
}

export const ProdutosNoCarrinhoContext = createContext<CarrinhoContext>({} as CarrinhoContext)
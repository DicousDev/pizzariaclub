import { useState } from "react";
import type { ProdutoModel } from "./model/produto";
import { ProdutosNoCarrinhoContext } from "./context/CarrinhoContext";
import { RouterProvider } from "react-router";
import { router } from "./router";

function App() {
  const [carrinho, setCarrinho] = useState<ProdutoModel[]>([]);

  return (
    <ProdutosNoCarrinhoContext value={{ carrinho, setCarrinho }}>
      <RouterProvider router={router} />
    </ProdutosNoCarrinhoContext>
  );
}

export default App

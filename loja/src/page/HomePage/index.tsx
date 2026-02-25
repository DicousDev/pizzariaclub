import { ShoppingCart } from "lucide-react";
import { CardPizza } from "../../components/CardPizza";
import { useContext, useEffect, useState } from "react";
import type { ProdutoModel } from "../../model/produto";
import { useProdutoService } from "../../service/produto";
import { Navbar } from "../../components/Navbar";
import { ProdutosNoCarrinhoContext } from "../../context/CarrinhoContext";
import { useNavigate } from "react-router";
import { Loading } from "../../components/Loading";

type StatusCarregamento = "CARREGANDO_PRODUTOS" | "FALHA_CARREGAR_PRODUTOS" | "PRODUTOS_CARREGADO";

export const HomePage = () => {

    const produtoService = useProdutoService();
    const [status, setStatus] = useState<StatusCarregamento>("CARREGANDO_PRODUTOS")
    const [produtos, setProdutos] = useState<ProdutoModel[]>([]);
    const { carrinho, setCarrinho } = useContext(ProdutosNoCarrinhoContext)
    const navigate = useNavigate();

    useEffect(() => {
        produtoService.getProdutos()
            .then(data => {setProdutos(data); setStatus("PRODUTOS_CARREGADO"); })
            .catch(error => {console.error("Falha na tentativa de carregar produtos. " + error); setStatus("FALHA_CARREGAR_PRODUTOS")})
    }, [])

    const handleCartClick = () => {
        navigate("/cart")
    }

    const handleAddProduct = (id: string) => {
        const produtoParaInserir: ProdutoModel | undefined = produtos.find(p => p.id === id)
        if(produtoParaInserir) {
            setCarrinho([...carrinho, produtoParaInserir])
        }
    }

    return (
        <div className="h-dvh bg-gray-100">
            <Navbar>
                <button className="relative" onClick={handleCartClick}>
                    <div className="-top-2 -right-3 text-gray-400 text-xs font-bold absolute bg-white z-50 text-center flex items-center justify-center rounded-full size-4">{carrinho.length}</div>
                    <ShoppingCart className="text-white font-bold" size="30" strokeWidth={2} />
                </button>
            </Navbar>
            <main>
                <div className="p-5">
                    <div className="bg-white pt-5">
                        <p className="text-gray-700 text-2xl font-bold pb-5">
                            🍕 Pizzas mais pedidas
                        </p>
                    </div>

                    {status === "FALHA_CARREGAR_PRODUTOS" &&
                        <div className="bg-white text-center h-96 flex flex-col gap-5 items-center justify-center">
                            <p className="text-orange-600 font-bold text-2xl">[Error 503] Não foi possível exibir os produtos. Tente novamente mais tarde!</p>
                        </div>
                    }

                    {status === "CARREGANDO_PRODUTOS" &&
                        <div className="bg-white text-center h-96 flex flex-col gap-5 items-center justify-center">
                            <p className="text-orange-600 font-bold">Carregando produtos. Por favor, aguarde!</p>
                            <Loading />
                        </div>
                    }        

                    {status === "PRODUTOS_CARREGADO" &&
                        <div className="grid grid-cols-3 gap-5">
                            {
                                produtos.map(prod => (
                                    <CardPizza key={prod.id} id={prod.id} 
                                        titulo={prod.nome}
                                        descricao={prod.descricao}
                                        img={prod.imagens[0]}
                                        preco={prod.preco}
                                        onAdicionarPizza={handleAddProduct}
                                    />
                                ))
                            }
                        </div>
                    }
                </div>
            </main>
        </div>
    )
}
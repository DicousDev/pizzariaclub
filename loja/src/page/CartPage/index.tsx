import { useContext, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { ProdutosNoCarrinhoContext } from "../../context/CarrinhoContext";
import { BadgeCheck, Check, CircleX, Minimize2, ShoppingCart, Trash, User } from "lucide-react";
import { formatReal, manterApenasNumeros } from "../../formatter";
import { useNavigate } from "react-router";
import { usePedidoService } from "../../service/pedido";
import type { RegistraPedidoModel } from "../../model/registraPedidoModel";
import { Loading } from "../../components/Loading";
import type { ProdutoModel } from "../../model/produto";


type StatusPedido = "ANALISE_PEDIDO" | "CONFIRMANDO_PEDIDO" | "ENVIANDO_PEDIDO" | "PEDIDO_ENVIADO";

export const CartPage = () => {

    const pedidoService = usePedidoService();
    const [statusPedido, setStatusPedido] = useState<StatusPedido>("ANALISE_PEDIDO");
    const [confirmFail, setConfirmFail] = useState<string>("");
    const { carrinho, setCarrinho } = useContext(ProdutosNoCarrinhoContext);
    const [nome, setNome] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [endereco, setEndereco] = useState<string>("");

    const total: string = formatReal.format(Number(carrinho.reduce((sum, unit) => sum + Number(unit.preco), 0).toFixed(2)));
    const navigate = useNavigate();
    
    const handleConfirmarPedidoClick = () => {
        setStatusPedido("CONFIRMANDO_PEDIDO")
    }

    const orderSuccess = () => {
        setCarrinho([])
        toHome();
    }

    const toHome = () => {
        onCloseModal()
        navigate("/")
    }

    const onCloseModal = () => {
        setNome("")
        setTelefone("")
        setEndereco("")
        setConfirmFail("")
        setStatusPedido("ANALISE_PEDIDO")
    }

    const handleConfirmOrder = () => {

        if(nome.trim() === "") {
            setConfirmFail(`Nome é obrigatório.`);
            return;
        }
        
        if(telefone.trim() === "") {
            setConfirmFail(`Telefone é obrigatório.`);
            return;
        }

        if(telefone.length < 11) {
            setConfirmFail(`Telefone inválido. Exemplo válido '48912345678' (DDD + 9 + TELEFONE).`);
            return;   
        }

        if(endereco.trim() === "") {
            setConfirmFail(`Endereço é obrigatório.`);
            return;
        }

        
        const pedido: RegistraPedidoModel = {
            nome,
            endereco,
            telefone,
            produtos: carrinho.map(e => Number(e.id))
        }

        setStatusPedido("ENVIANDO_PEDIDO")
        pedidoService.registraPedido(pedido)
            .then(response => {setStatusPedido("PEDIDO_ENVIADO"); console.log("Produto cadastrado com sucesso", response)})
            .catch(error => console.error("Falha na tentativa de registrar pedido", error));
    }

    const handleRemoveProduct = (id: string, key: number) => {

        const novaLista: ProdutoModel[] = [];
        for(let i = 0; i < carrinho.length; i++) {

            if(i !== key) {
                novaLista.push(carrinho[i])
            }
        }

        setCarrinho(novaLista)
    }

    return (
        <div className="h-full min-h-dvh bg-gray-100 relative">
            <Navbar />

            {carrinho.length === 0 &&
                <div className="p-5">
                    <div className="bg-white p-5  flex flex-col gap-5 items-center justify-center text-xl font-semibold rounded-xl text-center">
                        <ShoppingCart size="50" strokeWidth="2" className="text-gray-400" />
                        <p className="text-gray-400">Nenhum produto adicionado no carrinho</p>
                        <button onClick={() => navigate("/")} className="bg-orange-500 rounded-2xl text-base w-1/2 text-white p-5 hover:bg-orange-600 hover:duration-300 hover:cursor-pointer">Quero ver os produtos</button>
                    </div>
                </div>
            }


            {carrinho.length > 0 &&
                <div className="p-5">
                    <div className="bg-white p-5 text-xl font-semibold rounded-t-xl">
                        <p>Produtos ({carrinho.length})</p>
                    </div>
                    <div className="flex flex-col gap-2 bg-white">
                        {
                            carrinho.map((p, key) => (
                                <div key={`${p.id}${key}`} className="bg-white border-t border-b border-gray-200 h-full">
                                    <div className="flex gap-3 bg-gray-50 justify-between">
                                        <div className="flex gap-3">
                                            <div style={{ backgroundImage: `url(${p.imagens[0]})` }} className=" w-36 h-full bg-cover bg-no-repeat bg-center"></div>
                                            <div className="flex pt-3 gap-40">
                                                <div>
                                                    <p className="bg-gray-200 rounded-4xl w-fit py-0.5 px-2 text-xs">Produto</p>
                                                    <p className="text-gray-700 text-base">{p.nome}</p>
                                                    <p className="text-gray-400 text-sm text-justify py-3 max-w-xl">{p.descricao}</p>
                                                </div>
                                                <div>
                                                    <p className="bg-gray-200 rounded-4xl w-fit py-0.5 px-2 text-xs">Total</p>
                                                    <p className="text-orange-500 font-bold text-center flex items-center mt-8 text-xl">{formatReal.format(Number(p.preco))}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center flex-row pr-5">
                                            <button onClick={() => {handleRemoveProduct(p.id, key); }} className="bg-red-500 text-white font-bold text-base flex px-3 py-2 gap-3 hover:bg-red-600 hover:duration-300 hover:cursor-pointer">
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                    <div className="bg-white p-5 flex flex-col gap-3">
                        <div className="flex justify-between text-xl">
                            <p className="text-gray-600 text-lg">Finalize seu pedido!</p>
                            <p className="text-orange-600 font-bold text-lg">{total}</p>
                        </div>
                        <div className="w-full flex justify-end">
                            <button onClick={handleConfirmarPedidoClick} className="flex justify-end bg-orange-600 text-white p-3 gap-2 hover:bg-orange-700 hover:cursor-pointer hover:duration-300">
                                <Check />
                                Confirmar pedido
                            </button>
                        </div>
                    </div>
                </div>
            }

            {statusPedido !== "ANALISE_PEDIDO" &&
                <div className="z-50 bg-black/80 h-full fixed top-0 w-full flex flex-col items-center">
                    <div className="w-3xl bg-gray-100 relative top-10">


                        {statusPedido === "ENVIANDO_PEDIDO" && 
                            <div className="bg-white text-center h-96 flex flex-col gap-5 items-center justify-center">
                                <p className="text-orange-600 font-bold">Confirmando seu pedido. Por favor, aguarde!</p>
                                <Loading />
                            </div>
                        }

                        {statusPedido === "PEDIDO_ENVIADO" &&
                            <div className="flex items-center justify-center flex-col gap-5 py-5">
                                <div className="bg-green-100 rounded-full size-32 flex items-center justify-center">
                                    <BadgeCheck className="text-green-300 size-16 flex items-center " />
                                </div>
                                <p className="text-xl text-green-500">Pedido confirmado com sucesso!</p>
                                <button onClick={orderSuccess} className="bg-gray-400 text-white px-5 py-3 rounded-xl w-24">Fechar</button>
                            </div>
                        }

                        {statusPedido === "CONFIRMANDO_PEDIDO" &&
                            <>
                                <header className="p-3 flex justify-between border-b border-gray-300">
                                    <div className="flex gap-2">
                                        <User />
                                        <p>Confirmando seu pedido</p>
                                    </div>
                                    <button onClick={onCloseModal} className="text-gray-500"><Minimize2 /></button>
                                </header>
                                <main>
                                    <div className="p-10 pt-5">
                                        {confirmFail &&
                                            <div className="mb-5 w-full p-5 bg-red-200 gap-5 rounded-lg flex">
                                                <CircleX className="text-red-600" />
                                                <p className="text-red-600">{confirmFail}</p>
                                            </div>
                                        }
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-0.5">
                                                <label className="flex text-sm gap-2 text-gray-700">Nome: <span className="text-red-500">*</span></label>
                                                <input maxLength={100} value={nome} onChange={e => setNome(e.target.value)} className="w-full p-3 border rounded-sm" type="text" placeholder="Nome completo" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <label className="flex text-sm gap-2 text-gray-700">Telefone: <span className="text-red-500">*</span></label>
                                                <input value={telefone} maxLength={11} onChange={e => setTelefone(manterApenasNumeros(e.target.value))} className="w-full p-3 border rounded-sm" type="text" placeholder="Telefone DDD + '9' + Número" />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <label className="flex text-sm gap-2 text-gray-700">Endereço: <span className="text-red-500">*</span></label>
                                                <input maxLength={100} value={endereco} onChange={e => setEndereco(e.target.value)} className="w-full p-3 border rounded-sm" type="text" placeholder="CEP, cidade, bairro, residência" />
                                            </div>
                                        </div>
                                        <div className="pt-5">
                                            <button onClick={handleConfirmOrder} className="bg-orange-600 p-3 text-white w-full hover:bg-orange-700 hover:duration-300 hover:cursor-pointer">Confirmar</button>
                                        </div>
                                    </div>
                                </main>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
}
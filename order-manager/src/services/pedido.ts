import type { AlterarStatusPedidoForm, PedidoModel } from "./model/Pedido";


const resourceUrl = "http://localhost:8080/pedidos";
export const usePedidoService = () => {

    const getPedidos = async (): Promise<PedidoModel[]> => {
        return await fetch(resourceUrl).then(response => response.json())
    }

    const alterarStatusPedido = async (form: AlterarStatusPedidoForm): Promise<void> => {
        await fetch(resourceUrl, {
            headers: {"Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify(form)
        });
    }

    return {
        getPedidos,
        alterarStatusPedido
    }
} 
import type { AlterarStatusPedidoForm, PedidoModel } from "./model/Pedido";


const resourceUrl = "http://localhost:8080/pedidos";
export const usePedidoService = () => {

    const getPedidos = async (): Promise<PedidoModel[]> => {
        return await fetch(resourceUrl).then(response => response.json())
    }

    const alterarStatusPedido = async (form: AlterarStatusPedidoForm): Promise<void> => {
        await fetch(`${resourceUrl}/${form.id}`, {
            headers: {"Content-Type": "application/json"},
            method: "PATCH",
            body: JSON.stringify({ toStatus: form.toStatus })
        });
    }

    return {
        getPedidos,
        alterarStatusPedido
    }
} 
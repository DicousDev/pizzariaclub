import type { RegistraPedidoModel } from "../../model/registraPedidoModel";

const url = `http://localhost:8080/pedidos`;

export const usePedidoService = () => {
    const registraPedido = async (pedido: RegistraPedidoModel): Promise<void> => {
        await fetch(`${url}`, { 
            method: "POST", 
            body: JSON.stringify(pedido), 
            headers: { "Content-Type": "application/json" }})
    }

    return {
        registraPedido
    }
}
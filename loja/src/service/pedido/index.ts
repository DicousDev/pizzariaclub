import { httpClient } from "../../http";
import type { RegistraPedidoModel } from "../../model/registraPedidoModel";

export const usePedidoService = () => {
    const registraPedido = async (pedido: RegistraPedidoModel): Promise<void> => {
        await httpClient.post(`/pedidos`, pedido)
    }

    return {
        registraPedido
    }
}
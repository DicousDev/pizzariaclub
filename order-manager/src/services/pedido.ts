import type { AxiosResponse } from "axios";
import { httpClient } from "../http";
import type { AlterarStatusPedidoForm, PedidoModel } from "./model/Pedido";

export const usePedidoService = () => {

    const getPedidos = async (): Promise<PedidoModel[]> => {
        const pedidos: AxiosResponse<PedidoModel[]> = await httpClient.get("/pedidos")
        return pedidos.data;
    }

    const alterarStatusPedido = async (form: AlterarStatusPedidoForm): Promise<void> => {
        await httpClient.patch<AlterarStatusPedidoForm>(`pedidos/${form.id}`, { toStatus: form.toStatus })
    }

    return {
        getPedidos,
        alterarStatusPedido
    }
} 
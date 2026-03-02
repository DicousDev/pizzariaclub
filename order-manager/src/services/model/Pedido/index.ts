export interface PedidoModel {
    id: number;
    titulo: string;
    status: string;
}

export interface AlterarStatusPedidoForm {
    id: number;
    toStatus: string;
}
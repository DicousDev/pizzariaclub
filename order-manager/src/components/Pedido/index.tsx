import { useDraggable } from "@dnd-kit/react";

interface PedidoProps {
    id: number;
    titulo: string;
}

export const Pedido = (pedido: PedidoProps) => {

    const {ref} = useDraggable({id: pedido.id});
    return (
        <div className="w-full p-5 bg-gray-200" ref={ref}>
            <p className="text-sm">🍕 {pedido.titulo}</p>
        </div>
    );
}
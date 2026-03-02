import { useDroppable } from "@dnd-kit/react";
import { Pedido } from "../Pedido";
import type { PedidoModel } from "../../services/model/Pedido";

export const TodoList = ({ pedidos }: { pedidos: PedidoModel[] }) => {

    const pedidosAguardando: PedidoModel[] = pedidos.filter(p => p.status === 'AGUARDANDO');
    const pedidosAndamento: PedidoModel[] = pedidos.filter(p => p.status === 'ANDAMENTO');
    const pedidosFinalizado: PedidoModel[] = pedidos.filter(p => p.status === 'FINALIZADO');

    const {ref: dropAndamento} = useDroppable({id: "ANDAMENTO"})
    const {ref: dropFinalizacao} = useDroppable({id: "FINALIZACAO"})

    return <main className="py-3 grid grid-cols-3 gap-5">
        <section>
            <div className="w-full h-128 bg-gray-50 rounded-lg">
                <div className="h-fit bg-gray-200 p-3 rounded-lg">
                    <p>⏰ AGUARDANDO (1)</p>
                </div>
                <div className="h-full py-5">
                    {pedidosAguardando.map(p => (
                        <Pedido key={p.id} id={p.id} titulo={p.titulo} />
                    ))}
                </div>
            </div>
        </section>
        <section>
            <div className="w-full h-128 bg-gray-50 rounded-lg">
                <div className="h-fit bg-gray-200 p-3 rounded-lg">
                    <p>ANDAMENTO</p>
                </div>
                <div className="h-full py-5" ref={dropAndamento}>
                    {pedidosAndamento.map(p => (
                        <Pedido key={p.id} id={p.id} titulo={p.titulo} />
                    ))}
                </div>
            </div>
        </section>
        <section>
            <div className="w-full h-128 bg-gray-50 rounded-lg">
                <div className="h-fit bg-gray-200 p-3 rounded-lg">
                <p>FINALIZADO</p>
                </div>
                <div className="h-full py-5" ref={dropFinalizacao}>
                    {pedidosFinalizado.map(p => (
                        <Pedido key={p.id} id={p.id} titulo={p.titulo} />
                    ))}
                </div>
            </div>
        </section>
    </main>
}
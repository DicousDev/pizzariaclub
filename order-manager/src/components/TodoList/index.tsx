import { useDroppable } from "@dnd-kit/react";
import { Pedido } from "../Pedido";
import type { PedidoModel } from "../../services/model/Pedido";

export const TodoList = ({ pedidos }: { pedidos: PedidoModel[] }) => {

    const pedidosAguardando: PedidoModel[] = pedidos.filter(p => p.status === 'AGUARDANDO');
    const pedidosAndamento: PedidoModel[] = pedidos.filter(p => p.status === 'ANDAMENTO');
    const pedidosFinalizado: PedidoModel[] = pedidos.filter(p => p.status === 'FINALIZADO');

    const {ref: dropAguardando} = useDroppable({id: "AGUARDANDO"})
    const {ref: dropAndamento} = useDroppable({id: "ANDAMENTO"})
    const {ref: dropFinalizacao} = useDroppable({id: "FINALIZADO"})

    return <main className="py-3 grid grid-cols-3 gap-5">
        <section>
            <div className="w-full min-h-128 h-fit bg-gray-50 rounded-lg" ref={dropAguardando}>
                <div className="h-fit bg-gray-200 p-3 rounded-lg">
                    <p>⏰ AGUARDANDO ({pedidosAguardando.length})</p>
                </div>
                <div className="h-full py-5">
                    {pedidosAguardando.map(p => (
                        <Pedido key={p.id} id={p.id} titulo={p.titulo} />
                    ))}
                </div>
            </div>
        </section>
        <section>
            <div className="w-full min-h-128 h-fit bg-gray-50 rounded-lg" ref={dropAndamento}>
                <div className="h-fit bg-gray-200 p-3 rounded-lg">
                    <p>ANDAMENTO ({pedidosAndamento.length})</p>
                </div>
                <div className="h-full py-5">
                    {pedidosAndamento.map(p => (
                        <Pedido key={p.id} id={p.id} titulo={p.titulo} />
                    ))}
                </div>
            </div>
        </section>
        <section>
            <div className="w-full min-h-128 h-fit bg-gray-50 rounded-lg" ref={dropFinalizacao}>
                <div className="h-fit bg-gray-200 p-3 rounded-lg">
                <p>FINALIZADO ({pedidosFinalizado.length})</p>
                </div>
                <div className="h-full py-5">
                    {pedidosFinalizado.map(p => (
                        <Pedido key={p.id} id={p.id} titulo={p.titulo} />
                    ))}
                </div>
            </div>
        </section>
    </main>
}
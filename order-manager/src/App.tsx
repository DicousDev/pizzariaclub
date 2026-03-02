import { DragDropProvider } from "@dnd-kit/react"
import { TodoList } from "./components/TodoList";
import { useEffect, useState } from "react";
import { usePedidoService } from "./services/pedido";
import type { AlterarStatusPedidoForm, PedidoModel } from "./services/model/Pedido";


function App() {

  const pedidoService = usePedidoService(); 
  const [pedidos, setPedidos] = useState<PedidoModel[]>([])

  useEffect(() => {
    pedidoService.getPedidos()
      .then(data => setPedidos(data))
  }, [])

  const changePedidoStatus = (event: any) => {
    if(event.canceled || !event.operation.target?.id) return;

    const pedidoId = event.operation.source?.id
    const toStatus = `${event.operation.target?.id}`;

    const novaLista: PedidoModel[] = []
    for(let i = 0; i < pedidos.length; i++) {
      let ped = pedidos[i];
      if(ped.id === pedidoId) {
        ped = { ...ped, status: toStatus }; 
      }

      novaLista.push(ped);
    }

    setPedidos(novaLista)
    const payload: AlterarStatusPedidoForm = {id: Number(pedidoId), toStatus }
    pedidoService.alterarStatusPedido(payload)
      .then(_ => { pedidoService.getPedidos() })
  }

  return (
    <div className="h-full min-h-dvh bg-orange-600 p-3 flex flex-col">
      <p className="text-2xl text-white font-bold">Pizzaria Club - Order Manager</p>
      <DragDropProvider onDragEnd={changePedidoStatus}>
        <TodoList pedidos={pedidos} />
     </DragDropProvider>
    </div>
  )
}

export default App

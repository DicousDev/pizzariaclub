package io.github.dicousdev.pizzaria.usecase;

import io.github.dicousdev.pizzaria.model.Pedido;
import io.github.dicousdev.pizzaria.model.PedidoStatus;
import io.github.dicousdev.pizzaria.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
@Slf4j
public class AlteraStatusPedidoUseCase {

    private final PedidoRepository repository;

    @Transactional
    public void execute(Long pedidoId, PedidoStatus status) {
        Pedido pedido = repository.findById(pedidoId).orElseThrow(() -> {
            log.error("Pedido não encontrado. [Pedido ID {}]", pedidoId);
            throw new RuntimeException("Pedido não encontrado.");
        });

        log.info("Atualizando status do pedido. [Pedido ID {}] [De status {}] [Para status {}]", pedidoId, pedido.getStatus(), status);
        repository.save(pedido.toBuilder().status(status).build());
    }
}

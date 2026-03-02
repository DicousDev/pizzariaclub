package io.github.dicousdev.pizzaria.usecase;

import io.github.dicousdev.pizzaria.controller.pedido.PedidoResponseDto;
import io.github.dicousdev.pizzaria.model.Pedido;
import io.github.dicousdev.pizzaria.repository.PedidoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ConsultaPedidosUseCase {

    private final PedidoRepository repository;

    public List<PedidoResponseDto> execute() {
        return repository.findAll(PageRequest.of(0, 200))
                .map(this::convert)
                .toList();
    }

    private PedidoResponseDto convert(Pedido pedido) {
        return PedidoResponseDto.builder()
                .id(pedido.getId())
                .titulo(pedido.getProdutos().getFirst().getNome())
                .status(pedido.getStatus())
                .build();
    }
}

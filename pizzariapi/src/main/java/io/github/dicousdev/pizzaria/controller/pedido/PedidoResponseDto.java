package io.github.dicousdev.pizzaria.controller.pedido;

import io.github.dicousdev.pizzaria.model.PedidoStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class PedidoResponseDto {

    private Long id;
    private String titulo;
    private PedidoStatus status;
}

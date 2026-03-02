package io.github.dicousdev.pizzaria.controller.pedido;

import io.github.dicousdev.pizzaria.model.PedidoStatus;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ToString
@EqualsAndHashCode
public class AlteraStatusPedidoForm {


    private PedidoStatus toStatus;
}

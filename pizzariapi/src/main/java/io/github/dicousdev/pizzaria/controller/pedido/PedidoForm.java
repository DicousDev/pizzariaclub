package io.github.dicousdev.pizzaria.controller.pedido;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@ToString
@EqualsAndHashCode
public class PedidoForm {

    private String nome;
    private String telefone;
    private String endereco;
    private List<Long> produtos;
}

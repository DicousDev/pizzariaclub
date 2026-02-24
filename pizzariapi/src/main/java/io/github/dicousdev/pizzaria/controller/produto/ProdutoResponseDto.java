package io.github.dicousdev.pizzaria.controller.produto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProdutoResponseDto {

    private Long id;
    private String nome;
    private String descricao;
    private BigDecimal preco;
    private List<String> imagens;
}

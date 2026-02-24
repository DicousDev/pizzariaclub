package io.github.dicousdev.pizzaria.usecase;

import io.github.dicousdev.pizzaria.controller.produto.ProdutoResponseDto;
import io.github.dicousdev.pizzaria.model.Produto;
import io.github.dicousdev.pizzaria.model.ProdutoImage;
import io.github.dicousdev.pizzaria.repository.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ConsultaProdutosUseCase {

    private final ProdutoRepository repository;

    public Page<ProdutoResponseDto> execute(Pageable pageable) {
        return repository.findAll(pageable).map(this::convert);
    }

    private ProdutoResponseDto convert(Produto produto) {
        return ProdutoResponseDto.builder()
                .id(produto.getId())
                .nome(produto.getNome())
                .descricao(produto.getDescricao())
                .preco(produto.getPreco())
                .imagens(produto.getImagens().stream().map(ProdutoImage::getBase64).toList())
                .build();
    }
}

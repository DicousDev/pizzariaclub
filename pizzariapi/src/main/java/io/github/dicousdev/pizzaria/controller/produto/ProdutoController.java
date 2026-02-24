package io.github.dicousdev.pizzaria.controller.produto;

import io.github.dicousdev.pizzaria.usecase.ConsultaProdutosUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/produtos")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProdutoController {

    private final ConsultaProdutosUseCase consultaProdutosUseCase;

    @GetMapping
    public Page<ProdutoResponseDto> getProdutos(Pageable pageable) {
        return consultaProdutosUseCase.execute(pageable);
    }
}

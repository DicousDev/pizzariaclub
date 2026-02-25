package io.github.dicousdev.pizzaria.usecase;

import io.github.dicousdev.pizzaria.controller.pedido.PedidoForm;
import io.github.dicousdev.pizzaria.model.Pedido;
import io.github.dicousdev.pizzaria.model.Produto;
import io.github.dicousdev.pizzaria.repository.PedidoRepository;
import io.github.dicousdev.pizzaria.repository.ProdutoRepository;
import io.github.dicousdev.pizzaria.util.ApenasNumeroUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class RegistraPedidoUseCase {
    private final PedidoRepository repository;

    public void execute(PedidoForm form) {

        List<Produto> produtos = new ArrayList<>();
        if(!CollectionUtils.isEmpty(form.getProdutos())) {
            produtos = form.getProdutos().stream().map(id -> Produto.builder().id(id).build()).toList();
        }

        log.info("Registrando pedido");
        Pedido pedido = Pedido.builder()
                .nome(form.getNome())
                .endereco(form.getEndereco())
                .telefone(ApenasNumeroUtil.manterApenasNumeros(form.getTelefone()).replaceAll("\\s", ""))
                .produtos(produtos)
                .build();

        repository.save(pedido);
    }
}

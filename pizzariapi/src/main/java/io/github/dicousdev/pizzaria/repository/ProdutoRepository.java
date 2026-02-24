package io.github.dicousdev.pizzaria.repository;

import io.github.dicousdev.pizzaria.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}

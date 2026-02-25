package io.github.dicousdev.pizzaria.repository;

import io.github.dicousdev.pizzaria.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT p FROM Produto p WHERE id in (:id)")
    @Transactional(readOnly = true)
    List<Produto> findAllById(List<Long> id);
}
